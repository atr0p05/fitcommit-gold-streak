import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Trophy, Users, UserPlus, Medal, Crown, Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { friendsService, Friend, LeaderboardEntry } from '@/utils/friendsService';
import { useToast } from '@/hooks/use-toast';

const Friends = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [trainers, setTrainers] = useState<Friend[]>([]);
  const [newFriendInput, setNewFriendInput] = useState('');
  const [searchType, setSearchType] = useState<'email' | 'phone' | 'username'>('email');
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'friends' | 'trainers'>('leaderboard');
  
  useEffect(() => {
    loadData();
    setTimeout(() => {
      setIsLoaded(true);
    }, 10);
  }, []);

  const loadData = async () => {
    try {
      const [friendsData, leaderboardData, trainersData] = await Promise.all([
        friendsService.getFriends(),
        friendsService.getLeaderboard(),
        friendsService.getTrainers()
      ]);
      
      setFriends(friendsData);
      setLeaderboard(leaderboardData);
      setTrainers(trainersData);
    } catch (error) {
      console.error('Error loading friends data:', error);
    }
  };

  const handleAddFriend = async () => {
    if (!newFriendInput.trim()) return;

    setIsAddingFriend(true);
    try {
      const result = await friendsService.addFriendByContact(newFriendInput, searchType);
      
      if (result.success) {
        toast({
          title: "Friend Request Sent",
          description: result.message,
        });
        setNewFriendInput('');
      } else {
        toast({
          title: "Unable to Add Friend",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send friend request",
        variant: "destructive"
      });
    } finally {
      setIsAddingFriend(false);
    }
  };

  const handleConnectTrainer = async (trainerId: string) => {
    try {
      const result = await friendsService.connectWithTrainer(trainerId);
      
      if (result.success) {
        toast({
          title: "Connection Request Sent",
          description: result.message,
        });
      } else {
        toast({
          title: "Connection Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect with trainer",
        variant: "destructive"
      });
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>;
    }
  };

  const getPlaceholderText = () => {
    switch (searchType) {
      case 'email':
        return 'Enter friend\'s email';
      case 'phone':
        return 'Enter friend\'s phone number';
      case 'username':
        return 'Enter friend\'s username';
      default:
        return 'Enter contact information';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-luxury">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-24">
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 transition-all duration-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div>
            <h2 className="text-xl sm:text-2xl font-display mb-2 text-white">Social & Competition</h2>
            <p className="text-sm text-gray-300">Stay motivated with your fitness community</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`flex flex-wrap gap-2 mb-6 transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {[
            { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { key: 'friends', label: 'Friends', icon: Users },
            { key: 'trainers', label: 'Trainers', icon: UserPlus }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key as any)}
              variant={activeTab === key ? "default" : "outline"}
              className={`flex items-center space-x-2 ${
                activeTab === key 
                  ? "bg-white text-black" 
                  : "border-gray-600 text-gray-300 hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Button>
          ))}
        </div>

        <div className={`transition-all duration-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <Card className="luxury-card overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center text-white">
                  <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                  Weekly Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className={isMobile ? "-mx-4" : ""}>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]">Rank</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                        <TableHead className="text-right">Streak</TableHead>
                        <TableHead className="text-right">Goals</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaderboard.map((entry, index) => (
                        <TableRow 
                          key={entry.userId}
                          className={`transition-all duration-50 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${
                            entry.name === 'You' ? 'bg-white/10' : ''
                          }`}
                          style={{
                            transitionDelay: `${50 * (index + 1)}ms`,
                          }}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              {getRankIcon(entry.rank)}
                            </div>
                          </TableCell>
                          <TableCell className={entry.name === 'You' ? 'font-bold text-white' : ''}>
                            {entry.name}
                          </TableCell>
                          <TableCell className="text-right">{entry.points.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{entry.streak} days</TableCell>
                          <TableCell className="text-right">{entry.goalsCompleted}/7</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Friends Tab */}
          {activeTab === 'friends' && (
            <div className="space-y-6">
              <Card className="luxury-card">
                <CardHeader>
                  <CardTitle className="text-white">Add New Friend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Select value={searchType} onValueChange={(value: 'email' | 'phone' | 'username') => setSearchType(value)}>
                      <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                        <SelectValue placeholder="Search by..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone Number</SelectItem>
                        <SelectItem value="username">Username</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-3">
                      <Input
                        placeholder={getPlaceholderText()}
                        value={newFriendInput}
                        onChange={(e) => setNewFriendInput(e.target.value)}
                        className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Button 
                        onClick={handleAddFriend}
                        disabled={isAddingFriend || !newFriendInput.trim()}
                        className="bg-white text-black hover:bg-gray-200"
                      >
                        {isAddingFriend ? 'Sending...' : 'Add Friend'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="luxury-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Your Friends ({friends.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {friends.map((friend) => (
                      <div key={friend.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {friend.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{friend.name}</p>
                            <p className="text-sm text-gray-400">
                              {friend.currentStreak} day streak • {friend.totalPoints} points
                            </p>
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          friend.status === 'online' ? 'bg-green-500' : 
                          friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Trainers Tab */}
          {activeTab === 'trainers' && (
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Personal Trainers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainers.map((trainer) => (
                    <div key={trainer.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {trainer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{trainer.name}</p>
                          <p className="text-sm text-gray-400">
                            Professional Trainer • {trainer.currentStreak} day streak
                          </p>
                          <p className="text-xs text-green-400">
                            {trainer.status === 'online' ? 'Available now' : 'Offline'}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleConnectTrainer(trainer.id)}
                        variant="outline"
                        size="sm"
                        className="border-green-500 text-green-400 hover:bg-green-500/10"
                      >
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Friends;
