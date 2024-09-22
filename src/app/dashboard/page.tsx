"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import Sidebar from "@/components/dashboard/Sidebar"; // Assuming you have a Sidebar component
import Image from "next/image";

const DashboardPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-white text-black overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full h-full p-6">
        {/* Dashboard Header */}
        <h1 className="text-4xl font-bold text-purple-800 mb-6 text-center">Dashboard</h1>

        {/* Top Section: Welcome & Activity Center */}
        <div className="flex justify-between mb-8 space-x-4">
          {/* Welcome Section */}
          <div className="flex-1 bg-[#E1F0FF] rounded-xl p-6 shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold text-purple-800 mb-4">Welcome Back,</h2>
            <h1 className="text-5xl font-bold text-purple-900">{user.firstName}</h1>
            <div className="mt-4">
              <Image
                src="/placeholder-image.jpg" // Replace with your image
                alt="User Welcome Image"
                width={120}
                height={120}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Activity Center */}
          <div className="flex-1 bg-[#E1F0FF] rounded-xl p-6 shadow-lg">
            <h2 className="text-3xl font-semibold text-purple-800 mb-6">Activity Center</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-4xl font-bold text-purple-900">50</p>
                <p className="text-xl text-purple-700">Uploads</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-purple-900">45</p>
                <p className="text-xl text-purple-700">Chats</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-purple-900">25</p>
                <p className="text-xl text-purple-700">Notes</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-purple-900">Peace</p>
                <p className="text-xl text-purple-700">Status</p>
              </div>
            </div>
          </div>

          {/* Upload a Report */}
          <div className="flex-1 bg-[#E1F0FF] rounded-xl p-6 shadow-lg flex flex-col items-center justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl">
              Upload a New Report
            </button>
          </div>
        </div>

        {/* Latest Lab Report Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-purple-700 mb-6">Latest Lab Report</h2>
          <div className="mb-4">
            <p className="text-xl text-purple-700">Rubella / Measles</p>
            <p className="text-md text-gray-700">
              Summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas magna id magnis...
            </p>
          </div>

          {/* Lab Report Grid */}
          <div className="grid grid-cols-4 gap-4">
            {/* Lab Report 1 */}
            <div className="bg-[#E1F0FF] rounded-xl p-4 shadow-lg text-center">
              <Image
                src="/placeholder-image.jpg" // Replace with your actual image
                alt="Lab Report"
                width={100}
                height={100}
                className="rounded-xl"
              />
              <p className="text-lg text-purple-800 mt-2">Rubella</p>
              <p className="text-sm text-gray-500">Reference Interval (RI): Immune &gt; 0.99</p>
              <p className="text-md text-purple-900 font-bold">Results Suggest: Immune</p>
            </div>

            {/* Lab Report 2 */}
            <div className="bg-[#E1F0FF] rounded-xl p-4 shadow-lg text-center">
              <Image
                src="/placeholder-image.jpg" // Replace with your actual image
                alt="Lab Report"
                width={100}
                height={100}
                className="rounded-xl"
              />
              <p className="text-lg text-purple-800 mt-2">Measles</p>
              <p className="text-sm text-gray-500">Reference Interval (RI): Immune &gt; 16.4</p>
              <p className="text-md text-purple-900 font-bold">Results Suggest: Immune</p>
            </div>

            {/* Lab Report 3 */}
            <div className="bg-[#E1F0FF] rounded-xl p-4 shadow-lg text-center">
              <Image
                src="/placeholder-image.jpg" // Replace with your actual image
                alt="Lab Report"
                width={100}
                height={100}
                className="rounded-xl"
              />
              <p className="text-lg text-purple-800 mt-2">Mumps</p>
              <p className="text-sm text-gray-500">Reference Interval (RI): Immune &gt; 12.5</p>
              <p className="text-md text-purple-900 font-bold">Results Suggest: Immune</p>
            </div>

            {/* Lab Report 4 */}
            <div className="bg-[#E1F0FF] rounded-xl p-4 shadow-lg text-center">
              <Image
                src="/placeholder-image.jpg" // Replace with your actual image
                alt="Lab Report"
                width={100}
                height={100}
                className="rounded-xl"
              />
              <p className="text-lg text-purple-800 mt-2">Rubella</p>
              <p className="text-sm text-gray-500">Reference Interval (RI): Immune &gt; 0.99</p>
              <p className="text-md text-purple-900 font-bold">Results Suggest: Immune</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
