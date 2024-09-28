"use client";

import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component from your UI library
import { motion } from 'framer-motion';

const StepEight = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700">
      {/* Congratulations Message */}
      <motion.h1
        className="text-5xl font-extrabold text-white mb-6 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Congratulations! 🎉
      </motion.h1>

      <motion.p
        className="text-xl text-gray-100 mb-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      >
        You’ve successfully completed the onboarding process!
      </motion.p>

      {/* Button to Go to Dashboard */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        className="relative z-10"
      >
        <Button
          onClick={() => window.location.href = '/dashboard'}
          className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-indigo-100 hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          Go to Dashboard
        </Button>
      </motion.div>
    </div>
  );
};

export default StepEight;








