
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartLine, History } from "lucide-react";

interface PerformanceData {
  date: string;
  value: number;
}

const mockData = {
  steps: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: Math.floor(Math.random() * 4000) + 6000
  })),
  workouts: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: Math.floor(Math.random() * 3) + 1
  })),
  heartRate: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: Math.floor(Math.random() * 20) + 60
  }))
};

const PerformanceHistory = () => {
  return (
    <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">
          <div className="flex items-center space-x-2">
            <History className="h-4 w-4" />
            <span>Performance History</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="steps" className="space-y-4">
          <TabsList>
            <TabsTrigger value="steps">Daily Steps</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
          </TabsList>
          
          {Object.entries(mockData).map(([key, data]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <ChartContainer
                className="h-[200px]"
                config={{
                  line: {
                    color: "#6E59A5"
                  }
                }}
              >
                <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
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
                  <Line
                    type="monotone"
                    dataKey="value"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceHistory;
