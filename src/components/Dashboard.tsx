import React, { useEffect, useState } from 'react';
import StatCircle from './StatCircle';
import GoalCard from './GoalCard';
import StreakIndicator from './StreakIndicator';
import { Heart, Calendar, Star } from "lucide-react";

const Dashboard: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.85;
        
        if (isVisible) {
          setTimeout(() => {
            el.classList.add('animate-in');
          }, index * 50);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const stats = {
    steps: 8734,
    heartRate: 72,
    calories: 420
  };
  
  const goals = [
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
      title: "Weekly Workouts",
      description: "Complete weekly workout sessions",
      currentValue: 4,
      targetValue: 5,
      unit: "sessions",
      isComplete: false
    },
    {
      id: 3,
      title: "Target Heart Rate",
      description: "30 minutes in target zone",
      currentValue: 3,
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
    }
  ];
  
  const streakDays = [true, true, false, true, true, false, true];
  
  return (
    <div className="p-4 pt-24 pb-24 max-w-md mx-auto">
      <h2 className={`font-display text-xl font-medium mb-6 text-center tracking-tight transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        Today's Performance
      </h2>
      
      <section className={`mb-8 rounded-xl p-6 shadow-2xl transition-all duration-700 overflow-hidden relative ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#222222] to-[#333333] opacity-95" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        
        <div className="relative z-10 flex flex-col space-y-6">
          <div className="flex justify-center mb-2">
            <StatCircle
              value={stats.steps}
              total={10000}
              label="Steps"
              size="lg"
              colorClass="text-white"
              animate
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: Heart, label: "Avg. Heart Rate", value: stats.heartRate, unit: "bpm", color: "text-white" },
              { icon: Calendar, label: "Week Streak", value: 14, unit: "days", color: "text-white" },
              { icon: Star, label: "Calories Burned", value: stats.calories, unit: "kcal", color: "text-white" }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={`animate-on-scroll flex items-center bg-black/20 p-4 rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-1000 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
                style={{
                  transitionDelay: `${200 * (index + 1)}ms`,
                  willChange: 'transform, opacity'
                }}
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mr-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-[#8E9196] font-medium uppercase tracking-wide">{stat.label}</p>
                  <p className="text-xl font-medium text-white">{stat.value} <span className="text-sm text-[#8E9196]">{stat.unit}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="animate-on-scroll mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium tracking-tight">Active Goals</h2>
          <span className="text-xs text-[#8E9196] uppercase tracking-wider">This Week</span>
        </div>
        
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div
              key={goal.id}
              className="animate-on-scroll"
              style={{
                transitionDelay: `${150 * index}ms`,
                willChange: 'transform, opacity'
              }}
            >
              <GoalCard {...goal} />
            </div>
          ))}
        </div>
      </section>
      
      <div className="animate-on-scroll">
        <StreakIndicator 
          streakCount={14} 
          streakDays={streakDays} 
        />
      </div>
      
      <div className="animate-on-scroll mt-8 text-center">
        <p className="text-xs text-[#8E9196] uppercase tracking-widest mb-4">Financial Commitment</p>
        <p className="text-sm">You've avoided <span className="text-white">$12.87</span> in penalties this month</p>
      </div>
    </div>
  );
};

export default Dashboard;
