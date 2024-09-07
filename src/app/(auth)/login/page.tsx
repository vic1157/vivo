'use client';

import React, { useState } from 'react';
import { useSignIn } from '@clerk/nextjs'; // Clerk's useSignIn hook for authentication
import { useRouter } from 'next/navigation'; // For navigation
import { toast } from "sonner"; // For toast notifications
import { Eye, EyeOff, LoaderIcon } from "lucide-react"; // Icons for show/hide password
import Link from "next/link"; // For navigation links
import Navbar from '../../../components/navbar'; // Correct relative path

export default function LoginPage() {
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();
  
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      return toast.warning("Please fill in all fields");
    }

    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
        redirectUrl: "/auth-callback",
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push('/auth-callback'); // Redirect after login
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        toast.error("Invalid email or password");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      switch (err.errors[0]?.code) {
        case 'form_identifier_not_found':
          toast.error("This email is not registered. Please sign up first.");
          break;
        case 'form_password_incorrect':
          toast.error("Incorrect password. Please try again.");
          break;
        case 'too_many_attempts':
          toast.error("Too many attempts. Please try again later.");
          break;
        default:
          toast.error("An error occurred. Please try again");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center relative">
      <Navbar /> {/* Navbar */}
      
      <div className="w-[480px] h-[880px] relative">
        
        {/* Background Card */}
        <div className="absolute w-full h-full bg-[#f8f4f9]/60 rounded-[20px] backdrop-blur-sm" />

        {/* Logo */}
        <div className="absolute top-[130px] left-[50%] transform -translate-x-1/2 flex justify-center items-center">
          <div className="w-[100px] h-[100px] bg-gradient-to-bl from-[#1bc0e5] to-[#2c0f7f] rounded-[14px] flex justify-center items-center">
            <div className="w-[60px] h-[60px] bg-white rounded-full"></div> {/* Replace this with your logo */}
          </div>
        </div>

        {/* Welcome Text */}
        <div className="absolute left-[50%] top-[260px] transform -translate-x-1/2 text-center">
          <h1 className="text-[32px] font-bold text-black">Welcome Back</h1>
          <p className="text-[#666666] text-lg font-semibold mt-2">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="absolute left-[50%] top-[425px] transform -translate-x-1/2 space-y-6">
          <div className="relative w-[360px] h-[50px] mb-[30px]">
            <input
              type="email"
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="absolute w-full h-full bg-[#fcfbfd]/75 rounded-lg shadow backdrop-blur-[5px] px-4 py-2 text-[#7f7f7f] text-base font-semibold outline-none"
              disabled={isLoading}
            />
          </div>

          {/* Password Field with Show/Hide Feature */}
          <div className="relative w-[360px] h-[50px] mb-[30px]">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="absolute w-full h-full bg-[#fcfbfd]/75 rounded-lg shadow backdrop-blur-[5px] px-4 py-2 text-[#7f7f7f] text-base font-semibold outline-none"
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-transparent"
              disabled={isLoading}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-center text-[#fb7194] text-base font-semibold cursor-pointer mb-[20px]">
            Forgot Password?
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-[360px] h-[50px] bg-gradient-to-r from-[#1cc1e5] to-[#6d59a5] rounded-lg text-white text-base font-bold"
          >
            {isLoading ? <LoaderIcon className="w-4 h-4 animate-spin mx-auto" /> : "Login"}
          </button>

          {/* Sign Up Link */}
          <div className="text-center text-[#666666] text-base font-semibold mt-[20px]">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-[#fb7194] cursor-pointer">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}