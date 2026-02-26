import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { type AuthUser, type LoginCredentials } from './auth.model';

const STORAGE_KEY = 'commute-admin-auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  readonly currentUser = signal<AuthUser | null>(this.loadUser());
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  login(credentials: LoginCredentials): void {
    // Mock login — replace with real API call
    const mockUser: AuthUser = {
      id: '1',
      email: credentials.email,
      name: 'Admin User',
      role: 'admin',
      tenantId: 'tenant-1',
      tenantName: 'Acme Corp',
    };
    this.currentUser.set(mockUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    } catch {
      // localStorage unavailable
    }
    this.router.navigate(['/']);
  }

  logout(): void {
    this.currentUser.set(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable
    }
    this.router.navigate(['/login']);
  }

  private loadUser(): AuthUser | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  }
}
