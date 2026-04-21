import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AdminMetrics {
  totalEmployees: number;
  profileCompletedEmployees: number;
  activeCarpoolers: number;
  activeCarpoolerPercent: number;
  totalTrips: number;
  totalKmSaved: number;
  totalCo2SavedTons: number;
  totalCo2SavedGrams: number;
  totalDollarsSaved: number;
}

export interface WeeklyActivePoint {
  weekStart: string;
  activeUsers: number;
  tripCount: number;
}

export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: 'Employee' | 'Admin' | 'SuperAdmin';
  preference: 'Driver' | 'Rider' | 'Both';
  homeAddress: string | null;
  profileCompleted: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface AdminUserPage {
  items: AdminUser[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface AdminTrip {
  id: string;
  carpoolId: string;
  driverId: string;
  riderId: string;
  completedAt: string;
  distanceKm: number;
  co2SavedGrams: number;
  dollarsSaved: number;
}

export interface AdminTripPage {
  items: AdminTrip[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface BulkImportResult {
  created: number;
  skipped: number;
  errors: string[];
}

export interface AdminCompany {
  id: string;
  name: string;
  logoUrl: string | null;
  allowedEmailDomain: string;
  hqAddress: string;
  hqLatitude: number;
  hqLongitude: number;
  co2GramsPerKm: number;
  isActive: boolean;
  createdAt: string;
}

export interface PilotCompany {
  id: string;
  name: string;
  logoUrl: string | null;
  allowedEmailDomain: string;
  hqAddress: string;
  hqLatitude: number;
  hqLongitude: number;
  co2GramsPerKm: number;
}

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;

  metrics(): Observable<AdminMetrics> {
    return this.http.get<AdminMetrics>(`${this.base}/admin/metrics`);
  }

  weeklyActive(weeks = 8): Observable<WeeklyActivePoint[]> {
    return this.http.get<WeeklyActivePoint[]>(`${this.base}/admin/weekly-active`, {
      params: new HttpParams().set('weeks', weeks),
    });
  }

  users(page = 1, pageSize = 25): Observable<AdminUserPage> {
    return this.http.get<AdminUserPage>(`${this.base}/admin/users`, {
      params: new HttpParams().set('page', page).set('pageSize', pageSize),
    });
  }

  importUsersCsv(file: File): Observable<BulkImportResult> {
    const form = new FormData();
    form.append('file', file, file.name);
    return this.http.post<BulkImportResult>(`${this.base}/admin/users/csv`, form);
  }

  trips(page = 1, pageSize = 50): Observable<AdminTripPage> {
    return this.http.get<AdminTripPage>(`${this.base}/admin/trips`, {
      params: new HttpParams().set('page', page).set('pageSize', pageSize),
    });
  }

  tripsCsvUrl(): string {
    return `${this.base}/admin/trips.csv`;
  }

  myCompany(): Observable<PilotCompany> {
    return this.http.get<PilotCompany>(`${this.base}/companies/me`);
  }

  // SuperAdmin only
  allCompanies(): Observable<AdminCompany[]> {
    return this.http.get<AdminCompany[]>(`${this.base}/super-admin/companies`);
  }
}
