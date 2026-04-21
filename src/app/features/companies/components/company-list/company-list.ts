import { Component, ChangeDetectionStrategy, inject, signal, OnInit, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminApiService, type AdminCompany, type PilotCompany } from '../../../../core/services/admin-api.service';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.html',
  styleUrl: './company-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
})
export class CompanyListComponent implements OnInit {
  private readonly api = inject(AdminApiService);
  private readonly auth = inject(AuthService);

  protected readonly isSuperAdmin = computed(() => this.auth.isSuperAdmin());
  protected readonly companies = signal<AdminCompany[]>([]);
  protected readonly myCompany = signal<PilotCompany | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly displayedColumns = ['name', 'domain', 'hq', 'co2', 'created'];

  async ngOnInit(): Promise<void> {
    try {
      if (this.isSuperAdmin()) {
        const all = await firstValueFrom(this.api.allCompanies());
        this.companies.set(all);
      } else {
        const mine = await firstValueFrom(this.api.myCompany());
        this.myCompany.set(mine);
      }
    } catch (err) {
      this.error.set('Could not load company information.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}
