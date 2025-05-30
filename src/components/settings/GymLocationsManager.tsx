
import React, { useState } from 'react';
import { MapPin, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { geofencingService, GymLocation } from '@/utils/geofencingService';
import { useToast } from '@/hooks/use-toast';
import LocationPicker from './LocationPicker';

const GymLocationsManager = () => {
  const [gyms, setGyms] = useState<GymLocation[]>(geofencingService.getGymLocations());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleLocationSelect = (location: { name: string; latitude: number; longitude: number }) => {
    const newGym = geofencingService.addGymLocation({
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      radius: 100 // Default radius in meters
    });
    
    setGyms([...gyms, newGym]);
    setIsDialogOpen(false);
    
    toast({
      title: "Gym Added",
      description: `${location.name} has been added to your gym locations.`,
    });
  };

  const handleRemoveGym = (gymId: string) => {
    const gym = gyms.find(g => g.id === gymId);
    if (geofencingService.removeGymLocation(gymId)) {
      setGyms(gyms.filter(gym => gym.id !== gymId));
      toast({
        title: "Gym Removed",
        description: `${gym?.name || 'Gym'} has been removed from your locations.`,
      });
    }
  };

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full bg-fitCharcoal border-white/20 text-white hover:bg-fitCharcoal/80">
            <Plus className="w-4 h-4 mr-2" />
            Add New Gym Location
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-fitCharcoal border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Gym Location</DialogTitle>
          </DialogHeader>
          <LocationPicker 
            onLocationSelect={handleLocationSelect}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="space-y-2">
        {gyms.map((gym) => (
          <div
            key={gym.id}
            className="flex items-center justify-between p-4 bg-fitCharcoal rounded-sm border border-white/5"
          >
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-fitGold" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{gym.name}</p>
                <p className="text-xs text-fitSilver">
                  {gym.latitude.toFixed(6)}, {gym.longitude.toFixed(6)} • {gym.radius}m radius
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-fitError hover:text-fitError/90 hover:bg-fitError/10"
              onClick={() => handleRemoveGym(gym.id)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        {gyms.length === 0 && (
          <div className="text-center py-8 text-fitSilver">
            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No gym locations added yet</p>
            <p className="text-xs">Add your first gym to start tracking workouts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GymLocationsManager;
