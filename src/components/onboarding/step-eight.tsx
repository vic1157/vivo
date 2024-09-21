"use client";

import React from 'react';
import Confetti from 'react-confetti'; // If you haven't installed it, run: npm install react-confetti
import { useWindowSize } from 'react-use'; // Helps to handle screen size for confetti
import { Button } from '@/components/ui/button'; // Assuming you have a Button component from your UI library

const StepEight = () => {
  const { width, height } = useWindowSize(); // Confetti adapts to the window size

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-black">
      {/* Confetti Animation */}
      <Confetti width={width} height={height} />

      {/* Congratulations Message */}
      <h1 className="text-4xl font-bold text-white mb-6">
        Congratulations! 🎉
      </h1>

      <p className="text-lg text-white mb-8">
        You have successfully completed the onboarding process!
      </p>

      {/* Button to Go to Dashboard */}
      <Button
        onClick={() => window.location.href = '/dashboard'}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-md"
      >
        Go to Dashboard
      </Button>
    </div>
  );
};

export default StepEight;

