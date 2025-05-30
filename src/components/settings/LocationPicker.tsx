
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Target, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LocationPickerProps {
  onLocationSelect: (location: { name: string; latitude: number; longitude: number }) => void;
  onClose: () => void;
}

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
  type: string;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { toast } = useToast();

  const searchLocations = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Enhanced search for gyms and fitness centers
      const gymSearchQuery = `${query} gym fitness center sport club`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(gymSearchQuery)}&limit=5&countrycodes=us,ca,gb,au&addressdetails=1&extratags=1`
      );
      const results = await response.json();
      
      // Filter results to prioritize gyms and fitness facilities
      const filteredResults = results.filter((result: any) => {
        const name = result.display_name.toLowerCase();
        const type = result.type?.toLowerCase() || '';
        const category = result.category?.toLowerCase() || '';
        
        return name.includes('gym') || 
               name.includes('fitness') || 
               name.includes('sport') || 
               name.includes('club') ||
               type.includes('leisure') ||
               category.includes('leisure');
      });
      
      // If no gym-specific results, show all results but prioritize relevant ones
      setSearchResults(filteredResults.length > 0 ? filteredResults : results);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Failed",
        description: "Could not search for gym locations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Reverse geocode to get a readable name
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const result = await response.json();
      
      const locationName = result.display_name || `Location at ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      
      onLocationSelect({
        name: locationName,
        latitude,
        longitude
      });
    } catch (error) {
      console.error('Geolocation error:', error);
      toast({
        title: "Location Access Failed",
        description: "Could not access your current location. Please search for your gym instead.",
        variant: "destructive",
      });
    } finally {
      setIsGettingLocation(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        searchLocations(searchQuery);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Button
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="w-full bg-white hover:bg-gray-100 text-black font-medium"
        >
          {isGettingLocation ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Target className="w-4 h-4 mr-2" />
          )}
          Use Current Location
        </Button>
        
        <div className="text-center text-sm text-fitSilver">
          or
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fitSilver w-4 h-4" />
        <Input
          placeholder="Search for your gym by name (e.g., 'Planet Fitness', 'Gold's Gym')"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-fitCharcoal border-white/10 text-white placeholder:text-fitSilver"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-fitSilver" />
        )}
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {searchResults.map((result, index) => (
            <button
              key={index}
              onClick={() => onLocationSelect({
                name: result.display_name,
                latitude: parseFloat(result.lat),
                longitude: parseFloat(result.lon)
              })}
              className="w-full text-left p-3 bg-fitCharcoal hover:bg-fitCharcoal/80 border border-white/10 rounded-sm transition-colors"
            >
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-fitGold flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">{result.display_name}</p>
                  <p className="text-xs text-fitSilver">
                    {parseFloat(result.lat).toFixed(4)}, {parseFloat(result.lon).toFixed(4)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {searchQuery && !isSearching && searchResults.length === 0 && (
        <div className="text-center py-4 text-fitSilver text-sm">
          No gym locations found. Try searching for a specific gym name or brand.
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
