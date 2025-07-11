
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarProvider } from "@/components/ui/sidebar";
import MobileNavigation from './MobileNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { navigationItems } from '@/config/navigation';

const Header: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="text-fitSilver hover:text-fitWhite p-2 flex-shrink-0">
                  <Menu size={24} />
                  <span className="sr-only">Open menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] p-0 bg-black/95 backdrop-blur-xl border-r border-white/20">
                <SidebarProvider defaultOpen={true}>
                  <MobileNavigation onClose={() => setIsOpen(false)} />
                </SidebarProvider>
              </SheetContent>
            </Sheet>
          )}
          <Link to="/" className="flex-shrink-0">
            <h1 className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent text-lg sm:text-xl font-light tracking-[0.3em] whitespace-nowrap uppercase">
              FITCOMMIT
            </h1>
          </Link>
        </div>
        
        {!isMobile && (
          <nav className="flex space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-xs uppercase tracking-wider font-medium transition-colors font-display whitespace-nowrap",
                  isActive(item.path) ? "text-fitWhite" : "text-fitSilver hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
