
import React from 'react';
import { cn } from "@/lib/utils";

interface StreakIndicatorProps {
  streakCount: number;
  streakDays: boolean[];
  className?: string;
}

const StreakIndicator: React.FC<StreakIndicatorProps> = ({
  streakCount,
  streakDays,
  className,
}) => {
  return (
    <div className={cn("card-premium", className)}>
      <div className="flex items-baseline">
        <h5 className="text-lg font-medium uppercase">Current Streak</h5>
        <span className="ml-2 text-xs text-fitSilver uppercase tracking-widest">Days</span>
      </div>
      
      <div className="flex items-center mt-4">
        <span className="text-3xl font-medium text-fitGold mr-4">{streakCount}</span>
        <div className="flex space-x-1.5">
          {streakDays.map((active, index) => (
            <div 
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                active ? "bg-fitGold" : "bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
      
      <div className="divider my-4" />
      
      <p className="text-xs text-fitSilver">
        Maintain your streak to earn additional achievement badges and avoid penalties
      </p>
    </div>
  );
};

export default StreakIndicator;
