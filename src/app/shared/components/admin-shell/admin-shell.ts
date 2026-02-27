import { Component, ChangeDetectionStrategy, inject, signal, effect, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, filter } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../../core/i18n/translation.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { APP } from '../../../core/config/app.constants';

interface NavItem {
  icon: string;
  labelKey: string;
  route: string;
}

@Component({
  selector: 'app-admin-shell',
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    TranslatePipe,
  ],
})
export class AdminShellComponent {
  protected readonly i18n = inject(TranslationService);
  protected readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);
  protected readonly appName = APP.name;
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);

  /** Whether the viewport is at desktop width (>= 1025px) */
  protected readonly isDesktop = toSignal(
    this.breakpointObserver
      .observe('(min-width: 1025px)')
      .pipe(map((result) => result.matches)),
    { initialValue: window.matchMedia('(min-width: 1025px)').matches },
  );

  /** Sidebar mode: 'side' for desktop, 'over' for mobile/tablet */
  protected readonly sidebarMode = computed(() => (this.isDesktop() ? 'side' : 'over'));

  /** Sidebar starts open on desktop, closed on mobile/tablet */
  protected readonly sidebarOpen = signal(window.matchMedia('(min-width: 1025px)').matches);

  protected readonly navItems: NavItem[] = [
    { icon: 'dashboard', labelKey: 'nav.dashboard', route: '/' },
    { icon: 'business', labelKey: 'nav.companies', route: '/companies' },
    { icon: 'people', labelKey: 'nav.employees', route: '/employees' },
    { icon: 'directions_car', labelKey: 'nav.rides', route: '/rides' },
    { icon: 'bar_chart', labelKey: 'nav.reports', route: '/reports' },
    { icon: 'settings', labelKey: 'nav.settings', route: '/settings' },
  ];

  constructor() {
    // Auto-open sidebar on desktop, auto-close on mobile when viewport resizes
    effect(() => {
      this.sidebarOpen.set(this.isDesktop());
    });

    // Close sidebar after navigation in overlay mode (mobile/tablet)
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (!this.isDesktop()) {
          this.sidebarOpen.set(false);
        }
      });
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  protected toggleTheme(): void {
    this.theme.toggleTheme();
  }

  protected toggleLocale(): void {
    this.i18n.toggleLocale();
  }

  protected logout(): void {
    this.auth.logout();
  }
}
