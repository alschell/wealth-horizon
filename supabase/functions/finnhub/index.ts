
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

// Base URL for Finnhub API
const FINNHUB_API_URL = "https://finnhub.io/api/v1";

// Main serve function
serve(async (req) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const url = new URL(req.url);
    const endpoint = url.pathname.split("/").pop();
    
    // Parse request data
    const body = await req.json().catch(() => ({}));
    const { symbol, symbols, category, from, to, resolution } = body;
    
    let apiUrl = "";
    let response;
    
    console.log(`Processing ${endpoint} request for ${symbol || symbols || category}`);
    
    switch (endpoint) {
      case "quote":
        // Get quote for a symbol
        if (!symbol) {
          return new Response(
            JSON.stringify({ error: "Symbol is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        apiUrl = `${FINNHUB_API_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
        break;
        
      case "search":
        // Search for symbols
        const query = body.query;
        if (!query) {
          return new Response(
            JSON.stringify({ error: "Query is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        apiUrl = `${FINNHUB_API_URL}/search?q=${query}&token=${FINNHUB_API_KEY}`;
        break;
        
      case "news":
        // Get market news
        if (symbol) {
          // Company news
          apiUrl = `${FINNHUB_API_URL}/company-news?symbol=${symbol}&from=${from || ''}&to=${to || ''}&token=${FINNHUB_API_KEY}`;
        } else {
          // General market news
          apiUrl = `${FINNHUB_API_URL}/news?category=${category || 'general'}&token=${FINNHUB_API_KEY}`;
        }
        break;
        
      case "indices":
        // Get indices data - we'll use a collection of major indices
        const majorIndices = ["^GSPC", "^DJI", "^IXIC", "^FTSE", "^N225"];
        const indices = symbols || majorIndices;
        
        // Fetch data for all indices in parallel
        const indicesPromises = indices.map(async (idx) => {
          const quoteUrl = `${FINNHUB_API_URL}/quote?symbol=${idx}&token=${FINNHUB_API_KEY}`;
          const quoteRes = await fetch(quoteUrl);
          const quoteData = await quoteRes.json();
          return { symbol: idx, data: quoteData };
        });
        
        response = await Promise.all(indicesPromises);
        
        return new Response(
          JSON.stringify(response),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
        
      case "candles":
        // Get candles/chart data
        if (!symbol || !resolution) {
          return new Response(
            JSON.stringify({ error: "Symbol and resolution are required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        apiUrl = `${FINNHUB_API_URL}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`;
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: "Invalid endpoint" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
    
    // If we haven't returned yet and don't have a response, fetch from the API
    if (!response) {
      console.log(`Fetching data from ${apiUrl}`);
      const apiRes = await fetch(apiUrl);
      response = await apiRes.json();
    }
    
    // Cache the response in the database if needed
    // This would be implemented here
    
    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
