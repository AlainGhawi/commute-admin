import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, SlicePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
import { AdminApiService, type AdminTrip } from '../../../../core/services/admin-api.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.html',
  styleUrl: './ride-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    DecimalPipe,
    SlicePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
})
export class RideListComponent implements OnInit {
  private readonly api = inject(AdminApiService);
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  protected readonly trips = signal<AdminTrip[]>([]);
  protected readonly totalCount = signal(0);
  protected readonly loading = signal(true);
  protected readonly exporting = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly displayedColumns = ['completedAt', 'driverId', 'riderId', 'distanceKm', 'co2', 'dollars'];

  async ngOnInit(): Promise<void> {
    try {
      const page = await firstValueFrom(this.api.trips(1, 100));
      this.trips.set(page.items);
      this.totalCount.set(page.totalCount);
    } catch (err) {
      this.error.set('Could not load trips.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  protected async exportCsv(): Promise<void> {
    this.exporting.set(true);
    try {
      const token = this.auth.token();
      const response = await fetch(`${environment.apiBaseUrl}/admin/trips.csv`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const filename = extractFilename(response.headers.get('content-disposition')) ?? `trips-${new Date().toISOString().slice(0, 10)}.csv`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      this.error.set('CSV export failed.');
      console.error(err);
    } finally {
      this.exporting.set(false);
    }
  }
}

function extractFilename(header: string | null): string | null {
  if (!header) return null;
  const match = /filename="?([^";]+)"?/i.exec(header);
  return match ? match[1] : null;
}
