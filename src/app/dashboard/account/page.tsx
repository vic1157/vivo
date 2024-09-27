"use client";

import React, { useState } from 'react';
import Sidebar from "@/components/dashboard/Sidebar"; // Assuming you have this Sidebar component
import { usePathname } from "next/navigation";
import { UploadIcon, HomeIcon, LabReportIcon, NotesIcon, ChatIcon, AccountIcon, SettingsIcon } from "@/components/icons/Icons";

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
    console.log('Changing email to:', newEmail);
    // Here, implement the logic for changing email.
    setUserInfo((prev) => ({ ...prev, email: newEmail }));
    setNewEmail('');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Changing password');
    // Implement the logic for password change.
    setOldPassword('');
    setNewPassword('');
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account');
    // Implement account deletion logic here.
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-indigo-900 mb-6">User Settings</h1>

        {/* User Information */}
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

        {/* Change Email Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Change Email</h2>
          <form onSubmit={handleChangeEmail}>
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

        {/* Change Password Section */}
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

        {/* Delete Account Section */}
        <div className="text-center">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Delete My Account
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Deleting your account will erase all the information uploaded to Vivo.
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserSettings;
