import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  type AuthUser,
  type AuthTokenResponse,
  type MagicLinkResponse,
  type UserRole,
} from './auth.model';

const TOKEN_KEY = 'commute-admin-jwt';

interface JwtPayload {
  sub?: string;
  email?: string;
  companyId?: string;
  // ASP.NET Core projects role into the long-form claim type
  ['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?: string;
  role?: string;
  exp?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly currentUser = signal<AuthUser | null>(null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly token = signal<string | null>(null);
  readonly isAdmin = computed(() => {
    const role = this.currentUser()?.role;
    return role === 'Admin' || role === 'SuperAdmin';
  });
  readonly isSuperAdmin = computed(() => this.currentUser()?.role === 'SuperAdmin');

  constructor() {
    this.hydrateFromStorage();
  }

  async requestMagicLink(email: string): Promise<MagicLinkResponse> {
    return firstValueFrom(
      this.http.post<MagicLinkResponse>(`${environment.apiBaseUrl}/auth/magic-link`, { email })
    );
  }

  async redeem(token: string): Promise<AuthUser> {
    const result = await firstValueFrom(
      this.http.post<AuthTokenResponse>(`${environment.apiBaseUrl}/auth/redeem`, { token })
    );
    this.persistToken(result.accessToken);
    const user = this.userFromToken(result.accessToken);
    if (!user) throw new Error('Invalid token returned by /auth/redeem.');
    this.currentUser.set(user);
    await this.tryEnrichCompanyName();
    return user;
  }

  logout(): void {
    this.persistToken(null);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private hydrateFromStorage(): void {
    if (typeof localStorage === 'undefined') return;
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return;
    const user = this.userFromToken(stored);
    if (!user) {
      localStorage.removeItem(TOKEN_KEY);
      return;
    }
    this.token.set(stored);
    this.currentUser.set(user);
    this.tryEnrichCompanyName();
  }

  private persistToken(token: string | null): void {
    this.token.set(token);
    if (typeof localStorage === 'undefined') return;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }

  private userFromToken(token: string): AuthUser | null {
    const payload = decodeJwt(token);
    if (!payload || !payload.sub || !payload.email || !payload.companyId) return null;
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    const role = (payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? payload.role ?? 'Employee') as UserRole;
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.email.split('@')[0],
      role,
      companyId: payload.companyId,
    };
  }

  private async tryEnrichCompanyName(): Promise<void> {
    const user = this.currentUser();
    if (!user) return;
    try {
      const company = await firstValueFrom(
        this.http.get<{ name: string }>(`${environment.apiBaseUrl}/companies/me`)
      );
      this.currentUser.set({ ...user, companyName: company?.name });
    } catch {
      // tolerate failures — header just shows the email
    }
  }
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    const padded = payload.replace(/-/g, '+').replace(/_/g, '/');
    const fill = padded + '==='.slice((padded.length + 3) % 4);
    const json = typeof atob === 'function'
      ? atob(fill)
      : Buffer.from(fill, 'base64').toString('utf8');
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}
