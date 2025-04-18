
import { ProcessedTextResult } from './types';
import { NON_TRANSLATABLE_TERMS } from './constants';

// Process text before translation to protect non-translatable terms
export const protectSpecialTerms = (text: string): ProcessedTextResult => {
  let processedText = text;
  const placeholders: Record<string, string> = {};
  
  NON_TRANSLATABLE_TERMS.forEach((term, index) => {
    const placeholder = `___PLACEHOLDER_${index}___`;
    const regex = new RegExp(term, 'g');
    
    if (processedText.match(regex)) {
      processedText = processedText.replace(regex, placeholder);
      placeholders[placeholder] = term;
    }
  });
  
  return { processedText, placeholders };
};

// Restore protected terms after translation
export const restoreSpecialTerms = (translatedText: string, placeholders: Record<string, string>): string => {
  let result = translatedText;
  
  Object.entries(placeholders).forEach(([placeholder, originalTerm]) => {
    const regex = new RegExp(placeholder, 'g');
    result = result.replace(regex, originalTerm);
  });
  
  return result;
};

// Update HTML attributes for language
export const updateHtmlLangAttributes = (languageCode: string): void => {
  document.documentElement.lang = languageCode;
  document.documentElement.dir = ['ar', 'he', 'fa'].includes(languageCode) ? 'rtl' : 'ltr';
};
