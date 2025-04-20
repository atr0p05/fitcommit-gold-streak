
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Trophy, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const friends = [
  { id: 1, name: 'Sarah Wilson', steps: 12453, streak: 15, achievements: 8 },
  { id: 2, name: 'Mike Johnson', steps: 9876, streak: 7, achievements: 5 },
  { id: 3, name: 'Emma Davis', steps: 15234, streak: 22, achievements: 12 },
];

const Friends = () => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 10);
  }, []);

  return (
    <div className="min-h-screen bg-fitTrue">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-24">
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 transition-all duration-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div>
            <h2 className="text-xl sm:text-2xl font-display mb-2">Connected Friends</h2>
            <p className="text-sm text-fitSilver">Stay motivated with your fitness community</p>
          </div>
          <button className="btn-secondary w-full sm:w-auto">
            <Users className="w-4 h-4 mr-2" />
            Add Friend
          </button>
        </div>

        <div className={`grid gap-6 transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <Card className="bg-fitCharcoal border-white/5 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center">
                <Trophy className="w-5 h-5 text-fitGold mr-2" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "-mx-4" : ""}>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Rank</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Steps</TableHead>
                      <TableHead className="text-right">Streak</TableHead>
                      <TableHead className="text-right">Achievements</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {friends
                      .sort((a, b) => b.steps - a.steps)
                      .map((friend, index) => (
                        <TableRow 
                          key={friend.id}
                          className={`transition-all duration-50 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                          style={{
                            transitionDelay: `${50 * (index + 1)}ms`,
                          }}
                        >
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{friend.name}</TableCell>
                          <TableCell className="text-right">{friend.steps.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{friend.streak} days</TableCell>
                          <TableCell className="text-right">{friend.achievements}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Friends;
