
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

interface NavigationItemProps {
  path: string;
  label: string;
  isActive: boolean;
  onClose: () => void;
}

const NavigationItem = ({ path, label, isActive, onClose }: NavigationItemProps) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild isActive={isActive} onClick={onClose}>
      <Link
        to={path}
        className={cn(
          "w-full text-sm font-medium",
          isActive ? "text-fitWhite" : "text-fitSilver"
        )}
      >
        {label}
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export default NavigationItem;
