"use client";

import React from "react";
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
} from "@/components/icons/Icons"; // Assuming icons are defined here

// Main Sidebar Component
const Sidebar = () => {
  const pathname = usePathname(); // Get the current route

  return (
    <div className="flex flex-col h-screen w-[115px] bg-white text-black border-r-2 shadow-lg">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="mb-14">
        </div>
      </div>

      {/* Sidebar Items */}
      <div className="flex flex-col space-y-10 items-center mt-8">
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
          href="/dashboard/lab-report"
          icon={<LabReportIcon className="w-8 h-8" />}
          label="Lab Report"
          isActive={pathname === "/dashboard/lab-report"}
        />
        <SidebarItem
          href="/dashboard/notes"
          icon={<NotesIcon className="w-8 h-8" />}
          label="Notes"
          isActive={pathname === "/dashboard/notes"}
        />
        <SidebarItem
          href="/dashboard/chat"
          icon={<ChatIcon className="w-8 h-8" />}
          label="Chat"
          isActive={pathname === "/dashboard/chat"}
        />
        <SidebarItem
          href="/dashboard/account"
          icon={<AccountIcon className="w-8 h-8" />}
          label="Account"
          isActive={pathname === "/dashboard/account"}
        />
      </div>

      {/* Settings icon at the bottom */}
      <div className="mt-auto mb-4">
        <SidebarItem
          href="/dashboard/settings"
          icon={<SettingsIcon className="w-8 h-8" />}
          label="Settings"
          isActive={pathname === "/dashboard/settings"}
        />
      </div>
    </div>
  );
};

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
        <div className={`transition-all ${isActive ? "animate-glow" : ""}`}>
          {icon}
        </div>
        <span className="text-xs">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
