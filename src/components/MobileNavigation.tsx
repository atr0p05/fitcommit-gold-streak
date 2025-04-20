
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ open, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/goals', label: 'Goals' },
    { path: '/friends', label: 'Friends' },
    { path: '/achievements', label: 'Achievements' },
    { path: '/settings', label: 'Settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-display tracking-widest">FITCOMMIT</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.path)}
                onClick={onClose}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "w-full text-sm font-medium",
                    isActive(item.path) ? "text-fitWhite" : "text-fitSilver"
                  )}
                >
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default MobileNavigation;
