
import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { HealthData } from "@/utils/healthService";
import { format } from 'date-fns';

interface PerformanceStepsChartProps {
  stepsData: HealthData[];
  loading: boolean;
}

const PerformanceStepsChart: React.FC<PerformanceStepsChartProps> = ({ stepsData, loading }) => {
  const formatDateString = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'MMM d');
  };

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

  return (
    <ChartContainer config={{}} className="h-[200px]">
      <LineChart 
        data={stepsData.map(data => ({
          ...data,
          date: formatDateString(data.date)
        }))} 
        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
      >
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <ChartTooltip />
        <Line type="monotone" dataKey="value" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
};

export default PerformanceStepsChart;
