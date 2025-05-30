
import Header from "@/components/Header";
import { StatCard } from "@/components/ui/stat-card";
import { TrendingUp, Calendar, Award, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Progress() {
  const progressStats = [
    {
      title: "Monthly Success Rate",
      value: "89%",
      subtitle: "42 of 47 goals completed",
      icon: TrendingUp,
      trend: "up" as const,
      trendValue: "+5%",
      variant: "premium" as const,
    },
    {
      title: "Current Streak",
      value: "14",
      subtitle: "Days consecutive",
      icon: Calendar,
      trend: "up" as const,
      trendValue: "Best ever",
    },
    {
      title: "Achievements Unlocked",
      value: "12",
      subtitle: "This month",
      icon: Award,
      trend: "up" as const,
      trendValue: "+3",
    },
    {
      title: "Money Saved",
      value: "$47.93",
      subtitle: "Penalties avoided",
      icon: Target,
      trend: "up" as const,
      trendValue: "+$12",
    },
  ];

  const weeklyData = [
    { day: "Mon", completed: 3, total: 3 },
    { day: "Tue", completed: 2, total: 3 },
    { day: "Wed", completed: 3, total: 3 },
    { day: "Thu", completed: 3, total: 3 },
    { day: "Fri", completed: 2, total: 3 },
    { day: "Sat", completed: 3, total: 3 },
    { day: "Sun", completed: 3, total: 3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-luxury">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Progress Tracking</h1>
          <p className="text-white/70">Monitor your journey and celebrate your wins</p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {progressStats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Weekly Overview */}
        <Card className="luxury-card mb-12">
          <CardHeader>
            <CardTitle className="text-white">This Week's Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="text-center">
                  <div className="text-xs text-white/60 mb-2">{day.day}</div>
                  <div className="space-y-1">
                    {Array.from({ length: day.total }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-8 rounded ${
                          i < day.completed
                            ? "bg-luxury-gold"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-white/60 mt-2">
                    {day.completed}/{day.total}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="luxury-card mb-12">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="w-5 h-5 mr-2 text-luxury-gold" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Two Week Warrior", description: "14-day streak", type: "Gold" },
                { title: "Step Master", description: "100K steps this month", type: "Platinum" },
                { title: "Gym Regular", description: "12 gym visits", type: "Silver" },
                { title: "Hydration Hero", description: "Perfect water intake week", type: "Bronze" },
                { title: "Early Bird", description: "Morning workouts streak", type: "Gold" },
                { title: "Consistency King", description: "No missed goals this week", type: "Diamond" },
              ].map((achievement) => (
                <div key={achievement.title} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <Award className={`w-5 h-5 ${
                      achievement.type === "Diamond" ? "text-blue-400" :
                      achievement.type === "Platinum" ? "text-gray-300" :
                      achievement.type === "Gold" ? "text-luxury-gold" :
                      achievement.type === "Silver" ? "text-gray-400" :
                      "text-amber-600"
                    }`} />
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      achievement.type === "Diamond" ? "bg-blue-400/20 text-blue-400" :
                      achievement.type === "Platinum" ? "bg-gray-300/20 text-gray-300" :
                      achievement.type === "Gold" ? "bg-luxury-gold/20 text-luxury-gold" :
                      achievement.type === "Silver" ? "bg-gray-400/20 text-gray-400" :
                      "bg-amber-600/20 text-amber-600"
                    }`}>
                      {achievement.type}
                    </span>
                  </div>
                  <h4 className="font-semibold text-white text-sm">{achievement.title}</h4>
                  <p className="text-xs text-white/60">{achievement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goal History */}
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="text-white">Goal Completion History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "Today", goals: ["Daily Steps", "Water Intake", "Active Minutes"], completed: 2, total: 3 },
                { date: "Yesterday", goals: ["Daily Steps", "Water Intake", "Active Minutes"], completed: 3, total: 3 },
                { date: "2 days ago", goals: ["Daily Steps", "Water Intake", "Active Minutes"], completed: 3, total: 3 },
                { date: "3 days ago", goals: ["Daily Steps", "Water Intake", "Active Minutes"], completed: 2, total: 3 },
              ].map((day) => (
                <div key={day.date} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{day.date}</div>
                    <div className="text-sm text-white/60">
                      {day.goals.slice(0, 2).join(", ")}
                      {day.goals.length > 2 && ` +${day.goals.length - 2} more`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      day.completed === day.total ? "text-luxury-gold" : "text-white"
                    }`}>
                      {day.completed}/{day.total}
                    </div>
                    <div className="text-xs text-white/60">
                      {day.completed === day.total ? "Perfect" : "Partial"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
