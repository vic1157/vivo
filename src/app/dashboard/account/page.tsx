"use client";

import React, { useState } from 'react';
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
} from "@/components/icons/Icons";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, label, isActive }) => {
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

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen bg-[#F1F5F9] text-black border-r-2 shadow-lg w-20">
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

interface UserInfo {
  name: string;
  email: string;
}

const UserSettings: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'Anais Lemon',
    email: 'anaislemon@gmail.com'
  });
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangeEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement email change logic here
    console.log('Changing email to:', newEmail);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here
    console.log('Changing password');
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    console.log('Deleting account');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-indigo-900 mb-6">User Settings</h1>
        
        <div className="bg-white rounded-lg p-6 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{userInfo.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{userInfo.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Change Email</h2>
          <form onSubmit={handleChangeEmail}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="oldEmail">Old Email</label>
              <input
                type="email"
                id="oldEmail"
                className="w-full p-2 border rounded"
                value={userInfo.email}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="newEmail">New Email</label>
              <input
                type="email"
                id="newEmail"
                className="w-full p-2 border rounded"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Change Email
            </button>
          </form>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                className="w-full p-2 border rounded"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="w-full p-2 border rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Change Password
            </button>
          </form>
        </div>

        <div className="text-center">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Delete My Account
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Deleting your account will erase all the information uploaded unto vivo :(
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserSettings;