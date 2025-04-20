import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Check } from "lucide-react";
import GymLocationsManager from '@/components/settings/GymLocationsManager';

const Settings = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 10);
  }, []);

  return (
    <div className="min-h-screen bg-fitTrue">
      <Header />
      
      <div className="p-4 pt-24 pb-24 max-w-md mx-auto">
        <h2 className={`text-xl font-medium mb-6 transition-all duration-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>Settings</h2>
        
        <section className={`card-premium mb-premium transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="text-lg uppercase tracking-wide mb-4">Account</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm">Email</span>
              <span className="text-sm text-fitSilver">user@example.com</span>
            </div>
            
            <div className="divider"></div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-sm">Payment Method</span>
              <span className="text-sm text-fitSilver">Apple Pay ●●●●</span>
            </div>
            
            <div className="divider"></div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-sm">Current Plan</span>
              <span className="text-sm text-fitGold">Premium</span>
            </div>
          </div>
        </section>
        
        <section className={`card-premium mb-premium transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="text-lg uppercase tracking-wide mb-4">Goals</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm">Daily Steps</span>
                <p className="text-xs text-fitSilver mt-1">Your daily step target</p>
              </div>
              <span className="text-sm">10,000</span>
            </div>
            
            <div className="divider"></div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm">Weekly Workouts</span>
                <p className="text-xs text-fitSilver mt-1">Weekly workout sessions</p>
              </div>
              <span className="text-sm">5</span>
            </div>
            
            <div className="divider"></div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm">Gym Check-ins</span>
                <p className="text-xs text-fitSilver mt-1">Weekly gym visits</p>
              </div>
              <span className="text-sm">3</span>
            </div>
          </div>
          
          <button className="btn-secondary w-full mt-6">Edit Goals</button>
        </section>
        
        <section className={`card-premium mb-premium transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="text-lg uppercase tracking-wide mb-4">Notifications</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm">Goal Reminders</span>
                <p className="text-xs text-fitSilver mt-1">Daily reminders to complete goals</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-fitGold/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-fitGold" />
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm">Achievement Alerts</span>
                <p className="text-xs text-fitSilver mt-1">Notify when achievements are unlocked</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-fitGold/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-fitGold" />
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm">Penalty Alerts</span>
                <p className="text-xs text-fitSilver mt-1">Notify before penalties are charged</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-fitGold/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-fitGold" />
              </div>
            </div>
          </div>
        </section>
        
        <section className={`card-premium mb-premium transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="text-lg uppercase tracking-wide mb-4">Gym Locations</h3>
          <GymLocationsManager />
        </section>
        
        <div className={`text-center transition-all duration-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button className="text-fitError text-sm">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
