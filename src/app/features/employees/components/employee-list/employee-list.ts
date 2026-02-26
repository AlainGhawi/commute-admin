import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { MOCK_EMPLOYEES } from '../../../../mock/employees.mock';
import { type Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
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
export class EmployeeListComponent {
  protected readonly employees = signal<Employee[]>(MOCK_EMPLOYEES);
  protected readonly displayedColumns = ['name', 'email', 'role', 'homeZone', 'status', 'actions'];
}
