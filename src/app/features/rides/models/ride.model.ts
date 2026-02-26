export interface Ride {
  id: string;
  driverId: string;
  driverName: string;
  riderIds: string[];
  riderNames: string[];
  origin: string;
  destination: string;
  departureTime: string;
  seatsAvailable: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export interface Match {
  id: string;
  rideId: string;
  driverId: string;
  riderIds: string[];
  score: number;
  status: 'pending' | 'accepted' | 'declined';
}

export interface DashboardStats {
  totalEmployees: number;
  activeRides: number;
  matchRate: number;
  co2SavedKg: number;
}
