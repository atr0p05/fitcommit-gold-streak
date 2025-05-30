import Header from '@/components/Header';
import { GoalCard } from "@/components/ui/goal-card";
import { Plus, Calendar, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Goals() {
  const { toast } = useToast();

  const handleNewGoal = () => {
    toast({
      title: "New Goal",
      description: "Goal creation feature coming soon!",
    });
  };

  const dailyGoals = [
    {
      title: "Daily Steps",
      description: "Walk 10,000 steps every day",
      progress: 87,
      current: 8742,
      target: 10000,
      unit: "steps",
      penalty: 0.99,
    },
    {
      title: "Water Intake",
      description: "Drink 8 glasses of water daily",
      progress: 75,
      current: 6,
      target: 8,
      unit: "glasses",
      penalty: 0.99,
    },
    {
      title: "Active Minutes",
      description: "30 minutes of activity daily",
      progress: 100,
      current: 45,
      target: 30,
      unit: "minutes",
      isCompleted: true,
    },
  ];

  const weeklyGoals = [
    {
      title: "Gym Sessions",
      description: "Complete 3 gym workouts this week",
      progress: 67,
      current: 2,
      target: 3,
      unit: "sessions",
      deadline: "2 days left",
      penalty: 4.99,
    },
    {
      title: "Strength Training",
      description: "2 strength training sessions per week",
      progress: 50,
      current: 1,
      target: 2,
      unit: "sessions",
      deadline: "3 days left",
      penalty: 2.99,
    },
    {
      title: "Cardio Hours",
      description: "Complete 3 hours of cardio this week",
      progress: 83,
      current: 2.5,
      target: 3,
      unit: "hours",
      deadline: "4 days left",
      penalty: 3.99,
    },
  ];

  const monthlyGoals = [
    {
      title: "Weight Goal",
      description: "Lose 2 pounds this month",
      progress: 75,
      current: 1.5,
      target: 2,
      unit: "lbs",
      deadline: "8 days left",
      penalty: 9.99,
    },
    {
      title: "Perfect Weeks",
      description: "Complete 3 perfect weeks",
      progress: 67,
      current: 2,
      target: 3,
      unit: "weeks",
      deadline: "12 days left",
      penalty: 14.99,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-luxury">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Your Goals</h1>
            <p className="text-white/70">Track your progress and stay accountable</p>
          </div>
          <Button className="btn-luxury" onClick={handleNewGoal}>
            <Plus className="w-5 h-5 mr-2" />
            New Goal
          </Button>
        </div>

        <Tabs defaultValue="daily" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-luxury-charcoal">
            <TabsTrigger value="daily" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-obsidian">
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-obsidian">
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-obsidian">
              Monthly
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="w-5 h-5 text-luxury-gold" />
              <h2 className="text-2xl font-bold text-white">Daily Goals</h2>
              <span className="text-sm text-white/60">Reset every day at midnight</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {dailyGoals.map((goal) => (
                <GoalCard key={goal.title} {...goal} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Target className="w-5 h-5 text-luxury-gold" />
              <h2 className="text-2xl font-bold text-white">Weekly Goals</h2>
              <span className="text-sm text-white/60">Reset every Monday</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {weeklyGoals.map((goal) => (
                <GoalCard key={goal.title} {...goal} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="w-5 h-5 text-luxury-gold" />
              <h2 className="text-2xl font-bold text-white">Monthly Goals</h2>
              <span className="text-sm text-white/60">Reset on the 1st of each month</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {monthlyGoals.map((goal) => (
                <GoalCard key={goal.title} {...goal} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Summary Section */}
        <div className="luxury-card rounded-2xl p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Goal Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-gold mb-2">8</div>
              <div className="text-sm text-white/60">Active Goals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-gold mb-2">6</div>
              <div className="text-sm text-white/60">On Track</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">$23.93</div>
              <div className="text-sm text-white/60">At Risk</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">$47.93</div>
              <div className="text-sm text-white/60">Saved This Month</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
