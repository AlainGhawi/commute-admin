import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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

  protected readonly sidebarOpen = signal(true);

  protected readonly navItems: NavItem[] = [
    { icon: 'dashboard', labelKey: 'nav.dashboard', route: '/' },
    { icon: 'business', labelKey: 'nav.companies', route: '/companies' },
    { icon: 'people', labelKey: 'nav.employees', route: '/employees' },
    { icon: 'directions_car', labelKey: 'nav.rides', route: '/rides' },
    { icon: 'bar_chart', labelKey: 'nav.reports', route: '/reports' },
    { icon: 'settings', labelKey: 'nav.settings', route: '/settings' },
  ];

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
