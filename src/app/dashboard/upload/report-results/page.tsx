// components/ResultPage.tsx
"use client";

import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";

const ResultPage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-10">
        <div className="bg-white shadow-md p-10 rounded-2xl w-full max-w-3xl mx-auto">
          <h2 className="text-center text-3xl font-semibold text-blue-600 mb-6">
            Measles / Rubella Report
          </h2>

          <p className="text-lg text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas magna id magnis habitasse justo.
          </p>

          {/* Lab Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <LabReportItem
              title="Rubella"
              result="10.70 Units"
              interval="Immune >0.99"
              suggestion="Results Suggest: Immune"
            />
            <LabReportItem
              title="Measles"
              result=">300 Au/ML"
              interval="Immune >16.4"
              suggestion="Results Suggest: Immune"
            />
            <LabReportItem
              title="Mumps"
              result=">300 Au/ML"
              interval="Immune >10.9"
              suggestion="Results Suggest: Immune"
            />
            <LabReportItem
              title="Cholesterol"
              result="200 mg/dL"
              interval="Normal"
              suggestion="Results Suggest: Normal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for each lab report item
const LabReportItem = ({ title, result, interval, suggestion }: { title: string, result: string, interval: string, suggestion: string }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-lg text-gray-600">{result}</p>
      <p className="text-sm text-gray-500">{interval}</p>
      <p className="text-sm text-blue-600 font-semibold">{suggestion}</p>
    </div>
  );
};

export default ResultPage;
