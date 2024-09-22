// components/UploadPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import { FaFileUpload } from "react-icons/fa";
import Sidebar from "@/components/dashboard/Sidebar";
import Image from "next/image";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false); // For analyzing/loading state
  const router = useRouter();

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    if (!file) return;
    
    // Set loading to true and simulate the analyzing phase
    setIsLoading(true);

    // Simulate "Analyzing..." with a timeout
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard/upload/report-results"); // Navigate to results page after analyzing
    }, 3000); // Simulating 3 seconds analyzing time
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="w-1/2 flex flex-col justify-center items-center p-10">
          {/* Upload Section */}
          <div className="bg-white shadow-md p-10 rounded-2xl w-96">
            {!file ? (
              <label className="cursor-pointer flex flex-col items-center justify-center h-64 w-full bg-blue-50 rounded-lg border-dashed border-2 border-blue-300 hover:bg-blue-100 transition">
                <FaFileUpload className="text-blue-600 text-4xl mb-4" />
                <span className="text-lg text-blue-600 font-semibold">
                  Upload pdf/docx
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="flex flex-col items-center">
                <Image
                  src="/file-icon.png"
                  width={100}
                  height={100}
                  alt="Uploaded File"
                  className="mb-4"
                />
                <p className="text-center text-blue-600 font-semibold mb-2">
                  {file.name}
                </p>
                <button
                  className="text-sm text-red-600 underline"
                  onClick={handleFileRemove}
                >
                  Remove File
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="w-1/2 flex flex-col justify-center items-center p-10">
          <div className="bg-white shadow-md p-10 rounded-2xl w-96">
            <h2 className="text-center text-2xl font-semibold text-blue-600 mb-6">
              Fill Report Details
            </h2>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter Report Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              onClick={handleSubmit}
              disabled={!file} // Disable if no file is uploaded
            >
              Submit Report
            </button>
          </div>
        </div>

        {/* Analyzing Loading */}
        {isLoading && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
              <p className="mt-4 text-white text-lg">Analyzing...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
