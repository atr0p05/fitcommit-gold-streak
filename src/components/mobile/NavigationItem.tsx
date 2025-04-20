
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LucideIcon } from 'lucide-react';

interface NavigationItemProps {
  path: string;
  label: string;
  isActive: boolean;
  onClose: () => void;
  icon?: LucideIcon;
}

const NavigationItem = ({ path, label, isActive, onClose, icon: Icon }: NavigationItemProps) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild isActive={isActive} onClick={onClose}>
      <Link
        to={path}
        className={cn(
          "w-full text-sm font-medium flex items-center gap-3",
          isActive ? "text-fitWhite" : "text-fitSilver"
        )}
      >
        {Icon && <Icon className="w-5 h-5" />}
        <span>{label}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export default NavigationItem;
