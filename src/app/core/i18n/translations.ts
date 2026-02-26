export type Locale = 'en' | 'fr';

export type TranslationMap = Record<string, string>;

export type Translations = Record<Locale, TranslationMap>;

import { en } from './en';
import { fr } from './fr';

export const translations: Translations = { en, fr };
