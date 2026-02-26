import { type Ride } from '../features/rides/models/ride.model';

export const MOCK_RIDES: Ride[] = [
  {
    id: 'r1',
    driverId: 'e1',
    driverName: 'Alice Martin',
    riderIds: ['e3'],
    riderNames: ['Clara Dubois'],
    origin: 'Plateau Mont-Royal',
    destination: 'Downtown Montreal',
    departureTime: '2026-02-25T08:00:00',
    seatsAvailable: 2,
    status: 'scheduled',
  },
  {
    id: 'r2',
    driverId: 'e2',
    driverName: 'Bob Tremblay',
    riderIds: ['e4'],
    riderNames: ['David Chen'],
    origin: 'Laval',
    destination: 'Downtown Montreal',
    departureTime: '2026-02-25T07:30:00',
    seatsAvailable: 3,
    status: 'in-progress',
  },
];
