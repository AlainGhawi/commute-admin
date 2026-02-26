import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

// Polyfill matchMedia for test environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.removeItem('commute-theme');
    document.documentElement.classList.remove('dark-theme');

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.removeItem('commute-theme');
    document.documentElement.classList.remove('dark-theme');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to system preference', () => {
    expect(service.preference()).toBe('system');
  });

  it('should persist preference to localStorage', () => {
    service.setPreference('dark');
    expect(localStorage.getItem('commute-theme')).toBe('dark');
  });

  it('should toggle from light to dark', () => {
    service.setPreference('light');
    service.toggleTheme();
    expect(service.preference()).toBe('dark');
    expect(service.isDark()).toBe(true);
  });

  it('should toggle from dark to light', () => {
    service.setPreference('dark');
    service.toggleTheme();
    expect(service.preference()).toBe('light');
    expect(service.isDark()).toBe(false);
  });

  it('should resolve isDark based on explicit preference', () => {
    service.setPreference('dark');
    expect(service.isDark()).toBe(true);

    service.setPreference('light');
    expect(service.isDark()).toBe(false);
  });
});
