import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-company-detail',
  template: `
    <h1 class="page-title">Company Detail</h1>
    <mat-card>
      <mat-card-content>
        <p>{{ 'common.loading' | translate }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .page-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: var(--space-6);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, TranslatePipe],
})
export class CompanyDetailComponent {}
