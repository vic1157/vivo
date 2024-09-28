// "use client";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { FiSettings, FiLogOut } from "react-icons/fi"; // Importing icons from react-icons

// const Navbar = () => {
//   return (
//     <nav className="w-full h-16 flex items-center justify-between px-6 absolute top-0 left-0 right-0 bg-transparent z-10">
//       {/* Left section with menu button */}
//       <div className="flex items-center">
//       </div>

//       {/* Right section with logo and options */}
//       <div className="flex items-center space-x-6">
//         {/* Settings Icon */}
//         <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
//           <FiSettings className="w-5 h-5" />
//           <span>Settings</span>
//         </button>

//         {/* Logout Icon */}
//         <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
//           <FiLogOut className="w-5 h-5" />
//           <span>Logout</span>
//         </button>

//         {/* Logo */}
//         <Link href="/">
//           <Image
//             src="/icons/Logo.svg" // Replace with your logo path
//             alt="Logo"
//             width={50}
//             height={50}
//             className="object-contain"
//           />
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // Import the Link component
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "@clerk/nextjs"; // Using Clerk for authentication
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a skeleton component
import { FiSettings, FiLogOut } from 'react-icons/fi'; // Icons for settings and logout

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { isLoaded, isSignedIn, signOut } = useAuth(); // Clerk auth functions

  return (
    <nav className="w-full h-[60px] flex justify-between items-center px-6 bg-transparent fixed top-4 left-0 z-10">
      {/* Logo - now wrapped inside a Link */}
      <Link href="/dashboard">
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
                      className="text-black text-[16px] font-semibold flex items-center gap-2 hover:underline"
                      onClick={() => {
                        router.push('/dashboard');
                        setMenuOpen(false);
                      }}
                    >
                      <FiSettings className="w-5 h-5" /> Dashboard
                    </button>
                    <button
                      className="text-black text-[16px] font-semibold flex items-center gap-2 hover:underline"
                      onClick={() => {
                        router.push('/dashboard/settings'); // Link to settings page
                        setMenuOpen(false);
                      }}
                    >
                      <FiSettings className="w-5 h-5" /> Settings
                    </button>
                    <button
                      className="text-black text-[16px] font-semibold flex items-center gap-2 hover:underline"
                      onClick={() => {
                        signOut();
                        router.push('/'); // Redirect to home after logout
                        setMenuOpen(false);
                      }}
                    >
                      <FiLogOut className="w-5 h-5" /> Logout
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


