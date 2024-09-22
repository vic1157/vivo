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
    <div className="flex flex-col h-screen bg-[#F1F5F9] text-black border-r-2 shadow-lg">
      <div className="flex flex-col space-y-8 pt-10 items-center">
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

export default Sidebar;
