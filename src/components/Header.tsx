
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-fitWhite text-xl font-display tracking-widest">FITCOMMIT</h1>
        </div>
        
        <nav className="flex space-x-8">
          {[
            { path: '/', label: 'Home' },
            { path: '/goals', label: 'Goals' },
            { path: '/achievements', label: 'Achievements' },
            { path: '/settings', label: 'Settings' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-xs uppercase tracking-wider font-medium transition-colors font-display",
                isActive(item.path) ? "text-fitWhite" : "text-fitSilver hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
