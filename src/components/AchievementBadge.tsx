
import React from 'react';
import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";

type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface AchievementBadgeProps {
  title: string;
  description: string;
  tier: BadgeTier;
  isUnlocked: boolean;
  progress?: number;
  className?: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  tier,
  isUnlocked,
  progress = 100,
  className,
}) => {
  const tierColors = {
    bronze: 'text-amber-600',
    silver: 'text-fitSilver',
    gold: 'text-fitGold',
    platinum: 'text-blue-300',
  };
  
  const tierBg = {
    bronze: 'bg-amber-900/20',
    silver: 'bg-gray-700/20',
    gold: 'bg-amber-900/20',
    platinum: 'bg-blue-900/20',
  };
  
  return (
    <div className={cn("card-premium", !isUnlocked && "opacity-60", className)}>
      <div className="flex items-start">
        <div className={cn("p-3 rounded-full mr-4", tierBg[tier])}>
          <Medal className={cn("w-6 h-6", tierColors[tier])} />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h5 className="text-base font-medium uppercase tracking-wide">{title}</h5>
            <span className={cn("text-xs uppercase tracking-wider font-medium", tierColors[tier])}>
              {tier}
            </span>
          </div>
          
          <p className="text-xs text-fitSilver mt-1">{description}</p>
          
          {!isUnlocked && progress < 100 && (
            <div className="mt-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-fitSilver">{progress}% Complete</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full rounded-full", tierColors[tier])} 
                  style={{ width: `${progress}%`, opacity: 0.8 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;
