
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { HealthData } from "@/utils/healthService";
import { parseISO, format } from 'date-fns';

interface PerformanceStepsChartProps {
  stepsData: HealthData[];
  loading: boolean;
}

const PerformanceStepsChart: React.FC<PerformanceStepsChartProps> = ({ stepsData, loading }) => {
  if (loading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading data...</span>
      </div>
    );
  }

  if (stepsData.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center">
        <span className="text-sm text-muted-foreground">No data available</span>
      </div>
    );
  }

  // Ensure data is sorted and includes all dates
  const processedData = stepsData.map(data => ({
    ...data,
    date: format(parseISO(data.date), 'MMM d'),
  }));

  return (
    <ChartContainer config={{}} className="h-[200px]">
      <LineChart 
        data={processedData} 
        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
      >
        <CartesianGrid 
          horizontal={false} 
          vertical={false} 
          strokeDasharray="3 3" 
        />
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
          padding={{ left: 20, right: 20 }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <ChartTooltip />
        <Line 
          type="monotone" 
          dataKey="value" 
          strokeWidth={2} 
          dot={false} 
          stroke="#8884d8"
        />
      </LineChart>
    </ChartContainer>
  );
};

export default PerformanceStepsChart;
