import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Check } from "lucide-react";
import GymLocationsManager from '@/components/settings/GymLocationsManager';
import NotificationCenter from '@/components/NotificationCenter';

const Settings = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 10);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-luxury">
      <Header />
      
      <div className="p-4 pt-24 pb-24 max-w-md mx-auto">
        <h2 className={`text-xl font-medium mb-6 text-white transition-all duration-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>Settings</h2>
        
        {/* Notifications Section */}
        <section className={`luxury-card mb-6 transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="text-lg uppercase tracking-wide mb-4 text-white">Notifications & Reminders</h3>
          <NotificationCenter />
        </section>
        
        <section className={`luxury-card mb-6 transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="text-lg uppercase tracking-wide mb-4 text-white">Account</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-white">Email</span>
              <span className="text-sm text-gray-300">user@example.com</span>
            </div>
            
            <div className="border-t border-gray-700"></div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-white">Payment Method</span>
              <span className="text-sm text-gray-300">Apple Pay ●●●●</span>
            </div>
            
            <div className="border-t border-gray-700"></div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-white">Current Plan</span>
              <span className="text-sm text-yellow-400">Premium</span>
            </div>
          </div>
        </section>
        
        <section className={`luxury-card mb-6 transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="text-lg uppercase tracking-wide mb-4 text-white">Goals</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm text-white">Daily Steps</span>
                <p className="text-xs text-gray-300 mt-1">Your daily step target</p>
              </div>
              <span className="text-sm text-gray-300">10,000</span>
            </div>
            
            <div className="border-t border-gray-700"></div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm text-white">Weekly Workouts</span>
                <p className="text-xs text-gray-300 mt-1">Weekly workout sessions</p>
              </div>
              <span className="text-sm text-gray-300">5</span>
            </div>
            
            <div className="border-t border-gray-700"></div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm text-white">Gym Check-ins</span>
                <p className="text-xs text-gray-300 mt-1">Weekly gym visits</p>
              </div>
              <span className="text-sm text-gray-300">3</span>
            </div>
          </div>
          
          <button className="btn-secondary w-full mt-6">Edit Goals</button>
        </section>
        
        <section className={`luxury-card mb-6 transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="text-lg uppercase tracking-wide mb-4 text-white">Gym Locations</h3>
          <GymLocationsManager />
        </section>
        
        <div className={`text-center transition-all duration-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button className="text-red-400 text-sm hover:text-red-300 transition-colors">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
