
import Header from "@/components/Header";
import { StatCard } from "@/components/ui/stat-card";
import { User, Settings, CreditCard, Bell, Shield, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const profileStats = [
    {
      title: "Member Since",
      value: "Jan 2024",
      subtitle: "3 months active",
      icon: User,
    },
    {
      title: "Total Saved",
      value: "$127.84",
      subtitle: "Penalties avoided",
      icon: CreditCard,
      variant: "premium" as const,
    },
    {
      title: "Success Rate",
      value: "89%",
      subtitle: "All-time average",
      icon: Shield,
      trend: "up" as const,
      trendValue: "+2%",
    },
  ];

  const settingsItems = [
    { icon: User, title: "Personal Information", description: "Update your profile details" },
    { icon: Bell, title: "Notifications", description: "Manage your alert preferences" },
    { icon: CreditCard, title: "Payment Methods", description: "Manage billing and payments" },
    { icon: Shield, title: "Privacy & Security", description: "Control your data and security" },
    { icon: Settings, title: "App Preferences", description: "Customize your experience" },
  ];

  return (
    <div className="min-h-screen bg-gradient-luxury">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-24">
        {/* Profile Header */}
        <div className="luxury-card rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <Avatar className="w-24 h-24 border-4 border-luxury-gold/20">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
              <AvatarFallback className="bg-luxury-gold/20 text-luxury-gold text-2xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">John Doe</h1>
              <p className="text-white/70 mb-4">john.doe@example.com</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-luxury-gold/20 text-luxury-gold px-3 py-1 rounded-full text-sm font-medium">
                  Premium Member
                </span>
                <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  14-Day Streak
                </span>
                <span className="bg-blue-400/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                  Goal Crusher
                </span>
              </div>
            </div>
            
            <Button variant="outline" className="btn-ghost-luxury">
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {profileStats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Settings */}
        <Card className="luxury-card mb-12">
          <CardHeader>
            <CardTitle className="text-white">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settingsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-luxury-gold/20">
                        <Icon className="w-5 h-5 text-luxury-gold" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <p className="text-sm text-white/60">{item.description}</p>
                      </div>
                    </div>
                    <div className="text-white/40">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Subscription Info */}
        <Card className="luxury-card luxury-glow mb-12">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-luxury-gold" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
              <div>
                <h3 className="text-lg font-semibold text-luxury-gold mb-2">Premium Plan</h3>
                <p className="text-white/70 mb-1">$9.99/month • Renews March 15, 2024</p>
                <p className="text-sm text-white/60">Unlimited goals, advanced analytics, priority support</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="btn-ghost-luxury">
                  Manage Plan
                </Button>
                <Button className="btn-luxury">
                  Upgrade
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="luxury-card border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-400">Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start border-red-500/50 text-red-400 hover:bg-red-500/10">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
              <Button variant="outline" className="w-full justify-start border-red-500/50 text-red-400 hover:bg-red-500/10">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
