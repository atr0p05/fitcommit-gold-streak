
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { CalendarCheck } from "lucide-react";

interface WorkoutCalendarProps {
  workoutDates: Date[];
  loading: boolean;
}

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

const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({ workoutDates, loading }) => {
  if (loading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading data...</span>
      </div>
    );
  }

  if (workoutDates.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center">
        <span className="text-sm text-muted-foreground">No workout data available</span>
      </div>
    );
  }

  return (
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
            <span>{workoutDates.length} workouts this month</span>
          </div>
        }
      />
    </div>
  );
};

export default WorkoutCalendar;
