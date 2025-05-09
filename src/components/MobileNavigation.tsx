
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
} from '@/components/ui/sidebar';
import NavigationItem from './mobile/NavigationItem';
import { navigationItems } from '@/config/navigation';

interface MobileNavigationProps {
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ onClose }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-full h-full">
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-display tracking-widest">FITCOMMIT</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.path}
              path={item.path}
              label={item.label}
              icon={item.icon}
              isActive={isActive(item.path)}
              onClose={onClose}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
    </div>
  );
};

export default MobileNavigation;
