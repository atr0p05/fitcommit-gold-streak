
import { Award, Flag, Home, Settings, Users, TrendingUp, User } from 'lucide-react';

export const navigationItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/goals', label: 'Goals', icon: Flag },
  { path: '/progress', label: 'Progress', icon: TrendingUp },
  { path: '/friends', label: 'Friends', icon: Users },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];
