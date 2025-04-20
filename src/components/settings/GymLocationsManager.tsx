
import React, { useState } from 'react';
import { MapPin, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { geofencingService, GymLocation } from '@/utils/geofencingService';

const GymLocationsManager = () => {
  const [gyms, setGyms] = useState<GymLocation[]>(geofencingService.getGymLocations());
  const [newGymName, setNewGymName] = useState('');
  const [newGymLatitude, setNewGymLatitude] = useState('');
  const [newGymLongitude, setNewGymLongitude] = useState('');

  const handleAddGym = () => {
    if (newGymName && newGymLatitude && newGymLongitude) {
      const newGym = geofencingService.addGymLocation({
        name: newGymName,
        latitude: parseFloat(newGymLatitude),
        longitude: parseFloat(newGymLongitude),
        radius: 100 // Default radius in meters
      });
      setGyms([...gyms, newGym]);
      setNewGymName('');
      setNewGymLatitude('');
      setNewGymLongitude('');
    }
  };

  const handleRemoveGym = (gymId: string) => {
    if (geofencingService.removeGymLocation(gymId)) {
      setGyms(gyms.filter(gym => gym.id !== gymId));
    }
  };

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add New Gym Location
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Gym Location</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div>
              <Input
                placeholder="Gym Name"
                value={newGymName}
                onChange={(e) => setNewGymName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Latitude"
                type="number"
                step="0.000001"
                value={newGymLatitude}
                onChange={(e) => setNewGymLatitude(e.target.value)}
              />
              <Input
                placeholder="Longitude"
                type="number"
                step="0.000001"
                value={newGymLongitude}
                onChange={(e) => setNewGymLongitude(e.target.value)}
              />
            </div>
            <Button 
              variant="default" 
              className="w-full"
              onClick={handleAddGym}
              disabled={!newGymName || !newGymLatitude || !newGymLongitude}
            >
              Add Gym
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-2">
        {gyms.map((gym) => (
          <div
            key={gym.id}
            className="flex items-center justify-between p-4 bg-fitCharcoal rounded-sm border border-white/5"
          >
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-fitSilver" />
              <div>
                <p className="text-sm font-medium">{gym.name}</p>
                <p className="text-xs text-fitSilver">
                  {gym.latitude.toFixed(6)}, {gym.longitude.toFixed(6)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-fitError hover:text-fitError/90"
              onClick={() => handleRemoveGym(gym.id)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymLocationsManager;
