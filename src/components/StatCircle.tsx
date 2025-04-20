
import React, { useEffect, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const percentage = (value / total) * 100;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dash = (circumference * percentage) / 100;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const sizeClasses = {
    sm: 'w-24 h-24 text-xl',
    md: 'w-32 h-32 text-2xl',
    lg: 'w-40 h-40 text-3xl',
  };
  
  return (
    <div className={cn(
      "flex flex-col items-center justify-center transition-all duration-700",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      className
    )}>
      <div className={cn(
        "relative flex items-center justify-center rounded-full backdrop-blur-sm border border-white/10",
        "bg-gradient-to-br from-black/40 to-black/20",
        "shadow-[0_8px_16px_rgba(0,0,0,0.5)]",
        sizeClasses[size]
      )}>
        <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth="4"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? circumference - dash : circumference}
            className={cn(
              colorClass,
              "transition-all duration-1500 ease-out"
            )}
          />
        </svg>
        <span className={cn(
          "font-sans font-medium relative z-10",
          colorClass,
          "text-shadow-lg"
        )}>{value}</span>
      </div>
      <span className={cn(
        "text-xs uppercase tracking-widest text-[#8E9196] mt-2 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        "delay-300"
      )}>
        {label}
      </span>
    </div>
  );
};

export default StatCircle;
