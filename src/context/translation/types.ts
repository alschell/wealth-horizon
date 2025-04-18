
// Define available languages
export type LanguageCode = 
  | 'en' // English
  | 'zh' // Chinese
  | 'es' // Spanish
  | 'ar' // Arabic
  | 'pt' // Portuguese
  | 'ru' // Russian
  | 'ja' // Japanese
  | 'fr' // French
  | 'de' // German
  | 'ko'; // Korean

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export interface TranslationContextType {
  currentLanguage: LanguageCode;
  setLanguage: (language: LanguageCode) => Promise<void>;
  translate: (text: string) => Promise<string>;
  translationCache: Record<string, Record<string, string>>;
  isLoading: boolean;
}

export interface ProcessedTextResult {
  processedText: string;
  placeholders: Record<string, string>;
}
