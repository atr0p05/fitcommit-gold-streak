import React, { useState } from 'react';
import { Check, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

interface OnboardingStep {
  title: string;
  description: string;
  content: React.ReactNode;
}

const OnboardingFlow: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [birthday, setBirthday] = useState('');
  
  const steps: OnboardingStep[] = [
    {
      title: "Welcome to FitCommit",
      description: "Accountability for serious fitness goals",
      content: (
        <div className="flex flex-col items-center justify-center h-64 space-y-6">
          <h1 className="hero-text">FITCOMMIT</h1>
          <p className="subtitle-text text-center max-w-md">
            Transform your goals into achievements, or pay the price
          </p>
        </div>
      )
    },
    {
      title: "Set Your Birthday",
      description: "We'll calculate your target heart rate zones",
      content: (
        <div className="flex flex-col items-center justify-center h-64 space-y-6">
          <div className="w-16 h-16 rounded-full bg-fitCharcoal border border-white/5 flex items-center justify-center mb-2">
            <Heart className="w-8 h-8 text-fitGold" />
          </div>
          <div className="text-center space-y-4">
            <p className="text-sm text-fitSilver">
              Your age helps us determine your optimal heart rate zones for effective training
            </p>
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full max-w-xs text-center"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      )
    },
    {
      title: "Set Your Goals",
      description: "Choose what metrics you'd like to track",
      content: (
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-fitCharcoal border border-white/5 rounded-sm">
            <input type="checkbox" id="heartrate" className="mr-3" defaultChecked />
            <div className="flex-1">
              <label htmlFor="heartrate" className="text-sm font-medium">Target Heart Rate</label>
              <p className="text-xs text-fitSilver">30 minutes in target zone, 5 times per week</p>
            </div>
            <span className="text-xs text-fitSilver">5 sessions</span>
          </div>
          
          <div className="flex items-center p-4 bg-fitCharcoal border border-white/5 rounded-sm">
            <input type="checkbox" id="steps" className="mr-3" defaultChecked />
            <div className="flex-1">
              <label htmlFor="steps" className="text-sm font-medium">Daily Steps</label>
              <p className="text-xs text-fitSilver">Track your steps via HealthKit integration</p>
            </div>
            <span className="text-xs text-fitSilver">10,000 steps</span>
          </div>
          
          <div className="flex items-center p-4 bg-fitCharcoal border border-white/5 rounded-sm">
            <input type="checkbox" id="gym" className="mr-3" defaultChecked />
            <div className="flex-1">
              <label htmlFor="gym" className="text-sm font-medium">Gym Check-ins</label>
              <p className="text-xs text-fitSilver">Track visits to your registered gym</p>
            </div>
            <span className="text-xs text-fitSilver">3 per week</span>
          </div>
        </div>
      )
    },
    {
      title: "Connect Apple Health",
      description: "Allow access to health metrics for tracking",
      content: (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-16 h-16 rounded-full bg-fitCharcoal border border-white/5 flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-fitGold" />
          </div>
          <p className="text-center max-w-xs mb-6">
            FitCommit needs access to your health data to track your progress and achievements
          </p>
          <button className="btn-primary mb-3 w-full">
            Connect Apple Health
          </button>
          <button className="btn-secondary w-full">
            Skip for Now
          </button>
        </div>
      )
    },
    {
      title: "Set Up Apple Pay",
      description: "Connect for automatic penalty payments",
      content: (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-16 h-16 rounded-full bg-fitCharcoal border border-white/5 flex items-center justify-center mb-6">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M6 12h12M6 8h12M6 16h8" stroke="#D9B673" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-center max-w-xs mb-6">
            Connect Apple Pay to automatically process the $0.99 penalty when you miss a goal
          </p>
          <button className="btn-primary mb-3 w-full">
            Connect Apple Pay
          </button>
          <button className="btn-secondary w-full">
            Skip for Now
          </button>
        </div>
      )
    },
    {
      title: "You're All Set!",
      description: "Start your fitness commitment journey",
      content: (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-16 h-16 rounded-full bg-fitGold flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-fitTrue" />
          </div>
          <h2 className="text-fitGold text-xl font-serif tracking-widest uppercase mb-3">READY TO COMMIT</h2>
          <p className="text-center max-w-xs mb-6">
            Your account is ready. Get moving to avoid penalties and earn achievements!
          </p>
          <button className="btn-primary w-full" onClick={onComplete}>
            Start Using FitCommit
          </button>
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const currentStepData = steps[currentStep];
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center p-premium">
        <div className="flex-1">
          {currentStep > 0 && (
            <button 
              onClick={handlePrevious}
              className="text-xs uppercase text-fitSilver tracking-widest"
            >
              Back
            </button>
          )}
        </div>
        
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div 
              key={index} 
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentStep ? "bg-fitGold" : 
                index < currentStep ? "bg-fitSilver" : "bg-white/20"
              )}
            />
          ))}
        </div>
        
        <div className="flex-1 flex justify-end">
          {currentStep < steps.length - 1 && (
            <button 
              onClick={handleNext}
              className="text-xs uppercase text-fitGold tracking-widest"
            >
              Next
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 p-premium flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-display uppercase tracking-wider mb-1">{currentStepData.title}</h2>
          <p className="text-sm text-fitSilver">{currentStepData.description}</p>
        </div>
        
        <div className="flex-1">
          {currentStepData.content}
        </div>
        
        {currentStep < steps.length - 1 && (
          <div className="mt-8">
            <button 
              onClick={handleNext} 
              className="btn-primary w-full"
              disabled={currentStep === 1 && !birthday} // Disable if on birthday step and no date selected
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Heart: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M19.5 5.25C17.5 3.25 14.5 3.5 12.5 5.5L12 6L11.5 5.5C9.5 3.5 6.5 3.25 4.5 5.25C2.5 7.25 2.5 10.5 4.5 12.5L12 20L19.5 12.5C21.5 10.5 21.5 7.25 19.5 5.25Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default OnboardingFlow;
