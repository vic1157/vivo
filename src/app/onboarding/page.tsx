"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { STEPS } from '@/constants/steps'; // Import your steps from the steps.ts file

import StepOne from '@/components/onboarding/step-one'; // Basic Information
import StepTwo from '@/components/onboarding/step-two'; // Lifestyle Factors
import StepThree from '@/components/onboarding/step-three'; // Medical History
import StepFive from '@/components/onboarding/step-five'; // Health Goals
import StepEight from '@/components/onboarding/step-eight'; // Congratulations step

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
    <div className="flex flex-col items-center w-full mx-auto max-w-6xl h-full px-4 lg:px-10">
      {/* Steps indicator */}
      <div className="flex items-center mb-4 justify-between md:justify-evenly w-full md:max-w-4xl md:px-4 mx-auto gap-x-4 relative">
        {STEPS.map((step) => (
          <div
            key={step.id}
            className={cn(
              "flex flex-col items-center justify-center md:w-16 relative z-10",
              activeStep === step.id ? "text-primary" : "text-gray-400" // Non-active text color
            )}
          >
            <div
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all duration-300 ease-in-out",
                activeStep === step.id
                  ? "bg-blue-600 text-white shadow-lg" // Active step color
                  : activeStep > step.id
                  ? "bg-blue-400 text-white shadow-md" // Completed step color
                  : "bg-gray-300 text-gray-600" // Upcoming step color
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
        {/* Connector line */}
        <div className="absolute inset-x-0 w-[85%] md:w-[75%] mx-auto h-1 bg-blue-400 top-5 translate-x-1/2"></div> {/* Changed line color */}
      </div>

      {/* Content area */}
      <div className="py-8 max-w-4xl mx-auto w-full bg-background flex flex-col h-full px-1">
        <Component nextStep={nextStep} />
      </div>
    </div>
  );
};

export default OnboardingPage;
