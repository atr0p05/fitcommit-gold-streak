
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Area, ComposedChart, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { HealthData } from "@/utils/healthService";
import { format } from 'date-fns';

interface HeartRateZoneChartProps {
  heartRateData: HealthData[];
  loading: boolean;
}

const HeartRateZoneChart: React.FC<HeartRateZoneChartProps> = ({ heartRateData, loading }) => {
  // Calculate heart rate zones based on age (assuming 30 years old for demo)
  const maxHeartRate = 190; // 220 - 30
  const zones = {
    zone1: { min: maxHeartRate * 0.5, max: maxHeartRate * 0.6, color: '#22c55e', name: 'Zone 1 (Recovery)' },
    zone2: { min: maxHeartRate * 0.6, max: maxHeartRate * 0.7, color: '#3b82f6', name: 'Zone 2 (Aerobic)' },
    zone3: { min: maxHeartRate * 0.7, max: maxHeartRate * 0.8, color: '#f59e0b', name: 'Zone 3 (Threshold)' },
    zone4: { min: maxHeartRate * 0.8, max: maxHeartRate * 1.0, color: '#ef4444', name: 'Zone 4 (Anaerobic)' },
  };

  const formatDateString = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'HH:mm');
  };

  const getZoneForHeartRate = (hr: number) => {
    if (hr >= zones.zone4.min) return 'zone4';
    if (hr >= zones.zone3.min) return 'zone3';
    if (hr >= zones.zone2.min) return 'zone2';
    if (hr >= zones.zone1.min) return 'zone1';
    return 'rest';
  };

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading heart rate data...</span>
      </div>
    );
  }

  if (heartRateData.length === 0) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center space-y-4">
        <span className="text-sm text-muted-foreground">No heart rate data available</span>
        <div className="text-xs text-muted-foreground">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(zones).map(([key, zone]) => (
              <div key={key} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded" 
                  style={{ backgroundColor: zone.color }}
                />
                <span>{zone.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Generate hourly data points throughout the day with some sample data
  const hourlyData = Array.from({ length: 24 }, (_, hour) => {
    const existingData = heartRateData.find(d => {
      const dataHour = new Date(d.date).getHours();
      return dataHour === hour;
    });

    // Generate realistic heart rate data if none exists
    let heartRate = existingData?.value || 0;
    if (!existingData) {
      // Simulate daily heart rate pattern
      if (hour >= 6 && hour <= 8) heartRate = 65 + Math.random() * 15; // Morning
      else if (hour >= 9 && hour <= 17) heartRate = 70 + Math.random() * 20; // Day
      else if (hour >= 18 && hour <= 20) heartRate = 120 + Math.random() * 40; // Exercise
      else heartRate = 55 + Math.random() * 10; // Rest
    }

    const zone = getZoneForHeartRate(heartRate);
    
    return {
      time: `${hour.toString().padStart(2, '0')}:00`,
      heartRate: Math.round(heartRate),
      zone,
      zoneColor: zones[zone as keyof typeof zones]?.color || '#6b7280',
      // Zone backgrounds for area charts
      zone1: zones.zone1.max,
      zone2: zones.zone2.max,
      zone3: zones.zone3.max,
      zone4: zones.zone4.max,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const zone = zones[data.zone as keyof typeof zones];
      
      return (
        <div className="bg-background/95 border border-border/50 rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="font-medium">{data.heartRate} BPM</span>
          </p>
          {zone && (
            <p className="text-xs" style={{ color: zone.color }}>
              {zone.name}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Zone Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-xs">
        {Object.entries(zones).map(([key, zone]) => (
          <div key={key} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded" 
              style={{ backgroundColor: zone.color }}
            />
            <span className="text-muted-foreground">{zone.name}</span>
            <span className="text-muted-foreground">
              {Math.round(zone.min)}-{Math.round(zone.max)} BPM
            </span>
          </div>
        ))}
      </div>

      {/* Heart Rate Chart with Zone Backgrounds */}
      <ChartContainer config={{}} className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={hourlyData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            {/* Zone background areas */}
            <defs>
              <linearGradient id="zone1Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={zones.zone1.color} stopOpacity={0.1} />
                <stop offset="100%" stopColor={zones.zone1.color} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="zone2Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={zones.zone2.color} stopOpacity={0.1} />
                <stop offset="100%" stopColor={zones.zone2.color} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="zone3Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={zones.zone3.color} stopOpacity={0.1} />
                <stop offset="100%" stopColor={zones.zone3.color} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="zone4Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={zones.zone4.color} stopOpacity={0.1} />
                <stop offset="100%" stopColor={zones.zone4.color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            
            <XAxis
              dataKey="time"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[40, 200]}
              tickFormatter={(value) => `${value}`}
            />
            
            {/* Zone reference lines */}
            <Line 
              type="monotone" 
              dataKey="zone1" 
              stroke={zones.zone1.color} 
              strokeWidth={1} 
              strokeDasharray="3 3" 
              dot={false}
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="zone2" 
              stroke={zones.zone2.color} 
              strokeWidth={1} 
              strokeDasharray="3 3" 
              dot={false}
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="zone3" 
              stroke={zones.zone3.color} 
              strokeWidth={1} 
              strokeDasharray="3 3" 
              dot={false}
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="zone4" 
              stroke={zones.zone4.color} 
              strokeWidth={1} 
              strokeDasharray="3 3" 
              dot={false}
              connectNulls={false}
            />
            
            {/* Main heart rate line */}
            <Line 
              type="monotone" 
              dataKey="heartRate" 
              stroke="#ffffff" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#ffffff' }}
              activeDot={{ r: 6, fill: '#ffffff' }}
            />
            
            <ChartTooltip content={<CustomTooltip />} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Current Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-lg font-bold text-white">72</div>
          <div className="text-xs text-white/60">Current BPM</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-lg font-bold text-white">156</div>
          <div className="text-xs text-white/60">Max Today</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-lg font-bold text-white">58</div>
          <div className="text-xs text-white/60">Resting HR</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-lg font-bold text-luxury-gold">Zone 2</div>
          <div className="text-xs text-white/60">Current Zone</div>
        </div>
      </div>
    </div>
  );
};

export default HeartRateZoneChart;
