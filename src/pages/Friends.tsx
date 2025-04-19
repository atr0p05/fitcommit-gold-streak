
import React from 'react';
import Header from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Trophy, Users } from 'lucide-react';

// Mock data for demonstration
const friends = [
  { id: 1, name: 'Sarah Wilson', steps: 12453, streak: 15, achievements: 8 },
  { id: 2, name: 'Mike Johnson', steps: 9876, streak: 7, achievements: 5 },
  { id: 3, name: 'Emma Davis', steps: 15234, streak: 22, achievements: 12 },
];

const Friends = () => {
  return (
    <div className="min-h-screen bg-fitTrue">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-display mb-2">Connected Friends</h2>
            <p className="text-sm text-fitSilver">Stay motivated with your fitness community</p>
          </div>
          <button className="btn-secondary">
            <Users className="w-4 h-4 mr-2" />
            Add Friend
          </button>
        </div>

        <div className="grid gap-6">
          <Card className="bg-fitCharcoal border-white/5">
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center">
                <Trophy className="w-5 h-5 text-fitGold mr-2" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Steps</TableHead>
                    <TableHead>Streak</TableHead>
                    <TableHead>Achievements</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {friends
                    .sort((a, b) => b.steps - a.steps)
                    .map((friend, index) => (
                      <TableRow key={friend.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{friend.name}</TableCell>
                        <TableCell>{friend.steps.toLocaleString()}</TableCell>
                        <TableCell>{friend.streak} days</TableCell>
                        <TableCell>{friend.achievements}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Friends;
