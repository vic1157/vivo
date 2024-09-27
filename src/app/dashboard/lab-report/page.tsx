'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UploadIcon,
  HomeIcon,
  LabReportIcon,
  NotesIcon,
  ChatIcon,
  AccountIcon,
  SettingsIcon,
} from "@/components/icons/Icons"; // Ensure these icons are defined
import { FiGrid, FiMenu } from 'react-icons/fi'; // We'll keep using react-icons for these

interface LabReport {
  id: string;
  subject: string;
  date: string;
}

// SidebarItem Component
interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarItem = ({ href, icon, label, isActive }: SidebarItemProps) => {
  return (
    <Link href={href}>
      <div
        className={`flex flex-col items-center cursor-pointer space-y-1 ${
          isActive ? "text-blue-500" : "text-gray-400"
        }`}
      >
        <div
          className={`${
            isActive ? "bg-blue-500 p-2 rounded-lg" : "p-2"
          } transition-all`}
        >
          {icon}
        </div>
        <span className="text-xs">{label}</span>
      </div>
    </Link>
  );
};

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [labReports, setLabReports] = useState<LabReport[]>([]);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // Replace this with your actual data fetching logic
        const data = [
          { id: "1", subject: "Measles/Rubella", date: "09/24/24" },
          { id: "2", subject: "Lab Report 02", date: "" },
          { id: "3", subject: "Lab Report 03", date: "" },
          { id: "4", subject: "Lab Report 04", date: "" },
        ];
        setLabReports(data);
      } catch (err) {
        setError("Failed to fetch lab reports. Please try again later.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-20 bg-[#F1F5F9] text-black border-r-2 shadow-lg">
        <nav className="flex flex-col items-center py-4 space-y-8">
          <SidebarItem
            href="/dashboard/upload"
            icon={<UploadIcon className="w-8 h-8" />}
            label="Upload"
            isActive={pathname === "/dashboard/upload"}
          />
          <SidebarItem
            href="/dashboard"
            icon={<HomeIcon className="w-8 h-8" />}
            label="Home"
            isActive={pathname === "/dashboard"}
          />
          <SidebarItem
            href="/lab-report"
            icon={<LabReportIcon className="w-8 h-8" />}
            label="Lab Report"
            isActive={pathname === "/lab-report"}
          />
          <SidebarItem
            href="/dashboard/notes"
            icon={<NotesIcon className="w-8 h-8" />}
            label="Notes"
            isActive={pathname === "/dashboard/notes"}
          />
          <SidebarItem
            href="/chat"
            icon={<ChatIcon className="w-8 h-8" />}
            label="Chat"
            isActive={pathname === "/chat"}
          />
          <SidebarItem
            href="/account"
            icon={<AccountIcon className="w-8 h-8" />}
            label="Account"
            isActive={pathname === "/account"}
          />
          <SidebarItem
            href="/settings"
            icon={<SettingsIcon className="w-8 h-8" />}
            label="Settings"
            isActive={pathname === "/settings"}
          />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-indigo-900 mb-6">My Lab Reports</h1>
        
        {/* Filter and view options */}
        <div className="flex justify-between mb-6">
          <select className="p-2 border rounded">
            <option>Name</option>
          </select>
          <div className="flex space-x-2">
            <button className="p-2 border rounded">
              <FiMenu size={20} />
            </button>
            <button className="p-2 border rounded bg-indigo-100">
              <FiGrid size={20} />
            </button>
          </div>
        </div>

        {/* Lab reports grid */}
        <div className="grid grid-cols-2 gap-6">
          {labReports.map((report) => (
            <div key={report.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-indigo-900">{report.subject}</h2>
                <span className="text-sm text-gray-500">{report.date}</span>
              </div>
              <div className="h-32 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
