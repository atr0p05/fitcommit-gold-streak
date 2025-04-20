
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History } from "lucide-react";
import { healthService, HealthData } from "@/utils/healthService";
import { geofencingService } from "@/utils/geofencingService";
import { useToast } from "@/hooks/use-toast";
import PerformanceStepsChart from "./performance/PerformanceStepsChart";
import PerformanceHeartRateChart from "./performance/PerformanceHeartRateChart";
import WorkoutCalendar from "./performance/WorkoutCalendar";

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
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);

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

  const toggleLocationTracking = () => {
    if (isTrackingLocation) {
      geofencingService.stopTracking();
      setIsTrackingLocation(false);
      toast({
        title: "Location Tracking Stopped",
        description: "Gym visit tracking has been disabled.",
      });
    } else {
      const success = geofencingService.startTracking();
      if (success) {
        setIsTrackingLocation(true);
        toast({
          title: "Location Tracking Active",
          description: "FitCommit will now track your gym visits automatically.",
        });
      } else {
        toast({
          title: "Location Tracking Failed",
          description: "Could not enable gym visit tracking. This feature requires a native device.",
          variant: "destructive",
        });
      }
    }
  };

  // Convert workout data dates to Date objects
  const workoutDates = [...healthData.workouts.map(workout => new Date(workout.date)), ...geofencingService.getWorkoutDates()];

  return (
    <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">
          <div className="flex items-center space-x-2">
            <History className="h-4 w-4" />
            <span>Performance History</span>
          </div>
        </CardTitle>
        
        <div className="flex space-x-2">
          {!healthService.isHealthAuthorized() && (
            <button 
              onClick={handleConnectHealth}
              className="text-xs bg-fitGold hover:bg-fitGold/90 text-black px-3 py-1 rounded-sm font-medium transition-colors"
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Connect Health'}
            </button>
          )}
          <button
            onClick={toggleLocationTracking}
            className={`text-xs ${
              isTrackingLocation 
                ? "bg-fitError/70 hover:bg-fitError/90" 
                : "bg-fitGold hover:bg-fitGold/90"
            } text-black px-3 py-1 rounded-sm font-medium transition-colors`}
          >
            {isTrackingLocation ? 'Stop Tracking' : 'Track Gym Visits'}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="steps" className="space-y-4">
          <TabsList>
            <TabsTrigger value="steps">Daily Steps</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="steps">
            <PerformanceStepsChart 
              stepsData={healthData.steps} 
              loading={loading} 
            />
          </TabsContent>

          <TabsContent value="workouts">
            <div className="mb-3 text-sm text-center">
              {!loading && (
                <div className="flex justify-center items-center space-x-2 mb-2">
                  <div className="bg-fitGold px-2 py-1 rounded text-black font-medium">
                    {geofencingService.getWeeklyWorkoutCount()}/3 gym visits this week
                  </div>
                </div>
              )}
              <p className="text-xs text-fitSilver">
                Visit a gym for at least 30 minutes, 3 times per week to meet your goal
              </p>
            </div>
            <WorkoutCalendar 
              workoutDates={workoutDates} 
              loading={loading} 
            />
          </TabsContent>

          <TabsContent value="heartRate">
            <PerformanceHeartRateChart 
              heartRateData={healthData.heartRate} 
              loading={loading} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceHistory;
