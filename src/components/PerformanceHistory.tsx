
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { History } from "lucide-react";
import { healthService, HealthData } from "@/utils/healthService";
import { useToast } from "@/components/ui/use-toast";

const PerformanceHistory = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [healthData, setHealthData] = useState<{
    steps: HealthData[];
    workouts: HealthData[];
    heartRate: HealthData[];
  }>({
    steps: [],
    workouts: [],
    heartRate: []
  });

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        setLoading(true);
        
        const [steps, workouts, heartRate] = await Promise.all([
          healthService.getStepData(),
          healthService.getWorkoutData(),
          healthService.getHeartRateData()
        ]);
        
        setHealthData({ steps, workouts, heartRate });
      } catch (error) {
        console.error('Error fetching health data:', error);
        toast({
          title: "Error loading health data",
          description: "Could not load your health data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, [toast]);

  const handleConnectHealth = async () => {
    try {
      const success = await healthService.requestAuthorization();
      if (success) {
        toast({
          title: "Connected to Apple Health",
          description: "Your health data will now be synchronized",
        });
        
        // Refresh data after connecting
        const [steps, workouts, heartRate] = await Promise.all([
          healthService.getStepData(),
          healthService.getWorkoutData(),
          healthService.getHeartRateData()
        ]);
        
        setHealthData({ steps, workouts, heartRate });
      } else {
        toast({
          title: "Connection Failed",
          description: "Could not connect to Apple Health. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Health connection error:', error);
      toast({
        title: "Connection Error",
        description: "An error occurred while connecting to Apple Health",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">
          <div className="flex items-center space-x-2">
            <History className="h-4 w-4" />
            <span>Performance History</span>
          </div>
        </CardTitle>
        
        {!healthService.isHealthAuthorized() && (
          <button 
            onClick={handleConnectHealth}
            className="text-xs bg-fitGold hover:bg-fitGold/90 text-black px-3 py-1 rounded-sm font-medium transition-colors"
          >
            Connect Health
          </button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="steps" className="space-y-4">
          <TabsList>
            <TabsTrigger value="steps">Daily Steps</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
          </TabsList>
          
          {Object.entries(healthData).map(([key, data]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              {loading ? (
                <div className="h-[200px] flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Loading data...</span>
                </div>
              ) : data.length > 0 ? (
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
              ) : (
                <div className="h-[200px] flex flex-col items-center justify-center">
                  <span className="text-sm text-muted-foreground mb-2">No data available</span>
                  {!healthService.isHealthAuthorized() && (
                    <button 
                      onClick={handleConnectHealth}
                      className="text-xs bg-fitGold hover:bg-fitGold/90 text-black px-3 py-1 rounded-sm font-medium transition-colors"
                    >
                      Connect Apple Health
                    </button>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceHistory;
