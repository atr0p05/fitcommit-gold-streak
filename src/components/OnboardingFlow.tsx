
import React, { useState } from 'react';
import { Heart as HeartIcon, Check, DollarSign, Target, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OnboardingStep {
  title: string;
  description: string;
  content: React.ReactNode;
}

const OnboardingFlow: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [birthday, setBirthday] = useState('');
  const [isConnectingHealth, setIsConnectingHealth] = useState(false);
  const [isConnectingPayment, setIsConnectingPayment] = useState(false);
  
  const calculateMaxHeartRate = (birthDate: string) => {
    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    return 220 - age;
  };

  const handleConnectHealth = async () => {
    setIsConnectingHealth(true);
    // Simulate connecting to HealthKit
    setTimeout(() => {
      setIsConnectingHealth(false);
      setCurrentStep(currentStep + 1);
    }, 2000);
  };

  const handleConnectApplePay = async () => {
    setIsConnectingPayment(true);
    // Simulate connecting to Apple Pay
    setTimeout(() => {
      setIsConnectingPayment(false);
      setCurrentStep(currentStep + 1);
    }, 2000);
  };

  const steps: OnboardingStep[] = [
    {
      title: "Welcome to FitCommit",
      description: "Your Path to Fitness Accountability",
      content: (
        <div className="flex flex-col items-center justify-center h-80 space-y-8">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <Target className="w-10 h-10 text-black" />
          </div>
          <div className="text-center space-y-4">
            <h1 className="font-display text-5xl font-bold text-white">
              FITCOMMIT
            </h1>
            <p className="text-xl text-gray-300 max-w-md">
              Transform your goals into achievements, or pay the price
            </p>
          </div>
        </div>
      )
    },
    {
      title: "The Commitment Concept",
      description: "How accountability drives results",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <DollarSign className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Put Your Money Where Your Goals Are</h2>
          </div>
          
          <div className="space-y-4">
            <div className="luxury-card p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Daily Goals</h3>
              <p className="text-gray-300 text-sm mb-2">Set achievable daily targets</p>
              <p className="text-red-400 text-sm">Miss a goal? Pay $0.99</p>
            </div>
            
            <div className="luxury-card p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Weekly Challenges</h3>
              <p className="text-gray-300 text-sm mb-2">Push yourself with bigger commitments</p>
              <p className="text-red-400 text-sm">Miss a challenge? Pay $4.99</p>
            </div>
            
            <div className="luxury-card p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Monthly Milestones</h3>
              <p className="text-gray-300 text-sm mb-2">Transform your lifestyle</p>
              <p className="text-red-400 text-sm">Miss a milestone? Pay $19.99</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Set Your Birthday",
      description: "We'll calculate your target heart rate zones",
      content: (
        <div className="flex flex-col items-center justify-center h-80 space-y-6">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
            <HeartIcon className="w-8 h-8 text-black" />
          </div>
          <div className="text-center space-y-4">
            <p className="text-gray-300">
              Your age helps us determine your optimal heart rate zones for effective training
            </p>
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-48 mx-auto text-center text-white bg-gray-800 border-gray-600"
              max={new Date().toISOString().split('T')[0]}
            />
            {birthday && (
              <div className="space-y-2">
                <p className="text-white font-medium">
                  Maximum Heart Rate: {calculateMaxHeartRate(birthday)} BPM
                </p>
                <p className="text-gray-400 text-sm">
                  Target Zone: {Math.round(calculateMaxHeartRate(birthday) * 0.64)} - {Math.round(calculateMaxHeartRate(birthday) * 0.76)} BPM
                </p>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      title: "Connect Apple Health",
      description: "Allow access to health metrics for tracking",
      content: (
        <div className="flex flex-col items-center justify-center h-80">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6">
            <Activity className="w-8 h-8 text-black" />
          </div>
          <p className="text-center max-w-xs mb-6 text-gray-300">
            FitCommit needs access to your health data to track your progress and achievements
          </p>
          <Button 
            className="bg-white text-black hover:bg-gray-200 mb-3 w-full max-w-xs"
            onClick={handleConnectHealth}
            disabled={isConnectingHealth}
          >
            {isConnectingHealth ? 'Connecting...' : 'Connect Apple Health'}
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-800 w-full max-w-xs"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Skip for Now
          </Button>
        </div>
      )
    },
    {
      title: "Set Up Apple Pay",
      description: "Connect for automatic penalty payments",
      content: (
        <div className="flex flex-col items-center justify-center h-80">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6">
            <DollarSign className="w-8 h-8 text-black" />
          </div>
          <p className="text-center max-w-xs mb-6 text-gray-300">
            Connect Apple Pay to automatically process penalties when you miss goals
          </p>
          <Button 
            className="bg-white text-black hover:bg-gray-200 mb-3 w-full max-w-xs"
            onClick={handleConnectApplePay}
            disabled={isConnectingPayment}
          >
            {isConnectingPayment ? 'Connecting...' : 'Connect Apple Pay'}
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-800 w-full max-w-xs"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Skip for Now
          </Button>
        </div>
      )
    },
    {
      title: "You're All Set!",
      description: "Start your fitness commitment journey",
      content: (
        <div className="flex flex-col items-center justify-center h-80">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-white text-xl font-bold mb-3">READY TO COMMIT</h2>
          <p className="text-center max-w-xs mb-6 text-gray-300">
            Your account is ready. Get moving to avoid penalties and earn achievements!
          </p>
          <Button 
            className="bg-white text-black hover:bg-gray-200 w-full max-w-xs" 
            onClick={onComplete}
          >
            Start Using FitCommit
          </Button>
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="flex justify-between items-center p-6">
        <div className="flex-1">
          {currentStep > 0 && (
            <button 
              onClick={handlePrevious}
              className="text-xs uppercase text-gray-400 tracking-widest hover:text-white transition-colors"
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
                index === currentStep ? "bg-white" : 
                index < currentStep ? "bg-gray-400" : "bg-gray-700"
              )}
            />
          ))}
        </div>
        
        <div className="flex-1 flex justify-end">
          {currentStep < steps.length - 1 && currentStep !== 3 && currentStep !== 4 && (
            <button 
              onClick={handleNext}
              className="text-xs uppercase text-white tracking-widest hover:text-gray-300 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-1 text-white">{currentStepData.title}</h2>
          <p className="text-sm text-gray-400">{currentStepData.description}</p>
        </div>
        
        <div className="flex-1">
          {currentStepData.content}
        </div>
        
        {currentStep < steps.length - 1 && currentStep !== 3 && currentStep !== 4 && (
          <div className="mt-8">
            <Button 
              onClick={handleNext} 
              className="bg-white text-black hover:bg-gray-200 w-full"
              disabled={currentStep === 2 && !birthday}
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
