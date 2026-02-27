import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-employee-detail',
  template: `
    <h1 class="page-title">Employee Detail</h1>
    <mat-card>
      <mat-card-content>
        <p>{{ 'common.loading' | translate }}</p>
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, TranslatePipe],
})
export class EmployeeDetailComponent {}
