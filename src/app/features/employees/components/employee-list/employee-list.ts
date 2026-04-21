import { Component, ChangeDetectionStrategy, inject, signal, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
import { AdminApiService, type AdminUser, type BulkImportResult } from '../../../../core/services/admin-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
})
export class EmployeeListComponent implements OnInit {
  private readonly api = inject(AdminApiService);
  @ViewChild('csvInput') csvInput!: ElementRef<HTMLInputElement>;

  protected readonly employees = signal<AdminUser[]>([]);
  protected readonly totalCount = signal(0);
  protected readonly loading = signal(true);
  protected readonly importing = signal(false);
  protected readonly importResult = signal<BulkImportResult | null>(null);
  protected readonly error = signal<string | null>(null);
  protected readonly displayedColumns = ['name', 'email', 'role', 'preference', 'profile', 'status'];

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  protected pickFile(): void {
    this.csvInput.nativeElement.click();
  }

  protected async onFileChosen(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.importing.set(true);
    this.importResult.set(null);
    this.error.set(null);
    try {
      const result = await firstValueFrom(this.api.importUsersCsv(file));
      this.importResult.set(result);
      await this.refresh();
    } catch (err) {
      this.error.set('CSV import failed. Check the file format and try again.');
      console.error(err);
    } finally {
      this.importing.set(false);
      input.value = '';
    }
  }

  private async refresh(): Promise<void> {
    this.loading.set(true);
    try {
      const page = await firstValueFrom(this.api.users(1, 100));
      this.employees.set(page.items);
      this.totalCount.set(page.totalCount);
    } catch (err) {
      this.error.set('Could not load employees.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}
