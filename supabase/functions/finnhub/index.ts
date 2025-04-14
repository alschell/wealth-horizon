import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Handle CORS preflight requests
const handleCors = (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
};

// Get the Finnhub API key from environment
const FINNHUB_API_KEY = Deno.env.get("FINNHUB_API_KEY");
if (!FINNHUB_API_KEY) {
  console.error("FINNHUB_API_KEY is not set in environment variables");
}

// Create Supabase client for caching
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Cache expiration (in seconds)
const CACHE_EXPIRATION = {
  quote: 60, // 1 minute
  search: 60 * 60, // 1 hour
  news: 5 * 60, // 5 minutes
  indices: 60, // 1 minute
  candles: 5 * 60, // 5 minutes
};

// Base URL for Finnhub API
const FINNHUB_API_URL = "https://finnhub.io/api/v1";

// Get data from cache or API
async function getDataWithCache(endpoint: string, params: Record<string, any>) {
  try {
    const cacheKey = getCacheKey(endpoint, params);
    
    // Try to get from cache first
    const { data: cachedData } = await supabase
      .from("market_data_cache")
      .select("data, timestamp")
      .eq("data_type", endpoint)
      .eq("symbol", params.symbol || null)
      .gt("expiry", new Date().toISOString())
      .maybeSingle();
    
    // If we have valid cached data, return it
    if (cachedData) {
      console.log(`Cache hit for ${endpoint} - ${params.symbol || "general"}`);
      return cachedData.data;
    }
    
    // Otherwise fetch from API
    console.log(`Cache miss for ${endpoint} - ${params.symbol || "general"}, fetching from API`);
    const apiResponse = await fetchFromAPI(endpoint, params);
    
    // Cache the result for future use
    await cacheResponse(endpoint, params, apiResponse);
    
    return apiResponse;
  } catch (error) {
    console.error(`Cache error for ${endpoint}:`, error);
    // Fallback to API if cache fails
    return fetchFromAPI(endpoint, params);
  }
}

// Generate a cache key from endpoint and params
function getCacheKey(endpoint: string, params: Record<string, any>): string {
  const paramString = Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== null)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  
  return `${endpoint}:${paramString}`;
}

// Store response in cache
async function cacheResponse(endpoint: string, params: Record<string, any>, data: any) {
  try {
    const expirySeconds = CACHE_EXPIRATION[endpoint as keyof typeof CACHE_EXPIRATION] || 300;
    const expiry = new Date();
    expiry.setSeconds(expiry.getSeconds() + expirySeconds);
    
    await supabase.from("market_data_cache").upsert({
      data_type: endpoint,
      symbol: params.symbol || null,
      data: data,
      expiry: expiry.toISOString(),
    });
    
    console.log(`Cached ${endpoint} data for ${params.symbol || "general"} until ${expiry.toISOString()}`);
  } catch (error) {
    console.error(`Failed to cache ${endpoint} data:`, error);
    // Just log the error, don't throw - caching failures shouldn't break the app
  }
}

// Fetch data directly from Finnhub API
async function fetchFromAPI(endpoint: string, params: Record<string, any>) {
  let apiUrl = "";
  let response;
  
  console.log(`Fetching ${endpoint} data from API for ${params.symbol || params.query || "general"}`);
  
  switch (endpoint) {
    case "quote":
      if (!params.symbol) {
        throw new Error("Symbol is required for quote endpoint");
      }
      apiUrl = `${FINNHUB_API_URL}/quote?symbol=${params.symbol}&token=${FINNHUB_API_KEY}`;
      break;
      
    case "search":
      if (!params.query) {
        throw new Error("Query is required for search endpoint");
      }
      apiUrl = `${FINNHUB_API_URL}/search?q=${params.query}&token=${FINNHUB_API_KEY}`;
      break;
      
    case "news":
      if (params.symbol) {
        // Company news
        apiUrl = `${FINNHUB_API_URL}/company-news?symbol=${params.symbol}&from=${params.from || ''}&to=${params.to || ''}&token=${FINNHUB_API_KEY}`;
      } else {
        // General market news
        apiUrl = `${FINNHUB_API_URL}/news?category=${params.category || 'general'}&token=${FINNHUB_API_KEY}`;
      }
      break;
      
    case "indices":
      // Get indices data - we'll use a collection of major indices
      const majorIndices = ["^GSPC", "^DJI", "^IXIC", "^FTSE", "^N225"];
      const indicesToFetch = params.symbols || majorIndices;
      
      // Fetch data for all indices in parallel
      const indicesPromises = indicesToFetch.map(async (idx: string) => {
        const quoteUrl = `${FINNHUB_API_URL}/quote?symbol=${idx}&token=${FINNHUB_API_KEY}`;
        const quoteRes = await fetch(quoteUrl);
        const quoteData = await quoteRes.json();
        return { symbol: idx, data: quoteData };
      });
      
      response = await Promise.all(indicesPromises);
      return response;
      
    case "candles":
      if (!params.symbol || !params.resolution) {
        throw new Error("Symbol and resolution are required for candles endpoint");
      }
      apiUrl = `${FINNHUB_API_URL}/stock/candle?symbol=${params.symbol}&resolution=${params.resolution}&from=${params.from}&to=${params.to}&token=${FINNHUB_API_KEY}`;
      break;
      
    default:
      throw new Error(`Invalid endpoint: ${endpoint}`);
  }
  
  // If we haven't returned yet and don't have a response, fetch from the API
  if (!response) {
    console.log(`Fetching data from ${apiUrl}`);
    
    // Add retry logic with exponential backoff
    let retries = 3;
    let delay = 1000; // Start with 1 second delay
    
    while (retries > 0) {
      try {
        const apiRes = await fetch(apiUrl);
        
        // Handle rate limiting
        if (apiRes.status === 429) {
          console.log(`Rate limited, retrying in ${delay}ms, ${retries} retries left`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
          retries--;
          continue;
        }
        
        // Handle other error status codes
        if (!apiRes.ok) {
          throw new Error(`API returned status ${apiRes.status}: ${apiRes.statusText}`);
        }
        
        response = await apiRes.json();
        break;
      } catch (error) {
        if (retries <= 1) throw error;
        
        console.log(`Request failed, retrying in ${delay}ms, ${retries-1} retries left`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
        retries--;
      }
    }
  }
  
  return response;
}

// Main serve function
serve(async (req) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Parse request data
    const body = await req.json();
    const { endpoint, ...params } = body;
    
    if (!endpoint) {
      return new Response(
        JSON.stringify({ error: "Endpoint is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`Processing ${endpoint} request with params:`, params);
    
    // Get data with caching
    const data = await getDataWithCache(endpoint, params);
    
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Internal server error",
        errorCode: error.status || 500
      }),
      { status: error.status || 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
