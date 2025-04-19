
import React from 'react';
import Header from '@/components/Header';
import AchievementBadge from '@/components/AchievementBadge';

const Achievements = () => {
  // Mock data for demonstration
  const unlockedAchievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first 10,000 steps in a day",
      tier: "bronze" as const,
      isUnlocked: true
    },
    {
      id: 2,
      title: "Gym Warrior",
      description: "Check in to your gym 10 times",
      tier: "silver" as const,
      isUnlocked: true
    },
    {
      id: 3,
      title: "Streak Master",
      description: "Maintain a 14-day streak of completing all goals",
      tier: "gold" as const,
      isUnlocked: true
    }
  ];
  
  const lockedAchievements = [
    {
      id: 4,
      title: "Marathon Maker",
      description: "Walk the equivalent of a full marathon in a week",
      tier: "gold" as const,
      isUnlocked: false,
      progress: 65
    },
    {
      id: 5,
      title: "Heart Zone Hero",
      description: "Spend 150 minutes in cardio heart zone in a week",
      tier: "silver" as const,
      isUnlocked: false,
      progress: 80
    },
    {
      id: 6,
      title: "Perfect Month",
      description: "Complete all daily and weekly goals for a full month",
      tier: "platinum" as const,
      isUnlocked: false,
      progress: 23
    }
  ];
  
  return (
    <div className="min-h-screen bg-fitTrue">
      <Header />
      
      <div className="p-4 pt-24 pb-24 max-w-md mx-auto">
        <section className="mb-premium">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Unlocked Achievements</h2>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-fitGold mr-1"></div>
              <span className="text-xs text-fitSilver uppercase tracking-wider">3 / 9</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {unlockedAchievements.map(achievement => (
              <AchievementBadge key={achievement.id} {...achievement} />
            ))}
          </div>
        </section>
        
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Locked Achievements</h2>
            <span className="text-xs text-fitSilver uppercase tracking-wider">In Progress</span>
          </div>
          
          <div className="space-y-4">
            {lockedAchievements.map(achievement => (
              <AchievementBadge key={achievement.id} {...achievement} />
            ))}
          </div>
        </section>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-fitSilver uppercase tracking-widest mb-2">Achievement Rewards</p>
          <p className="text-sm">Unlock all gold achievements to earn a free week of no penalties</p>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
