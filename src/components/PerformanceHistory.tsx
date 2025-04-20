
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { History, Dumbbell } from "lucide-react";
import { healthService, HealthData } from "@/utils/healthService";
import { useToast } from "@/components/ui/use-toast";
import { format } from 'date-fns';

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
  const [isConnecting, setIsConnecting] = useState(false);

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

  const formatDateString = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'MMM d');
  };

  const handleConnectHealth = async () => {
    try {
      setIsConnecting(true);
      const success = await healthService.requestAuthorization();
      
      if (success) {
        toast({
          title: "Connected to Health",
          description: "Your health data will now be synchronized with FitCommit.",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Could not connect to Health. You can try again later in settings.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error connecting to Health:', error);
      toast({
        title: "Connection Error",
        description: "An error occurred while connecting to Health.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
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
            disabled={isConnecting}
          >
            {isConnecting ? 'Connecting...' : 'Connect Health'}
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
          
          <TabsContent value="steps">
            {loading ? (
              <div className="h-[200px] flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Loading data...</span>
              </div>
            ) : healthData.steps.length > 0 ? (
              <ChartContainer 
                config={{}} 
                className="h-[200px]"
              >
                <LineChart data={healthData.steps.map(data => ({
                  ...data,
                  date: formatDateString(data.date)
                }))} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
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
            ) : (
              <div className="h-[200px] flex flex-col items-center justify-center">
                <span className="text-sm text-muted-foreground">No data available</span>
              </div>
            )}
          </TabsContent>

          <TabsContent value="workouts">
            {loading ? (
              <div className="h-[200px] flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Loading data...</span>
              </div>
            ) : healthData.workouts.length > 0 ? (
              <div className="space-y-4">
                {healthData.workouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Dumbbell className="h-5 w-5 text-fitGold" />
                      <div>
                        <p className="font-medium">{formatDateString(workout.date)}</p>
                        <p className="text-sm text-muted-foreground">
                          {workout.value} {workout.value === 1 ? 'workout' : 'workouts'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[200px] flex flex-col items-center justify-center">
                <span className="text-sm text-muted-foreground">No workout data available</span>
              </div>
            )}
          </TabsContent>

          <TabsContent value="heartRate">
            {loading ? (
              <div className="h-[200px] flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Loading data...</span>
              </div>
            ) : healthData.heartRate.length > 0 ? (
              <ChartContainer 
                config={{}} 
                className="h-[200px]"
              >
                <LineChart data={healthData.heartRate.map(data => ({
                  ...data,
                  date: formatDateString(data.date)
                }))} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
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
            ) : (
              <div className="h-[200px] flex flex-col items-center justify-center">
                <span className="text-sm text-muted-foreground">No heart rate data available</span>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceHistory;
