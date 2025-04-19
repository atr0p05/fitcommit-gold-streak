import React from 'react';
import StatCircle from './StatCircle';
import GoalCard from './GoalCard';
import StreakIndicator from './StreakIndicator';
import { Heart, Calendar, Star } from "lucide-react";

const Dashboard: React.FC = () => {
  // Mock data for demonstration
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
  
  // Mock data for streak (active for 5 of last 7 days)
  const streakDays = [true, true, false, true, true, false, true];
  
  return (
    <div className="p-4 pt-24 pb-24 max-w-md mx-auto">
      <h2 className="font-display text-xl font-medium mb-6">Today's Performance</h2>
      
      <section className="mb-premium">
        <div className="flex justify-between items-center">
          <StatCircle
            value={stats.steps}
            total={10000}
            label="Steps"
            size="md"
            colorClass="text-fitGold"
            animate
          />
          
          <div className="flex flex-col space-y-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-fitCharcoal border border-white/5 flex items-center justify-center mr-3">
                <Heart className="w-5 h-5 text-fitGold" />
              </div>
              <div>
                <p className="text-xs text-fitSilver">Avg. Heart Rate</p>
                <p className="text-lg font-medium">{stats.heartRate} <span className="text-xs text-fitSilver">bpm</span></p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-fitCharcoal border border-white/5 flex items-center justify-center mr-3">
                <Calendar className="w-5 h-5 text-fitGold" />
              </div>
              <div>
                <p className="text-xs text-fitSilver">Week Streak</p>
                <p className="text-lg font-medium">14 <span className="text-xs text-fitSilver">days</span></p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-fitCharcoal border border-white/5 flex items-center justify-center mr-3">
                <Star className="w-5 h-5 text-fitGold" />
              </div>
              <div>
                <p className="text-xs text-fitSilver">Calories Burned</p>
                <p className="text-lg font-medium">{stats.calories} <span className="text-xs text-fitSilver">kcal</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-premium">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Active Goals</h2>
          <span className="text-xs text-fitSilver uppercase tracking-wider">This Week</span>
        </div>
        
        <div className="space-y-4">
          {goals.map(goal => (
            <GoalCard key={goal.id} {...goal} />
          ))}
        </div>
      </section>
      
      <StreakIndicator 
        streakCount={14} 
        streakDays={streakDays} 
      />
      
      <div className="mt-8 text-center">
        <p className="text-xs text-fitSilver uppercase tracking-widest mb-4">Financial Commitment</p>
        <p className="text-sm">You've avoided <span className="text-fitGold">$12.87</span> in penalties this month</p>
      </div>
    </div>
  );
};

export default Dashboard;
