import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-settings-page',
  template: `
    <h1 class="page-title">{{ 'settings.title' | translate }}</h1>
    <mat-card>
      <mat-card-content class="placeholder">
        <mat-icon class="placeholder-icon">settings</mat-icon>
        <p>Tenant settings and preferences will appear here.</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .page-title {
        font-size: var(--font-size-page-title);
        font-weight: 600;
        margin-bottom: var(--space-4);
      }
      @media (min-width: 768px) {
        .page-title {
          margin-bottom: var(--space-6);
        }
      }
      .placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: var(--space-8);
        color: var(--color-text-muted);
      }
      @media (min-width: 1025px) {
        .placeholder {
          padding: var(--space-12);
        }
      }
      .placeholder-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
        margin-bottom: var(--space-4);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatIconModule, TranslatePipe],
})
export class SettingsPageComponent {}
