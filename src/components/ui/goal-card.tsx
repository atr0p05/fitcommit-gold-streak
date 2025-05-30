
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface GoalCardProps {
  title: string;
  description: string;
  progress: number;
  target: number;
  current: number;
  unit: string;
  deadline?: string;
  isCompleted?: boolean;
  penalty?: number;
  className?: string;
}

export function GoalCard({
  title,
  description,
  progress,
  target,
  current,
  unit,
  deadline,
  isCompleted = false,
  penalty,
  className
}: GoalCardProps) {
  return (
    <div className={cn(
      "luxury-card rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
      isCompleted && "luxury-glow",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-white/70">{description}</p>
        </div>
        
        {isCompleted ? (
          <div className="p-2 rounded-full bg-luxury-gold/20">
            <Check className="w-5 h-5 text-luxury-gold" />
          </div>
        ) : (
          deadline && (
            <div className="flex items-center space-x-1 text-xs text-white/60">
              <Clock className="w-3 h-3" />
              <span>{deadline}</span>
            </div>
          )
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-white">{current}</span>
            <span className="text-luxury-platinum ml-1">/ {target} {unit}</span>
          </div>
          <span className={cn(
            "text-sm font-medium",
            progress >= 100 ? "text-luxury-gold" : "text-white/70"
          )}>
            {Math.round(progress)}%
          </span>
        </div>
        
        <Progress 
          value={progress} 
          className="h-2 bg-white/10"
        />
        
        {penalty && !isCompleted && (
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-xs text-white/60">Penalty if missed</span>
            <span className="text-sm font-semibold text-red-400">${penalty}</span>
          </div>
        )}
      </div>
    </div>
  );
}
