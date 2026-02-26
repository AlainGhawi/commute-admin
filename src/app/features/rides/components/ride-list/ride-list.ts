import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { MOCK_RIDES } from '../../../../mock/rides.mock';
import { type Ride } from '../../models/ride.model';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.html',
  styleUrl: './ride-list.scss',
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
export class RideListComponent {
  protected readonly rides = signal<Ride[]>(MOCK_RIDES);
  protected readonly displayedColumns = [
    'driverName',
    'riderNames',
    'destination',
    'departureTime',
    'status',
    'actions',
  ];
}
