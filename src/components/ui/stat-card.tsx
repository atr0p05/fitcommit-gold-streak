
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  variant?: "default" | "premium";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = "neutral",
  trendValue,
  className,
  variant = "default"
}: StatCardProps) {
  return (
    <div className={cn(
      "luxury-card rounded-xl p-6 transition-all duration-300 hover:scale-105",
      variant === "premium" && "luxury-glow",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-white/10">
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trendValue && (
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend === "up" && "text-green-400 bg-green-400/20",
            trend === "down" && "text-red-400 bg-red-400/20",
            trend === "neutral" && "text-gray-300 bg-white/10"
          )}>
            {trendValue}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-sm font-medium text-gray-300">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
