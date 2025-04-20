import { Capacitor } from '@capacitor/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { toast } from "@/components/ui/use-toast";

class GeofencingService {
  private createGeolocationPosition(coords: GeolocationCoordinates): GeolocationPosition {
    return {
      coords,
      timestamp: Date.now(),
      toJSON: () => ({
        coords: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
          altitude: coords.altitude,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          speed: coords.speed
        },
        timestamp: Date.now()
      })
    };
  }

  private workoutLocations: { lat: number, lng: number, name: string }[] = [];
  private workoutDates: Date[] = [];
  private currentWorkout: { startTime?: number, location?: { lat: number, lng: number } } = {};

  private onLocationUpdate(position: Position) {
    const pos = this.createGeolocationPosition(position.coords);
    
    if (!Capacitor.isNativePlatform()) {
      console.log('Location update:', pos.coords.latitude, pos.coords.longitude);
      return;
    }

    const gymLocation = this.workoutLocations[0]; // Use the first gym location for simplicity
    if (!gymLocation) {
      console.warn('No gym location set for geofencing.');
      return;
    }

    const distance = this.calculateDistance(
      pos.coords.latitude,
      pos.coords.longitude,
      gymLocation.lat,
      gymLocation.lng
    );

    const isInsideGeofence = distance < 100; // 100 meters

    if (isInsideGeofence && !this.currentWorkout.startTime) {
      // Start workout
      this.startWorkout(gymLocation.lat, gymLocation.lng);
      toast({
        title: "Workout Started",
        description: `You've arrived at ${gymLocation.name}. Tracking your workout.`,
      });
    } else if (!isInsideGeofence && this.currentWorkout.startTime) {
      // End workout
      const duration = Date.now() - this.currentWorkout.startTime;
        if (duration >= 30 * 60 * 1000) { // 30 minutes
          this.workoutDates.push(new Date());
          toast({
            title: "Workout Complete",
            description: `Great job! You worked out for ${Math.round(duration / (60 * 1000))} minutes.`,
          });
        } else {
          toast({
            title: "Workout Ended",
            description: `You left ${gymLocation.name} too soon. Minimum workout duration is 30 minutes.`,
            variant: "destructive",
          });
        }
      this.endWorkout();
    } else {
      //In geofence
    }

    if (this.currentWorkout.startTime && this.currentWorkout.location) {
      const duration = Date.now() - this.currentWorkout.startTime;
      if (duration >= 30 * 60 * 1000) { // 30 minutes
        this.workoutDates.push(new Date());
      }
    }
  }

  private async getCurrentPosition(): Promise<Position | null> {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return coordinates;
    } catch (error) {
      console.error('Error getting current position:', error);
      toast({
        title: "Location Error",
        description: "Could not get current location. Please ensure location services are enabled.",
        variant: "destructive",
      });
      return null;
    }
  }

  public startTracking(): boolean {
    if (!Capacitor.isNativePlatform()) {
      toast({
        title: "Location Tracking Unavailable",
        description: "Location tracking requires a native device.",
        variant: "destructive",
      });
      return false;
    }

    Geolocation.requestPermissions().then(result => {
      if (result.location === 'granted') {
        Geolocation.watchPosition({}, (position, err) => {
          if (err) {
            console.log(err)
            return;
          }
          if (position) {
            this.onLocationUpdate(position);
          }
        });
      } else {
        toast({
          title: "Location Permissions Denied",
          description: "Please enable location permissions to track gym visits.",
          variant: "destructive",
        });
        return false;
      }
    });
    return true;
  }

  public stopTracking(): void {
    Geolocation.clearWatch({ id: 'watch' });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  }

  private startWorkout(lat: number, lng: number): void {
    this.currentWorkout = {
      startTime: Date.now(),
      location: { lat, lng }
    };
  }

  private endWorkout(): void {
    this.currentWorkout = {};
  }

  public getWorkoutDates(): Date[] {
    return this.workoutDates;
  }

  public getWeeklyWorkoutCount(): number {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    let count = 0;
    for (const date of this.workoutDates) {
      if (date >= startOfWeek) {
        count++;
      }
    }
    return count;
  }
}

export const geofencingService = new GeofencingService();
