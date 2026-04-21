import { Component, ChangeDetectionStrategy, inject, signal, OnInit, computed } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
import { AdminApiService, type AdminMetrics, type WeeklyActivePoint } from '../../../../core/services/admin-api.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SlicePipe, MatCardModule, MatIconModule, MatProgressSpinnerModule],
})
export class DashboardPageComponent implements OnInit {
  private readonly api = inject(AdminApiService);

  protected readonly metrics = signal<AdminMetrics | null>(null);
  protected readonly weekly = signal<WeeklyActivePoint[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly chartPath = computed(() => buildChartPath(this.weekly()));

  async ngOnInit(): Promise<void> {
    try {
      const [metrics, weekly] = await Promise.all([
        firstValueFrom(this.api.metrics()),
        firstValueFrom(this.api.weeklyActive(8)),
      ]);
      this.metrics.set(metrics);
      this.weekly.set(weekly);
    } catch (err) {
      this.error.set('Could not load dashboard metrics. Make sure the backend is running.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}

const CHART_WIDTH = 320;
const CHART_HEIGHT = 80;

function buildChartPath(points: WeeklyActivePoint[]): string {
  if (points.length === 0) return '';
  const max = Math.max(1, ...points.map(p => p.activeUsers));
  const stepX = CHART_WIDTH / Math.max(1, points.length - 1);
  return points
    .map((p, i) => {
      const x = i * stepX;
      const y = CHART_HEIGHT - (p.activeUsers / max) * CHART_HEIGHT;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}
