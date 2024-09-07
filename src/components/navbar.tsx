"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // Import the Link component
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a skeleton component

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { isLoaded, isSignedIn, signOut } = useAuth();

  return (
    <nav className="w-full h-[60px] flex justify-between items-center px-6 bg-transparent fixed top-4 left-0 z-10">
      
      {/* Logo - now wrapped inside a Link */}
      <Link href="/">
        <div className="w-[60px] h-[60px] rounded-full border-2 border-black flex justify-center items-center cursor-pointer">
          <img src="/icons/Logo.svg" alt="Vivo Logo" className="w-[30px] h-[30px]" />
        </div>
      </Link>

      {/* Menu Icon */}
      <div
        className="w-[60px] h-[60px] rounded-full border-2 border-black flex justify-center items-center cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="space-y-2">
          <div className="w-[30px] h-[3px] bg-blue-600"></div>
          <div className="w-[30px] h-[3px] bg-blue-600"></div>
          <div className="w-[30px] h-[3px] bg-blue-600"></div>
        </div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[70px] right-6 w-[150px] bg-white rounded-lg shadow-lg flex flex-col space-y-2 p-4 z-20"
          >
            {isLoaded ? (
              <>
                {isSignedIn ? (
                  <>
                    <button
                      className="text-black text-[16px] font-semibold hover:underline"
                      onClick={() => {
                        router.push('/dashboard');
                        setMenuOpen(false);
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      className="text-black text-[16px] font-semibold hover:underline"
                      onClick={() => {
                        signOut();
                        setMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-black text-[16px] font-semibold hover:underline"
                      onClick={() => {
                        router.push('/login');
                        setMenuOpen(false);
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="text-black text-[16px] font-semibold hover:underline"
                      onClick={() => {
                        router.push('/signup');
                        setMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center gap-x-4">
                <Skeleton className="w-20 h-8" />
                <Skeleton className="w-20 h-8" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
