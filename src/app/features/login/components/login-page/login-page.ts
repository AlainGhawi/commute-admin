import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../../core/auth/auth.service';

type LoginState = 'idle' | 'sending' | 'sent' | 'redeeming' | 'error';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class LoginPageComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly email = signal('');
  protected readonly token = signal('');
  protected readonly state = signal<LoginState>('idle');
  protected readonly errorMessage = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return;
    }
    const queryToken = this.route.snapshot.queryParamMap.get('token');
    if (queryToken) {
      this.token.set(queryToken);
      await this.redeem();
    }
  }

  protected async sendLink(): Promise<void> {
    const value = this.email().trim();
    if (!value) return;
    this.state.set('sending');
    this.errorMessage.set(null);
    try {
      await this.auth.requestMagicLink(value);
      this.state.set('sent');
    } catch (err) {
      this.state.set('error');
      this.errorMessage.set(formatError(err, 'We could not send the magic link.'));
    }
  }

  protected async redeem(): Promise<void> {
    const value = this.token().trim();
    if (!value) return;
    this.state.set('redeeming');
    this.errorMessage.set(null);
    try {
      await this.auth.redeem(value);
      this.router.navigate(['/']);
    } catch (err) {
      this.state.set('error');
      this.errorMessage.set(formatError(err, 'That link is invalid or expired. Request a fresh one.'));
    }
  }

  protected reset(): void {
    this.state.set('idle');
    this.token.set('');
    this.errorMessage.set(null);
  }
}

function formatError(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'error' in err) {
    const inner = (err as { error?: { detail?: string; title?: string } }).error;
    return inner?.detail ?? inner?.title ?? fallback;
  }
  return fallback;
}
