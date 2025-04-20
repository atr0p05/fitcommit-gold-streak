
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { History, CalendarCheck } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { healthService, HealthData } from "@/utils/healthService";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';

// Define CSS styles for the calendar
const calendarWorkoutDayStyle = `
  .workout-day {
    position: relative;
  }
  .workout-day button {
    color: black !important;
    font-weight: 600 !important;
    z-index: 2;
    position: relative;
  }
  .workout-day::before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`;

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

  // Convert workout data dates to Date objects
  // Make sure we're properly parsing string dates into Date objects
  const workoutDates = healthData.workouts.map(workout => {
    // Ensure we have proper Date objects
    const workoutDate = new Date(workout.date);
    console.log('Workout date:', workoutDate);
    return workoutDate;
  });

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
              <div className="flex flex-col items-center space-y-4">
                {/* Add the CSS styles in a standard style tag */}
                <style dangerouslySetInnerHTML={{ __html: calendarWorkoutDayStyle }} />
                
                <Calendar
                  mode="single"
                  className="rounded-md border pointer-events-auto"
                  modifiersClassNames={{
                    workout: "workout-day"
                  }}
                  modifiers={{
                    workout: workoutDates
                  }}
                  disabled
                  footer={
                    <div className="mt-3 flex items-center justify-center gap-2 text-sm">
                      <CalendarCheck className="h-4 w-4 text-white" />
                      <span>{healthData.workouts.length} workouts this month</span>
                    </div>
                  }
                />
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
