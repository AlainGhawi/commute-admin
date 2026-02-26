import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'commute-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /** User's explicit preference: 'light', 'dark', or 'system' */
  readonly preference = signal<ThemePreference>(this.loadPreference());

  /** Whether the OS prefers dark mode (live-updated via matchMedia listener) */
  readonly osPrefDark = signal(this.detectOsPreference());

  /** Resolved dark-mode state — the single source of truth for the UI */
  readonly isDark = computed(() => {
    const pref = this.preference();
    if (pref === 'system') return this.osPrefDark();
    return pref === 'dark';
  });

  constructor() {
    if (this.isBrowser) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', (e) => this.osPrefDark.set(e.matches));
    }

    effect(() => {
      this.applyTheme(this.isDark());
    });
  }

  setPreference(pref: ThemePreference): void {
    this.preference.set(pref);
    try {
      localStorage.setItem(STORAGE_KEY, pref);
    } catch {
      // localStorage unavailable (SSR, private browsing)
    }
  }

  toggleTheme(): void {
    this.setPreference(this.isDark() ? 'light' : 'dark');
  }

  private applyTheme(dark: boolean): void {
    if (!this.isBrowser) return;
    const root = document.documentElement;
    root.classList.toggle('dark-theme', dark);
    document.body.style.colorScheme = dark ? 'dark' : 'light';
  }

  private loadPreference(): ThemePreference {
    if (!this.isBrowser) return 'system';
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    } catch {
      // localStorage unavailable
    }
    return 'system';
  }

  private detectOsPreference(): boolean {
    if (!this.isBrowser) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
