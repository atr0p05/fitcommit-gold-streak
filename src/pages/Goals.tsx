
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import GoalCard from '@/components/GoalCard';

const Goals = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 10);
  }, []);

  const dailyGoals = [
    {
      id: 1,
      title: "Daily Steps",
      description: "Reach your daily step target",
      currentValue: 8734,
      targetValue: 10000,
      unit: "steps",
      isComplete: false
    },
    {
      id: 2,
      title: "Active Minutes",
      description: "Time spent in movement",
      currentValue: 45,
      targetValue: 60,
      unit: "min",
      isComplete: false
    }
  ];
  
  const weeklyGoals = [
    {
      id: 3,
      title: "Weekly Workouts",
      description: "Complete weekly workout sessions",
      currentValue: 4,
      targetValue: 5,
      unit: "sessions",
      isComplete: false
    },
    {
      id: 4,
      title: "Gym Check-ins",
      description: "Visit your home gym location",
      currentValue: 3,
      targetValue: 3,
      unit: "visits",
      isComplete: true
    },
    {
      id: 5,
      title: "Heart Rate Zones",
      description: "Minutes in cardio zone",
      currentValue: 95,
      targetValue: 120,
      unit: "min",
      isComplete: false
    }
  ];
  
  return (
    <div className="min-h-screen bg-fitTrue">
      <Header />
      
      <div className="p-4 pt-24 pb-24 max-w-md mx-auto">
        <section className={`mb-premium transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-medium transition-all duration-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>Daily Goals</h2>
            <div className={`flex items-center transition-all duration-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-xs text-fitSilver uppercase tracking-wider mr-2">Penalties Today:</span>
              <span className="text-sm text-fitError font-medium">$0.99</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {dailyGoals.map((goal, index) => (
              <div
                key={goal.id}
                className={`transition-all duration-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{
                  transitionDelay: `${150 * (index + 1)}ms`,
                }}
              >
                <GoalCard {...goal} />
              </div>
            ))}
          </div>
        </section>
        
        <section className={`transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-medium transition-all duration-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>Weekly Goals</h2>
            <div className={`flex items-center transition-all duration-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-xs text-fitSilver uppercase tracking-wider mr-2">Week Penalties:</span>
              <span className="text-sm text-fitError font-medium">$0.99</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {weeklyGoals.map((goal, index) => (
              <div
                key={goal.id}
                className={`transition-all duration-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{
                  transitionDelay: `${150 * (index + 1)}ms`,
                }}
              >
                <GoalCard {...goal} />
              </div>
            ))}
          </div>
        </section>
        
        <div className={`mt-8 p-4 bg-fitCharcoal rounded-sm border border-white/5 transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <p className="text-xs text-center uppercase tracking-widest mb-4">Quarterly Pause</p>
          <p className="text-sm text-center mb-4">You have 2 pauses available this quarter for vacations or illness</p>
          <button className="btn-secondary w-full">Activate Pause (1 Week)</button>
        </div>
      </div>
    </div>
  );
};

export default Goals;
