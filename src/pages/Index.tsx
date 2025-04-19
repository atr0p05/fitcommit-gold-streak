
import React, { useState } from 'react';
import OnboardingFlow from '@/components/OnboardingFlow';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';

const Index = () => {
  // In a real app, this would be stored in state management and persisted
  const [isOnboarded, setIsOnboarded] = useState(false);
  
  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
  };
  
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
