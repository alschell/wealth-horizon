
import { useState, useCallback } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { LanguageCode } from './types';
import { protectSpecialTerms, restoreSpecialTerms } from './utils';
import { DEFAULT_TRANSLATION_TIMEOUT } from './constants';

export function useTranslationService() {
  const [translationCache, setTranslationCache] = useState<Record<string, Record<string, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [translationQueue, setTranslationQueue] = useState<number>(0);

  // Function to translate text with enhanced error handling
  const translate = async (text: string, targetLanguage: LanguageCode): Promise<string> => {
    // If text is null, undefined, or not a string, return empty string to avoid crashes
    if (!text || typeof text !== 'string') {
      console.warn("TranslationService: Invalid text passed to translate function", text);
      return String(text || "");
    }
    
    // If the language is English or text is empty, return the original text
    if (targetLanguage === 'en' || text.trim() === '') {
      return text;
    }
    
    // Check if translation is already in cache
    if (translationCache[targetLanguage]?.[text]) {
      return translationCache[targetLanguage][text];
    }
    
    try {
      // Increment the queue counter to track active translations
      setTranslationQueue(prev => prev + 1);
      setIsLoading(true);
      
      // Return original text immediately if translation service is unavailable
      if (!supabase) {
        console.error("Translation service unavailable: Supabase client not initialized");
        setTimeout(() => {
          setTranslationQueue(prev => {
            const newCount = prev - 1;
            if (newCount <= 0) {
              setIsLoading(false);
            }
            return newCount;
          });
        }, 400);
        return text;
      }
      
      // Process text to protect special terms
      const { processedText, placeholders } = protectSpecialTerms(text);
      
      // Call translation edge function with timeout
      const translationPromise = supabase.functions.invoke('translate', {
        body: { 
          text: processedText, 
          targetLanguage 
        }
      });
      
      // Set a timeout to prevent hanging if the API doesn't respond
      const timeoutPromise = new Promise<{data: null, error: Error}>((resolve) => {
        setTimeout(() => {
          resolve({
            data: null,
            error: new Error('Translation request timed out')
          });
        }, DEFAULT_TRANSLATION_TIMEOUT);
      });
      
      // Race the translation request against the timeout
      const { data, error } = await Promise.race([translationPromise, timeoutPromise]);
      
      if (error) {
        console.error('Translation error:', error);
        setTranslationQueue(prev => {
          const newCount = prev - 1;
          if (newCount <= 0) {
            setIsLoading(false);
          }
          return newCount;
        });
        return text; // Return original text on error
      }
      
      if (!data || !data.translatedText) {
        console.error('Invalid translation response:', data);
        setTranslationQueue(prev => {
          const newCount = prev - 1;
          if (newCount <= 0) {
            setIsLoading(false);
          }
          return newCount;
        });
        return text; // Return original text if response is invalid
      }
      
      // Restore protected terms in the translated text
      const finalTranslation = restoreSpecialTerms(data.translatedText, placeholders);
      
      // Cache the translation
      setTranslationCache(prevCache => ({
        ...prevCache,
        [targetLanguage]: {
          ...(prevCache[targetLanguage] || {}),
          [text]: finalTranslation
        }
      }));
      
      // Decrement the queue counter and update loading state if all translations are complete
      setTranslationQueue(prev => {
        const newCount = prev - 1;
        if (newCount <= 0) {
          setTimeout(() => setIsLoading(false), 400);
        }
        return newCount;
      });
      
      return finalTranslation;
    } catch (error) {
      console.error('Translation failed:', error);
      
      // Decrement the queue counter and update loading state if all translations are complete
      setTranslationQueue(prev => {
        const newCount = prev - 1;
        if (newCount <= 0) {
          setTimeout(() => setIsLoading(false), 400);
        }
        return newCount;
      });
      
      return text; // Return original text on any error
    }
  };

  const clearCache = useCallback(() => {
    console.log("Clearing translation cache");
    setTranslationCache({});
  }, []);

  return {
    translate,
    clearCache,
    translationCache,
    isLoading,
    setIsLoading
  };
}
