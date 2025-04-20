
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
      <h2 className="font-display text-xl font-medium mb-6 text-center tracking-tight">Today's Performance</h2>
      
      <section className="mb-8 bg-gradient-to-br from-[#1A1F2C] to-[#2C3444] rounded-xl p-6 shadow-2xl border border-white/5">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-center mb-2">
            <StatCircle
              value={stats.steps}
              total={10000}
              label="Steps"
              size="lg"
              colorClass="text-[#9b87f5]"
              animate
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center bg-black/20 p-4 rounded-lg backdrop-blur-sm border border-white/5">
              <div className="w-12 h-12 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-[#9b87f5]" />
              </div>
              <div>
                <p className="text-xs text-[#8E9196] font-medium uppercase tracking-wide">Avg. Heart Rate</p>
                <p className="text-xl font-medium text-white">{stats.heartRate} <span className="text-sm text-[#8E9196]">bpm</span></p>
              </div>
            </div>
            
            <div className="flex items-center bg-black/20 p-4 rounded-lg backdrop-blur-sm border border-white/5">
              <div className="w-12 h-12 rounded-full bg-[#7E69AB]/10 flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-[#7E69AB]" />
              </div>
              <div>
                <p className="text-xs text-[#8E9196] font-medium uppercase tracking-wide">Week Streak</p>
                <p className="text-xl font-medium text-white">14 <span className="text-sm text-[#8E9196]">days</span></p>
              </div>
            </div>
            
            <div className="flex items-center bg-black/20 p-4 rounded-lg backdrop-blur-sm border border-white/5">
              <div className="w-12 h-12 rounded-full bg-[#6E59A5]/10 flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-[#6E59A5]" />
              </div>
              <div>
                <p className="text-xs text-[#8E9196] font-medium uppercase tracking-wide">Calories Burned</p>
                <p className="text-xl font-medium text-white">{stats.calories} <span className="text-sm text-[#8E9196]">kcal</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-premium">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium tracking-tight">Active Goals</h2>
          <span className="text-xs text-[#8E9196] uppercase tracking-wider">This Week</span>
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
        <p className="text-xs text-[#8E9196] uppercase tracking-widest mb-4">Financial Commitment</p>
        <p className="text-sm">You've avoided <span className="text-[#9b87f5]">$12.87</span> in penalties this month</p>
      </div>
    </div>
  );
};

export default Dashboard;
