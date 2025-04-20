
import React, { useEffect, useState } from 'react';
import OnboardingFlow from '@/components/OnboardingFlow';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem('isOnboarded') === 'true';
  });
  
  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
    localStorage.setItem('isOnboarded', 'true');
  };
  
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
  
  if (!isOnboarded) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }
  
  return (
    <div className="min-h-screen bg-fitTrue">
      <Header />
      <Dashboard />
    </div>
  );
};

export default Index;
