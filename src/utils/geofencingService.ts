
import { Capacitor } from '@capacitor/core';

export interface GymLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
}

export interface GymVisit {
  gymId: string;
  enteredAt: Date;
  exitedAt: Date | null;
  durationMinutes: number;
}

class GeofencingService {
  private gymLocations: GymLocation[] = [];
  private currentVisits: Record<string, GymVisit> = {};
  private isNative = Capacitor.isNativePlatform();
  private locationWatchId: number | null = null;
  private weeklyVisitRequirement = 3; // times per week
  private minDurationRequirement = 30; // minutes
  
  // Store completed valid workouts
  private completedWorkouts: GymVisit[] = [];

  constructor() {
    // Example gym locations
    this.gymLocations = [
      {
        id: 'gym1',
        name: 'Downtown Fitness',
        latitude: 37.7749,
        longitude: -122.4194,
        radius: 100
      },
      {
        id: 'gym2',
        name: 'Uptown Health Club',
        latitude: 37.7833,
        longitude: -122.4167,
        radius: 100
      },
      {
        id: 'gym3',
        name: 'Westside Gym',
        latitude: 37.7694,
        longitude: -122.4862,
        radius: 100
      }
    ];

    // Load stored workouts from localStorage
    this.loadWorkouts();
  }

  private loadWorkouts() {
    try {
      const savedWorkouts = localStorage.getItem('completedWorkouts');
      if (savedWorkouts) {
        const parsedWorkouts = JSON.parse(savedWorkouts);
        // Convert string dates back to Date objects
        this.completedWorkouts = parsedWorkouts.map((workout: any) => ({
          ...workout,
          enteredAt: new Date(workout.enteredAt),
          exitedAt: workout.exitedAt ? new Date(workout.exitedAt) : null
        }));
      }
    } catch (error) {
      console.error('Error loading workouts from storage:', error);
    }
  }

  private saveWorkouts() {
    try {
      localStorage.setItem('completedWorkouts', JSON.stringify(this.completedWorkouts));
    } catch (error) {
      console.error('Error saving workouts to storage:', error);
    }
  }

  public startTracking(): boolean {
    if (!this.isNative) {
      console.log('Geofencing is only available on native platforms');
      return false;
    }

    if (this.locationWatchId !== null) {
      console.log('Location tracking is already active');
      return true;
    }

    try {
      // In a real implementation, we would use a Capacitor plugin for geofencing or location
      // For now, we'll simulate with a timer
      this.simulateLocationTracking();
      return true;
    } catch (error) {
      console.error('Failed to start geofencing:', error);
      return false;
    }
  }

  public stopTracking() {
    if (this.locationWatchId !== null) {
      // Clear the interval in our simulation
      clearInterval(this.locationWatchId);
      this.locationWatchId = null;
      
      // Close any open visits
      this.closeAllOpenVisits();
    }
  }

  private closeAllOpenVisits() {
    const now = new Date();
    
    Object.keys(this.currentVisits).forEach(gymId => {
      const visit = this.currentVisits[gymId];
      if (visit && !visit.exitedAt) {
        visit.exitedAt = now;
        visit.durationMinutes = this.calculateDuration(visit.enteredAt, now);
        
        // Check if this visit qualifies as a workout
        if (visit.durationMinutes >= this.minDurationRequirement) {
          this.completedWorkouts.push({...visit});
          this.saveWorkouts();
        }
      }
    });
    
    // Clear current visits
    this.currentVisits = {};
  }

  private calculateDuration(start: Date, end: Date): number {
    const diffMs = end.getTime() - start.getTime();
    return Math.floor(diffMs / 60000); // Convert ms to minutes
  }

  private simulateLocationTracking() {
    // Simulate location updates every 30 seconds
    this.locationWatchId = window.setInterval(() => {
      // Randomly decide if user is at a gym
      const rand = Math.random();
      
      if (rand < 0.7) { // 70% chance of being at a gym
        const gymIndex = Math.floor(Math.random() * this.gymLocations.length);
        const gym = this.gymLocations[gymIndex];
        
        this.handleLocationUpdate({
          coords: {
            latitude: gym.latitude + (Math.random() * 0.0001 - 0.00005),
            longitude: gym.longitude + (Math.random() * 0.0001 - 0.00005),
            accuracy: 10
          },
          timestamp: Date.now()
        });
      } else {
        // User is not at any gym
        this.handleLocationUpdate({
          coords: {
            latitude: 37.7 + (Math.random() * 0.1),
            longitude: -122.4 + (Math.random() * 0.1),
            accuracy: 10
          },
          timestamp: Date.now()
        });
      }
    }, 30000); // 30 seconds
  }

  private handleLocationUpdate(position: GeolocationPosition) {
    const { latitude, longitude } = position.coords;
    
    // Check each gym location
    this.gymLocations.forEach(gym => {
      const distance = this.calculateDistance(
        latitude, longitude,
        gym.latitude, gym.longitude
      );
      
      const isInGym = distance <= gym.radius;
      
      if (isInGym && !this.currentVisits[gym.id]) {
        // User entered the gym
        this.currentVisits[gym.id] = {
          gymId: gym.id,
          enteredAt: new Date(),
          exitedAt: null,
          durationMinutes: 0
        };
        console.log(`Entered ${gym.name}`);
      } else if (!isInGym && this.currentVisits[gym.id] && !this.currentVisits[gym.id].exitedAt) {
        // User exited the gym
        const visit = this.currentVisits[gym.id];
        const now = new Date();
        visit.exitedAt = now;
        visit.durationMinutes = this.calculateDuration(visit.enteredAt, now);
        
        console.log(`Exited ${gym.name} after ${visit.durationMinutes} minutes`);
        
        // If duration is at least 30 minutes, count it as a workout
        if (visit.durationMinutes >= this.minDurationRequirement) {
          this.completedWorkouts.push({...visit});
          this.saveWorkouts();
          console.log(`Recorded a ${visit.durationMinutes}-minute workout at ${gym.name}`);
        }
      }
    });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Haversine formula to calculate distance between two points
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c; // Distance in meters
  }

  public getWeeklyWorkouts(): GymVisit[] {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return this.completedWorkouts.filter(workout => 
      workout.enteredAt >= oneWeekAgo
    );
  }

  public getTotalWorkouts(): number {
    return this.completedWorkouts.length;
  }

  public getWeeklyWorkoutCount(): number {
    return this.getWeeklyWorkouts().length;
  }

  public getWorkoutDates(): Date[] {
    return this.completedWorkouts.map(workout => new Date(workout.enteredAt));
  }

  public getGymLocations(): GymLocation[] {
    return [...this.gymLocations];
  }

  public addGymLocation(location: Omit<GymLocation, 'id'>): GymLocation {
    const newGym = {
      ...location,
      id: `gym${Date.now()}`
    };
    
    this.gymLocations.push(newGym);
    return newGym;
  }

  public removeGymLocation(gymId: string): boolean {
    const initialLength = this.gymLocations.length;
    this.gymLocations = this.gymLocations.filter(gym => gym.id !== gymId);
    return this.gymLocations.length !== initialLength;
  }
}

// Export a singleton instance
export const geofencingService = new GeofencingService();
