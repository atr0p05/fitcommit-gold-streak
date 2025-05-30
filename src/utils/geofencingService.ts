import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

export interface GymLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
}

interface WorkoutSession {
  gymId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
}

class GeofencingService {
  private isTracking = false;
  private currentLocation: { latitude: number; longitude: number } | null = null;
  private workoutSessions: WorkoutSession[] = [];
  private gymLocations: GymLocation[] = [
    {
      id: 'equinox-1',
      name: 'Equinox Downtown',
      latitude: 40.7128,
      longitude: -74.0060,
      radius: 100
    },
    {
      id: 'equinox-2', 
      name: 'Equinox Midtown',
      latitude: 40.7549,
      longitude: -73.9840,
      radius: 100
    }
  ];

  async startTracking(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
      console.warn('Geolocation tracking is only available on native platforms');
      return false;
    }

    try {
      // Request location permissions
      const permissions = await Geolocation.requestPermissions();
      
      if (permissions.location !== 'granted') {
        console.error('Location permission denied');
        return false;
      }

      this.isTracking = true;
      console.log('Started gym visit tracking');
      
      // Start monitoring location
      this.monitorLocation();
      
      return true;
    } catch (error) {
      console.error('Failed to start geofencing:', error);
      return false;
    }
  }

  stopTracking(): void {
    this.isTracking = false;
    console.log('Stopped gym visit tracking');
  }

  getGymLocations(): GymLocation[] {
    return [...this.gymLocations];
  }

  addGymLocation(gym: Omit<GymLocation, 'id'>): GymLocation {
    const newGym: GymLocation = {
      ...gym,
      id: `gym-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    this.gymLocations.push(newGym);
    return newGym;
  }

  removeGymLocation(gymId: string): boolean {
    const initialLength = this.gymLocations.length;
    this.gymLocations = this.gymLocations.filter(gym => gym.id !== gymId);
    return this.gymLocations.length < initialLength;
  }

  private async monitorLocation(): Promise<void> {
    if (!this.isTracking) return;

    try {
      const position = await Geolocation.getCurrentPosition();
      this.currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      // Check if user is near any gym
      this.checkGymProximity();

      // Continue monitoring
      setTimeout(() => this.monitorLocation(), 60000); // Check every minute
    } catch (error) {
      console.error('Error monitoring location:', error);
    }
  }

  private checkGymProximity(): void {
    if (!this.currentLocation) return;

    for (const gym of this.gymLocations) {
      const distance = this.calculateDistance(
        this.currentLocation.latitude,
        this.currentLocation.longitude,
        gym.latitude,
        gym.longitude
      );

      if (distance <= gym.radius) {
        console.log(`User is at ${gym.name}`);
        this.handleGymEntry(gym.id);
      }
    }
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  private handleGymEntry(gymId: string): void {
    // Check if there's already an active session
    const activeSession = this.workoutSessions.find(
      session => session.gymId === gymId && !session.endTime
    );

    if (!activeSession) {
      // Start new workout session
      this.workoutSessions.push({
        gymId,
        startTime: new Date()
      });
      console.log(`Started workout session at gym ${gymId}`);
    }
  }

  getWorkoutDates(): Date[] {
    return this.workoutSessions
      .filter(session => session.duration && session.duration >= 30) // At least 30 minutes
      .map(session => session.startTime);
  }

  getWeeklyWorkoutCount(): number {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return this.workoutSessions.filter(session => 
      session.startTime >= oneWeekAgo && 
      session.duration && 
      session.duration >= 30
    ).length;
  }

  isTrackingActive(): boolean {
    return this.isTracking;
  }
}

export const geofencingService = new GeofencingService();
