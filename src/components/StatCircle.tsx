
import React from 'react';
import { cn } from "@/lib/utils";

interface StatCircleProps {
  value: number;
  total?: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  colorClass?: string;
  className?: string;
  animate?: boolean;
}

const StatCircle: React.FC<StatCircleProps> = ({
  value,
  total = 100,
  label,
  size = 'md',
  colorClass = 'text-[#9b87f5]',
  className,
  animate = false,
}) => {
  const percentage = (value / total) * 100;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dash = (circumference * percentage) / 100;
  
  const sizeClasses = {
    sm: 'w-24 h-24 text-xl',
    md: 'w-32 h-32 text-2xl',
    lg: 'w-40 h-40 text-3xl',
  };
  
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className={cn(
        "relative flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm border border-white/5",
        sizeClasses[size]
      )}>
        <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
            className={cn(colorClass, animate && "transition-all duration-1000")}
          />
        </svg>
        <span className={cn("font-sans font-medium relative z-10", colorClass)}>{value}</span>
      </div>
      <span className="text-xs uppercase tracking-widest text-[#8E9196] mt-2">{label}</span>
    </div>
  );
};

export default StatCircle;
