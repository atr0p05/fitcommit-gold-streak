
import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { StatCard } from "@/components/ui/stat-card";
import { GoalCard } from "@/components/ui/goal-card";
import { Activity, Target, TrendingUp, Zap, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      title: "Steps Today",
      value: "8,742",
      subtitle: "Goal: 10,000",
      icon: Activity,
      trend: "up" as const,
      trendValue: "+12%",
    },
    {
      title: "Active Streak",
      value: "14",
      subtitle: "Days consecutive",
      icon: Zap,
      variant: "premium" as const,
    },
    {
      title: "Weekly Progress",
      value: "86%",
      subtitle: "4/5 goals met",
      icon: TrendingUp,
      trend: "up" as const,
      trendValue: "+5%",
    },
  ];

  const goals = [
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
      title: "Heart Rate Zone",
      description: "30 minutes in target zone daily",
      progress: 100,
      current: 35,
      target: 30,
      unit: "minutes",
      isCompleted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-luxury">
      <Navigation />
      
      <main className="pt-16">
        {/* Welcome Section */}
        <section className="container mx-auto px-4 py-8">
          <div className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="luxury-card rounded-2xl p-8 mb-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back!</h2>
              <p className="text-gray-300">Ready to crush your fitness goals today?</p>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent font-display tracking-[0.15em] text-shadow-lg drop-shadow-2xl">
                ELITE FITNESS
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent font-display tracking-[0.25em] font-light text-shadow-md">
                ACCOUNTABILITY
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your commitment into results. Every goal matters, every day counts, 
              every achievement is earned through dedication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-luxury">
                <Target className="w-5 h-5 mr-2" />
                View Goals
              </Button>
              <Button variant="outline" className="btn-ghost-luxury">
                <TrendingUp className="w-5 h-5 mr-2" />
                Track Progress
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Today's Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.title}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </section>

        {/* Active Goals Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Active Goals</h2>
            <Button variant="outline" className="btn-ghost-luxury">
              <Calendar className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {goals.map((goal, index) => (
              <div
                key={goal.title}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${(index + 3) * 200}ms` }}
              >
                <GoalCard {...goal} />
              </div>
            ))}
          </div>
        </section>

        {/* Commitment Summary */}
        <section className="container mx-auto px-4 py-12">
          <div className="luxury-card rounded-2xl p-8 max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-full bg-white/20">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Your Commitment</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              You've saved <span className="text-white font-semibold">$47.93</span> this month 
              by staying committed to your goals. Your dedication is paying off.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">14</div>
                <div className="text-sm text-gray-400">Day Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">$47.93</div>
                <div className="text-sm text-gray-400">Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">89%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">42</div>
                <div className="text-sm text-gray-400">Goals Met</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
