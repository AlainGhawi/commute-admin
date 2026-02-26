import { Injectable, signal, computed } from '@angular/core';
import { translations, type Locale } from './translations';

const STORAGE_KEY = 'commute-locale';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly locale = signal<Locale>(this.detectLocale());

  readonly isEn = computed(() => this.locale() === 'en');
  readonly isFr = computed(() => this.locale() === 'fr');

  t(key: string): string {
    return translations[this.locale()][key] ?? translations['en'][key] ?? key;
  }

  setLocale(locale: Locale): void {
    this.locale.set(locale);
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // localStorage unavailable (SSR, private browsing)
    }
  }

  toggleLocale(): void {
    this.setLocale(this.locale() === 'en' ? 'fr' : 'en');
  }

  private detectLocale(): Locale {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'fr') return saved;
    } catch {
      // localStorage unavailable
    }
    const browserLang = navigator?.language ?? 'en';
    return browserLang.startsWith('fr') ? 'fr' : 'en';
  }
}
