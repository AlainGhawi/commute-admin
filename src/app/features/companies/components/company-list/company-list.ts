import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { MOCK_COMPANIES } from '../../../../mock/companies.mock';
import { type Company } from '../../models/company.model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.html',
  styleUrl: './company-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    TranslatePipe,
  ],
})
export class CompanyListComponent {
  protected readonly companies = signal<Company[]>(MOCK_COMPANIES);
  protected readonly displayedColumns = ['name', 'employeeCount', 'plan', 'status', 'actions'];
}
