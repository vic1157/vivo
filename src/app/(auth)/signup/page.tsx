'use client';

import React, { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Navbar from '../../../components/navbar'; // Adjust the path to your Navbar component

export default function SignUpPage() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();
    
    const [name, setName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [code, setCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        if (!name || !emailAddress || !password) {
            return toast.warning("Please fill in all fields");
        }

        setIsLoading(true);

        try {
            // Create sign-up using Clerk
            await signUp.create({
                emailAddress,
                password,
            });

            // Send verification code via email
            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            });

            setVerified(true);

            // Update name in the Clerk profile
            await signUp.update({
                firstName: name.split(" ")[0],
                lastName: name.split(" ")[1],
            });
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));

            switch (err.errors[0]?.code) {
                case "form_identifier_exists":
                    toast.error("This email is already registered. Please sign in.");
                    break;
                case "form_password_pwned":
                    toast.error("The password is too common. Please choose a stronger password.");
                    break;
                case "form_param_format_invalid":
                    toast.error("Invalid email address. Please enter a valid email address.");
                    break;
                case "form_password_length_too_short":
                    toast.error("Password is too short. Please choose a longer password.");
                    break;
                default:
                    toast.error("An error occurred. Please try again");
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        if (!code) {
            return toast.warning("Verification code is required");
        }

        setIsVerifying(true);

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push('/auth-callback');
            } else {
                toast.error("Invalid verification code");
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            toast.error("An error occurred. Please try again");
        } finally {
            setIsVerifying(false);
        }
    };

    return verified ? (
        // Verification Code Input
        <div className="flex flex-col items-center justify-center max-w-sm mx-auto text-center hc gap-y-6">
            <div className="w-full">
                <h1 className="text-2xl font-bold">Please check your email</h1>
                <p className="text-sm text-gray-600">We&apos;ve sent a verification code to {emailAddress}</p>
            </div>
            <form onSubmit={handleVerify} className="w-full max-w-sm text-center">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">Verification Code</label>
                <input
                    type="text"
                    maxLength={6}
                    value={code}
                    disabled={isVerifying}
                    onChange={(e) => setCode(e.target.value)}
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button type="submit" disabled={isVerifying} className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg">
                    {isVerifying ? "Verifying..." : "Verify"}
                </button>
                <p className="text-sm text-gray-600 mt-4">
                    Back to <button className="text-blue-600 underline" onClick={() => setVerified(false)}>Sign up</button>
                </p>
            </form>
        </div>
    ) : (
        // Sign-up Form with your previous styling
        <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center relative">
            <Navbar />
            <div className="w-[420px] h-auto p-8 bg-[#f8f4f9]/60 rounded-[20px] backdrop-blur-sm shadow-lg">
                
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="w-[80px] h-[80px] bg-gradient-to-bl from-[#1bc0e5] to-[#2c0f7f] rounded-[14px] flex justify-center items-center">
                        <div className="w-[50px] h-[50px] bg-white rounded-full"></div> {/* Replace this with your actual logo */}
                    </div>
                </div>

                {/* Create Account Text */}
                <div className="text-center mb-6">
                    <h1 className="text-[28px] font-bold text-black">Create Account</h1>
                    <p className="text-[#666666] text-lg font-medium mt-2">Join us today</p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* First Name Field */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full h-[50px] bg-[#fcfbfd]/75 rounded-lg shadow-md backdrop-blur-sm px-4 text-[#7f7f7f] text-base font-semibold focus:outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Email Field */}
                    <div className="relative w-full">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full h-[50px] bg-[#fcfbfd]/75 rounded-lg shadow-md backdrop-blur-sm px-4 text-[#7f7f7f] text-base font-semibold focus:outline-none"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create Password"
                            className="w-full h-[50px] bg-[#fcfbfd]/75 rounded-lg shadow-md backdrop-blur-sm px-4 text-[#7f7f7f] text-base font-semibold focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            className="absolute top-[15px] right-[15px]"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Sign Up Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full h-[50px] bg-gradient-to-r from-[#1cc1e5] to-[#6d59a5] rounded-lg text-white text-base font-bold hover:bg-gradient-to-r hover:from-[#0ba9db] hover:to-[#5b45a1] transition"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Sign Up"}
                        </button>
                    </div>
                </form>

                {/* Already have an account */}
                <div className="mt-6 text-center">
                    <p className="text-[#666666] text-base font-semibold">
                        Already have an account?{' '}
                        <Link href="/login" className="text-[#fb7194] font-semibold cursor-pointer">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};