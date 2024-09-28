"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { STEPS } from '@/constants/steps';

// Import your step components
import StepOne from '@/components/onboarding/step-one';
import StepTwo from '@/components/onboarding/step-two';
import StepThree from '@/components/onboarding/step-three';
import StepFive from '@/components/onboarding/step-five';
import StepEight from '@/components/onboarding/step-eight';

// Mapping step components
const stepComponents: { [key: string]: any } = {
  "step-one": StepOne,
  "step-two": StepTwo,
  "step-three": StepThree,
  "step-five": StepFive,
  "step-eight": StepEight,
};

const OnboardingPage = () => {
  const router = useRouter();
  const params = useSearchParams();

  // Get the current step from the URL, default to step 1
  const initialStep = Number(params.get("step")) || 1;
  const [activeStep, setActiveStep] = useState<number>(initialStep);

  // Sync activeStep with the URL query parameter
  useEffect(() => {
    router.push(`/onboarding?step=${activeStep}`);
  }, [activeStep, router]);

  // Determine the current component to render
  const Component = stepComponents[STEPS[activeStep - 1].name];

  const MotionCheckIcon = motion(CheckIcon);

  // Move to the next step
  const nextStep = () => {
    if (activeStep < STEPS.length) {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <div className="relative flex h-screen bg-slate-100 overflow-hidden">
      {/* Transparent Navbar */}
      <nav className="w-full h-16 flex items-center justify-end px-12 absolute top-0 left-0 right-0 bg-transparent z-10">
        {/* App Logo */}
        <img
          src="/icons/Logo.svg" 
          alt="App Logo"
          className="h-8 w-8 object-contain mr-4"
        />
      </nav>

      {/* Sidebar / Progress Bar */}
      <div className="fixed top-0 left-0 w-1/3 h-screen bg-white z-20 flex flex-col items-center justify-center p-8 shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Health Survey</h2>
        <p className="text-gray-600 text-lg mb-10">
          Our survey allows us to know you and give you better results.
        </p>
        <div className="w-40 h-40">
          <motion.div
            className="flex items-center justify-center w-40 h-40 rounded-full bg-blue-100"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
          >
            <span className="text-blue-600 font-semibold text-3xl">
              {Math.round((activeStep / STEPS.length) * 100)}%
            </span>
          </motion.div>
        </div>
      </div>

      {/* Main Onboarding Content */}
      <div className="ml-[33%] w-2/3 p-10 pt-20 overflow-y-auto">
        {/* Step Indicator */}
        <div className="flex items-center mb-8 justify-between w-full gap-x-4 relative">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center justify-center w-12 relative z-10",
                activeStep === step.id ? "text-blue-600" : "text-gray-400"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all duration-300 ease-in-out",
                  activeStep === step.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : activeStep > step.id
                    ? "bg-blue-400 text-white shadow-md"
                    : "bg-gray-300 text-gray-600"
                )}
              >
                {activeStep > step.id ? (
                  <MotionCheckIcon
                    className="w-5 h-5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.2,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  />
                ) : (
                  step.id
                )}
              </div>
            </div>
          ))}
          <div className="absolute inset-x-0 w-[85%] h-0.5 bg-blue-400 top-5"></div>
        </div>

        {/* Step Component (Dynamic) */}
        <div className="py-8 max-w-4xl mx-auto w-full bg-white shadow-md rounded-lg p-6">
          <Component nextStep={nextStep} />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;

