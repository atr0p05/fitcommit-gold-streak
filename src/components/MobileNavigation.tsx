
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import NavigationItem from './mobile/NavigationItem';
import { navigationItems } from '@/config/navigation';

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ onClose }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
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
              isActive={isActive(item.path)}
              onClose={onClose}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default MobileNavigation;
