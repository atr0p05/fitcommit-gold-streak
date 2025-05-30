export interface Friend {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  currentStreak: number;
  totalPoints: number;
  weeklyGoalsCompleted: number;
  isTrainer: boolean;
  status: 'online' | 'offline' | 'away';
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  points: number;
  streak: number;
  goalsCompleted: number;
  rank: number;
}

export interface TrainerConnection {
  trainerId: string;
  trainerName: string;
  connectionStatus: 'pending' | 'connected' | 'requested';
  permissions: {
    viewGoals: boolean;
    receiveUpdates: boolean;
    sendReminders: boolean;
  };
}

class FriendsService {
  private friends: Friend[] = [];
  private trainerConnections: TrainerConnection[] = [];

  // Mock data for demo purposes
  private mockFriends: Friend[] = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      currentStreak: 15,
      totalPoints: 2450,
      weeklyGoalsCompleted: 6,
      isTrainer: false,
      status: 'online'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike.j@email.com',
      currentStreak: 7,
      totalPoints: 1890,
      weeklyGoalsCompleted: 4,
      isTrainer: false,
      status: 'offline'
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma.d@email.com',
      currentStreak: 22,
      totalPoints: 3120,
      weeklyGoalsCompleted: 7,
      isTrainer: false,
      status: 'online'
    },
    {
      id: '4',
      name: 'Coach Alex',
      email: 'alex.trainer@gym.com',
      currentStreak: 45,
      totalPoints: 5680,
      weeklyGoalsCompleted: 7,
      isTrainer: true,
      status: 'online'
    }
  ];

  async getFriends(): Promise<Friend[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockFriends.filter(f => !f.isTrainer));
      }, 500);
    });
  }

  async addFriend(email: string): Promise<{ success: boolean; message: string }> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingFriend = this.mockFriends.find(f => f.email === email);
        if (existingFriend) {
          resolve({ success: false, message: "User is already in your friends list" });
        } else {
          resolve({ success: true, message: "Friend request sent successfully" });
        }
      }, 1000);
    });
  }

  async addFriendByContact(contact: string, type: 'email' | 'phone' | 'username'): Promise<{ success: boolean; message: string }> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation based on contact type
        let isValid = false;
        let searchField = '';
        
        switch (type) {
          case 'email':
            isValid = contact.includes('@') && contact.includes('.');
            searchField = 'email';
            break;
          case 'phone':
            isValid = /^\+?[\d\s\-\(\)]+$/.test(contact) && contact.replace(/\D/g, '').length >= 10;
            searchField = 'phone number';
            break;
          case 'username':
            isValid = contact.length >= 3 && /^[a-zA-Z0-9_]+$/.test(contact);
            searchField = 'username';
            break;
        }

        if (!isValid) {
          resolve({ success: false, message: `Please enter a valid ${searchField}` });
          return;
        }

        // Check if already friends (simplified check for demo)
        const existingFriend = this.mockFriends.find(f => 
          f.email.toLowerCase().includes(contact.toLowerCase()) || 
          f.name.toLowerCase().replace(/\s+/g, '').includes(contact.toLowerCase())
        );
        
        if (existingFriend) {
          resolve({ success: false, message: "User is already in your friends list" });
        } else {
          resolve({ success: true, message: `Friend request sent to ${contact}` });
        }
      }, 1000);
    });
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const friends = await this.getFriends();
    const currentUser = {
      userId: 'current-user',
      name: 'You',
      points: 2180,
      streak: 14,
      goalsCompleted: 5
    };

    const allUsers = [
      currentUser,
      ...friends.map(f => ({
        userId: f.id,
        name: f.name,
        points: f.totalPoints,
        streak: f.currentStreak,
        goalsCompleted: f.weeklyGoalsCompleted
      }))
    ];

    // Sort by points and add rank
    const sorted = allUsers
      .sort((a, b) => b.points - a.points)
      .map((user, index) => ({
        ...user,
        rank: index + 1
      }));

    return sorted;
  }

  async getTrainers(): Promise<Friend[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockFriends.filter(f => f.isTrainer));
      }, 500);
    });
  }

  async connectWithTrainer(trainerId: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const trainer = this.mockFriends.find(f => f.id === trainerId && f.isTrainer);
        if (trainer) {
          this.trainerConnections.push({
            trainerId,
            trainerName: trainer.name,
            connectionStatus: 'pending',
            permissions: {
              viewGoals: true,
              receiveUpdates: true,
              sendReminders: false
            }
          });
          resolve({ success: true, message: `Connection request sent to ${trainer.name}` });
        } else {
          resolve({ success: false, message: "Trainer not found" });
        }
      }, 1000);
    });
  }

  getTrainerConnections(): TrainerConnection[] {
    return this.trainerConnections;
  }

  async shareGoalProgress(goalId: string, progress: number, target: number): Promise<void> {
    // This would normally send progress to connected trainers
    console.log(`Sharing goal progress: ${progress}/${target} for goal ${goalId}`);
  }
}

export const friendsService = new FriendsService();
