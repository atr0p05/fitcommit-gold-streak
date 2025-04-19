
import React from 'react';
import { cn } from "@/lib/utils";
import { Check, Trophy } from "lucide-react";

interface GoalCardProps {
  title: string;
  description: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  isComplete: boolean;
  penaltyAmount?: number;
  className?: string;
}

const GoalCard: React.FC<GoalCardProps> = ({
  title,
  description,
  currentValue,
  targetValue,
  unit,
  isComplete,
  penaltyAmount = 0.99,
  className,
}) => {
  const progress = Math.min((currentValue / targetValue) * 100, 100);
  
  return (
    <div className={cn("card-premium", className)}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h5 className="text-lg font-medium uppercase tracking-wide">{title}</h5>
          <p className="text-sm text-fitSilver mt-1">{description}</p>
        </div>
        {isComplete ? (
          <div className="bg-fitSuccess/20 p-2 rounded-full">
            <Check className="w-4 h-4 text-fitSuccess" />
          </div>
        ) : (
          <div className="flex items-center">
            <span className="text-xs text-fitError uppercase tracking-wider mr-2">Penalty</span>
            <span className="text-sm text-fitError font-medium">${penaltyAmount}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between mt-6">
        <div className="flex items-baseline">
          <span className={cn("text-2xl font-medium", 
            isComplete ? "text-fitGold" : "text-white"
          )}>{currentValue}</span>
          <span className="text-fitSilver text-sm ml-1">/ {targetValue} {unit}</span>
        </div>
        {progress >= 80 && !isComplete && (
          <Trophy className="w-5 h-5 text-fitGold animate-pulse-gold" />
        )}
      </div>
      
      <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isComplete ? "bg-fitGold" : progress >= 70 ? "bg-fitSuccess" : "bg-fitSilver"
          )} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default GoalCard;
