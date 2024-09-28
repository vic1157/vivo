"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import Sidebar from "@/components/dashboard/Sidebar"; // Assuming you have a Sidebar component
import Navbar from "@/components/dashboard/DashboardNavbar";
import { UploadIcon } from "@/components/icons/Icons";
import Link from "next/link";
import Image from "next/image";

const DashboardPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 text-black overflow-hidden">
      {/* Sidebar Component */}
      <Navbar /> {/* Navbar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full h-full p-6 space-y-6">
        {/* Dashboard Header */}
        <h1 className="text-3xl font-extrabold text-purple-800 text-center mb-4">Dashboard</h1>

        {/* Top Section: Welcome, Activity Center, and Upload */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
          {/* Welcome Section */}
          <div className="flex-1 bg-white rounded-xl p-4 shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold text-purple-800 mb-1">Welcome Back,</h2>
            <h1 className="text-4xl font-bold text-purple-900">{user.firstName}</h1>
            <div className="mt-4">
              <Image
                src="/icons/userimage.svg" // Replace with your image
                alt="User Welcome Image"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Activity Center */}
          <div className="flex-1 bg-white rounded-xl p-4 shadow-lg">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">Activity Center</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-4xl font-bold text-purple-900">50</p>
                <p className="text-md text-purple-700">Uploads</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-900">45</p>
                <p className="text-md text-purple-700">Chats</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-900">25</p>
                <p className="text-md text-purple-700">Notes</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-900">50</p>
                <p className="text-md text-purple-700">Results</p>
              </div>
            </div>
          </div>

          {/* Upload a New Report - Icon Button */}
          <div className="flex-1 bg-white rounded-xl p-4 shadow-lg flex flex-col items-center justify-center">
            <Link href="/dashboard/upload">
              <div className="flex flex-col items-center cursor-pointer">
                <UploadIcon className="w-12 h-12 text-blue-600 hover:scale-110 transition-transform" />
                <span className="text-blue-600 text-md mt-1">Upload Report</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Latest Lab Report Section */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Latest Lab Report</h2>
          <div className="mb-4">
            <p className="text-xl font-bold text-purple-700">Rubella / Measles</p>
            <p className="text-sm text-gray-600">
              Summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas magna id magnis...
            </p>
          </div>

          {/* Lab Report Grid - Fixing Cut-off Issue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
            {/* Lab Report 1 */}
            <div className="bg-blue-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
              <Image
                src="/placeholder-image.jpg" // Replace with your actual image
                alt="Lab Report"
                width={100}
                height={100}
                className="rounded-lg"
              />
              <p className="text-lg text-purple-800 mt-2">Rubella</p>
              <p className="text-sm text-gray-500">Reference Interval: Immune &gt; 0.99</p>
              <p className="text-md text-purple-900 font-bold">Results: Immune</p>
            </div>

            {/* Lab Report 2 */}
            <div className="bg-blue-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
              <Image
                src="/placeholder-image.jpg" // Replace with your actual image
                alt="Lab Report"
                width={100}
                height={100}
                className="rounded-lg"
              />
              <p className="text-lg text-purple-800 mt-2">Measles</p>
              <p className="text-sm text-gray-500">Reference Interval: Immune &gt; 16.4</p>
              <p className="text-md text-purple-900 font-bold">Results: Immune</p>
            </div>

            {/* Lab Report 3 */}
            <div className="bg-blue-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
              <Image
                src="/placeholder-image.jpg" // Replace with your actual image
                alt="Lab Report"
                width={100}
                height={100}
                className="rounded-lg"
              />
              <p className="text-lg text-purple-800 mt-2">Mumps</p>
              <p className="text-sm text-gray-500">Reference Interval: Immune &gt; 12.5</p>
              <p className="text-md text-purple-900 font-bold">Results: Immune</p>
            </div>

            {/* Lab Report 4 */}
            <div className="bg-blue-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
              <Image
                src="/placeholder-image.jpg" // Replace with your actual image
                alt="Lab Report"
                width={100}
                height={100}
                className="rounded-lg"
              />
              <p className="text-lg text-purple-800 mt-2">Rubella</p>
              <p className="text-sm text-gray-500">Reference Interval: Immune &gt; 0.99</p>
              <p className="text-md text-purple-900 font-bold">Results: Immune</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
