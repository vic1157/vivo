"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSettings } from 'react-icons/fi';
import {
  UploadIcon,
  HomeIcon,
  LabReportIcon,
  NotesIcon,
  ChatIcon,
  AccountIcon,
  SettingsIcon,
} from "@/components/icons/Icons";

interface Chat {
  id: string;
  title: string;
  date: string;
  messages: string[];
}

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

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

const ChatCard: React.FC<{ chat: Chat }> = ({ chat }) => (
  <div className="bg-blue-100 rounded-lg p-4 mb-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-indigo-900">{chat.title}</h3>
    </div>
    {chat.messages.map((message, index) => (
      <div key={index} className="bg-blue-200 rounded p-2 mb-2 w-3/4 ml-auto">{message}</div>
    ))}
  </div>
);

const NoteCard: React.FC<{ note: Note }> = ({ note }) => (
  <div className="bg-blue-50 rounded-lg p-3 mb-3">
    <h4 className="text-sm font-semibold text-indigo-900">{note.title}</h4>
    <p className="text-xs text-gray-500">{note.date}</p>
    <p className="text-xs text-gray-700 mt-1">{note.content}</p>
  </div>
);

const MyChats: React.FC = () => {
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      title: 'Re: Rubella/Measles',
      date: '09/24/24',
      messages: ['Message 1', 'Message 2', 'Message 3', 'Message 4']
    }
  ]);

  const [savedChats] = useState<Note[]>([
    {
      id: '1',
      title: 'Rubella',
      content: 'Speak to doctor about blah blah blah blah blah blah......',
      date: '09/24/24'
    },
    { id: '2', title: 'Saved Chat 2', content: '', date: '' },
    { id: '3', title: 'Saved Chat 3', content: '', date: '' },
    { id: '4', title: 'Saved Chat 4', content: '', date: '' }
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-900">My Chats</h1>
          <FiSettings className="text-gray-500" size={24} />
        </div>
        <p className="text-sm text-gray-500 mb-4">09/24/24</p>
        
        {chats.map(chat => (
          <ChatCard key={chat.id} chat={chat} />
        ))}

        <h2 className="text-xl font-semibold text-indigo-900 mt-8 mb-4">Saved Chats</h2>
        <div className="grid grid-cols-4 gap-4">
          {savedChats.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyChats;