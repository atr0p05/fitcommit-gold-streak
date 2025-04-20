
import { Award, Flag, Home, Settings, Users } from 'lucide-react';

export const navigationItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/goals', label: 'Goals', icon: Flag },
  { path: '/friends', label: 'Friends', icon: Users },
  { path: '/achievements', label: 'Achievements', icon: Award },
  { path: '/settings', label: 'Settings', icon: Settings },
];
