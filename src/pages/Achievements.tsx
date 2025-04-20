import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import AchievementBadge from '@/components/AchievementBadge';

const Achievements = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 10);
  }, []);

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
        <section className={`mb-premium transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-medium transition-all duration-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>Unlocked Achievements</h2>
            <div className={`flex items-center transition-all duration-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-4 h-4 rounded-full bg-fitGold mr-1"></div>
              <span className="text-xs text-fitSilver uppercase tracking-wider">3 / 9</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {unlockedAchievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`transition-all duration-50 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{
                  transitionDelay: `${50 * (index + 1)}ms`,
                }}
              >
                <AchievementBadge {...achievement} />
              </div>
            ))}
          </div>
        </section>
        
        <section className={`transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-medium transition-all duration-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>Locked Achievements</h2>
            <span className={`text-xs text-fitSilver uppercase tracking-wider transition-all duration-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>In Progress</span>
          </div>
          
          <div className="space-y-4">
            {lockedAchievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`transition-all duration-50 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{
                  transitionDelay: `${50 * (index + 1)}ms`,
                }}
              >
                <AchievementBadge {...achievement} />
              </div>
            ))}
          </div>
        </section>
        
        <div className={`mt-8 text-center transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <p className="text-xs text-fitSilver uppercase tracking-widest mb-2">Achievement Rewards</p>
          <p className="text-sm">Unlock all gold achievements to earn a free week of no penalties</p>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
