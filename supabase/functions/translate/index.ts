
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const apiKey = Deno.env.get('GOOGLE_TRANSLATE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle CORS preflight requests
serve(async (req: Request) => {
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const { text, targetLanguage } = await req.json();

    // Skip translation if text is empty
    if (!text || text.trim() === '') {
      return new Response(
        JSON.stringify({ translatedText: text }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Call Google Translate API
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        format: 'text',
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("Translation error:", data.error);
      throw new Error(data.error.message);
    }

    const translatedText = data.data.translations[0].translatedText;

    return new Response(
      JSON.stringify({ translatedText }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error("Error in translate function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
