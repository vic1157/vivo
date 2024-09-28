"use client";

import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import Sidebar from "@/components/dashboard/Sidebar"; // Import your Sidebar component
import Navbar from "@/components/dashboard/DashboardNavbar"

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
      {/* Sidebar */}
      <Navbar />
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-900">My Chats</h1>
        </div>
        <p className="text-sm text-gray-500 mb-4">09/24/24</p>
        
        {/* Chats section */}
        {chats.map(chat => (
          <ChatCard key={chat.id} chat={chat} />
        ))}

        {/* Saved chats */}
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
