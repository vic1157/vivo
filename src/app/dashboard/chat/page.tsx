// "use client";

// import React, { useState, useEffect } from "react";
// import { FaPlusCircle } from "react-icons/fa";
// import Sidebar from "@/components/dashboard/Sidebar";
// import Navbar from "@/components/dashboard/DashboardNavbar";
// import { useRouter } from "next/navigation";

// interface Chat {
//   id?: string;
//   title: string;
//   date: string;
//   messages: Array<{ content: string; role: string }>;
// }

// interface Note {
//   id: string;
//   title: string;
//   content: string;
//   date: string;
// }

// const ChatCard: React.FC<{ chat: Chat }> = ({ chat }) => (
//   <div className="bg-white rounded-lg p-4 shadow-md mb-4 w-full">
//     <div className="text-lg font-semibold text-indigo-900">{chat.title}</div>
//     {chat.messages && chat.messages.map((message, index) => (
//       <div
//         key={index}
//         className={`${
//           index % 2 === 0 ? "bg-indigo-100" : "bg-indigo-200"
//         } rounded p-2 mb-2`}
//       >
//         {message.content}
//       </div>
//     ))}
//   </div>
// );

// const NoteCard: React.FC<{ note: Note; onClick: () => void }> = ({ note, onClick }) => (
//   <div
//     className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition"
//     onClick={onClick}
//   >
//     <h4 className="text-md font-semibold text-indigo-900">{note.title}</h4>
//     <p className="text-sm text-gray-500">{note.date}</p>
//     <p className="text-xs text-gray-700 mt-1">{note.content}</p>
//   </div>
// );

// const MyChats: React.FC = () => {
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [savedChats, setSavedChats] = useState<Note[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [newMessage, setNewMessage] = useState<string>("");
//   const router = useRouter();

//   // Fetch saved chats on load
//   useEffect(() => {
//     const fetchSavedChats = async () => {
//       const response = await fetch("/api/dashboard/chat/saved-chats");
//       const data = await response.json();
//       setSavedChats(data);
//     };

//     fetchSavedChats();
//   }, []);

//   // Fetch chat history when a saved chat is clicked
//   const handleChatClick = async (chatId: string) => {
//     const response = await fetch(`/api/dashboard/chat/history?chatId=${chatId}`);
//     const data = await response.json();
//     setCurrentChat(data);
//   };

//   // Create a new chat
//   const handleNewChat = async () => {
//     const response = await fetch("/api/dashboard/chat/new", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title: "New Chat",
//       }),
//     });

//     const data = await response.json();
//     setCurrentChat({
//       id: data.chat.id,
//       title: "New Chat",
//       date: new Date().toLocaleDateString(),
//       messages: [],
//     });
//   };

//   // Add a message to the current chat and get AI response
//   const handleSendMessage = async () => {
//     if (!currentChat || !newMessage) return;

//     // Send the user message and AI response
//     const response = await fetch(`/api/dashboard/chat/new-message`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         chatId: currentChat.id,
//         content: newMessage,
//       }),
//     });

//     const data = await response.json();

//     if (data.success) {
//       setCurrentChat((prevChat) => {
//         const updatedChat: Chat | null = {
//           ...prevChat!,
//           messages: [
//             ...prevChat!.messages,
//             { content: newMessage, role: "user" },
//             { content: data.aiMessage.content, role: "assistant" }, // Add AI response to the chat
//           ],
//         };
//         return updatedChat;
//       });
//     }

//     setNewMessage("");
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-r from-blue-50 to-blue-100">
//       <Navbar />
//       <Sidebar />

//       {/* Main content */}
//       <main className="flex-1 p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-indigo-900">My Chats</h1>
//         </div>

//         {/* Current Chat Section */}
//         {currentChat ? (
//           <div className="relative bg-white rounded-lg shadow-md p-6 mb-6">
//             {/* New Chat Icon on the Top Right */}
//             <FaPlusCircle
//               className="absolute top-4 right-4 text-indigo-900 text-2xl cursor-pointer"
//               onClick={handleNewChat}
//             />
//             <h2 className="text-lg font-semibold text-indigo-900">
//               {currentChat.title}
//             </h2>
//             <div className="text-sm text-gray-500 mb-4">{currentChat.date}</div>

//             {/* Chat Messages */}
//             <div className="chat-messages overflow-y-auto max-h-96 mb-4">
//               {currentChat.messages && currentChat.messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`${
//                     index % 2 === 0 ? "bg-indigo-100" : "bg-indigo-200"
//                   } rounded p-2 mb-2`}
//                 >
//                   {message.content}
//                 </div>
//               ))}
//             </div>

//             {/* Input to send message */}
//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type your message..."
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="relative bg-white rounded-lg shadow-md p-6 mb-6">
//             {/* New Chat Icon on the Top Right */}
//             <FaPlusCircle
//               className="absolute top-4 right-4 text-indigo-900 text-2xl cursor-pointer"
//               onClick={handleNewChat}
//             />
//             <h2 className="text-lg font-semibold text-indigo-900">
//               No Chat Selected
//             </h2>
//             <div className="text-sm text-gray-500">
//               Select a chat or start a new one!
//             </div>
//           </div>
//         )}

//         {/* Saved Chats Section */}
//         <h2 className="text-xl font-semibold text-indigo-900 mb-4">Saved Chats</h2>
//         <div className="grid grid-cols-4 gap-4">
//           {savedChats && savedChats.length > 0 ? (
//             savedChats.map((note) => (
//               <NoteCard key={note.id} note={note} onClick={() => handleChatClick(note.id)} />
//             ))
//           ) : (
//             <p>No saved chats available.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MyChats;

"use client";

import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/DashboardNavbar";
import { useRouter } from "next/navigation";

interface Chat {
  id?: string;
  title: string;
  date: string;
  messages: Array<{ content: string; role: string }>;
}

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

const ChatCard: React.FC<{ chat: Chat }> = ({ chat }) => (
  <div className="bg-white rounded-lg p-4 shadow-md mb-4 w-full">
    <div className="text-lg font-semibold text-indigo-900">{chat.title}</div>
    {chat.messages.map((message, index) => (
      <div
        key={index}
        className={`${
          message.role === "user"
            ? "bg-blue-100 text-right"
            : "bg-gray-100 text-left"
        } rounded p-2 mb-2 text-black`}
      >
        {message.content}
      </div>
    ))}
  </div>
);

const NoteCard: React.FC<{ note: Note; onClick: () => void; onDelete: () => void }> = ({
  note,
  onClick,
  onDelete,
}) => (
  <div className="relative bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition">
    <h4 className="text-md font-semibold text-indigo-900" onClick={onClick}>
      {note.title}
    </h4>
    <p className="text-sm text-gray-500">{note.date}</p>
    <FaTrash
      className="absolute top-4 right-4 text-red-500 cursor-pointer"
      onClick={onDelete}
    />
  </div>
);

const MyChats: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [savedChats, setSavedChats] = useState<Note[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const router = useRouter();

  // Fetch saved chats on load
  useEffect(() => {
    const fetchSavedChats = async () => {
      const response = await fetch("/api/dashboard/chat/saved-chats");
      const data = await response.json();
      setSavedChats(data);
    };

    fetchSavedChats();
  }, []);

  // Fetch chat history when a saved chat is clicked
  const handleChatClick = async (chatId: string) => {
    const response = await fetch(`/api/dashboard/chat/history?chatId=${chatId}`);
    const data = await response.json();
    setCurrentChat(data);
  };

  // Create a new chat
  const handleNewChat = async () => {
    const response = await fetch("/api/dashboard/chat/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New Chat",
      }),
    });

    const data = await response.json();
    setCurrentChat({
      id: data.chat.id,
      title: "New Chat",
      date: new Date().toLocaleDateString(),
      messages: [],
    });
  };

  // Add a message to the current chat and get AI response
  const handleSendMessage = async () => {
    if (!currentChat || !newMessage) return;

    // Send the user message and AI response
    const response = await fetch(`/api/dashboard/chat/new-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: currentChat.id,
        content: newMessage,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setCurrentChat((prevChat) => {
        const updatedChat: Chat | null = {
          ...prevChat!,
          messages: [
            ...prevChat!.messages,
            { content: newMessage, role: "user" }, // User message on the right
            { content: data.aiMessage.content, role: "assistant" }, // AI response on the left
          ],
        };
        return updatedChat;
      });
    }

    setNewMessage("");
  };

  // Delete a saved chat
  const handleDeleteChat = async (chatId: string) => {
    await fetch(`/api/dashboard/chat/${chatId}/delete`, {
      method: "DELETE",
    });

    setSavedChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Navbar />
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-900">My Chats</h1>
        </div>

        {/* Current Chat Section */}
        {currentChat ? (
          <div className="relative bg-white rounded-lg shadow-md p-6 mb-6">
            {/* New Chat Icon on the Top Right */}
            <FaPlusCircle
              className="absolute top-4 right-4 text-indigo-900 text-2xl cursor-pointer"
              onClick={handleNewChat}
            />
            <h2 className="text-lg font-semibold text-indigo-900">
              {currentChat.title}
            </h2>
            <div className="text-sm text-gray-500 mb-4">{currentChat.date}</div>

            {/* Chat Messages */}
            <div className="chat-messages overflow-y-auto max-h-96 mb-4">
              {currentChat.messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.role === "user"
                      ? "bg-indigo-100 text-right"
                      : "bg-indigo-200 text-left"
                  } rounded p-2 mb-2 text-black`}
                >
                  {message.content}
                </div>
              ))}
            </div>

            {/* Input to send message */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="relative bg-white rounded-lg shadow-md p-6 mb-6">
            {/* New Chat Icon on the Top Right */}
            <FaPlusCircle
              className="absolute top-4 right-4 text-indigo-900 text-2xl cursor-pointer"
              onClick={handleNewChat}
            />
            <h2 className="text-lg font-semibold text-indigo-900">
              No Chat Selected
            </h2>
            <div className="text-sm text-gray-500">
              Select a chat or start a new one!
            </div>
          </div>
        )}

        {/* Saved Chats Section */}
        <h2 className="text-xl font-semibold text-indigo-900 mb-4">Saved Chats</h2>
        <div className="grid grid-cols-4 gap-4">
          {savedChats.length > 0 ? (
            savedChats.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => handleChatClick(note.id)}
                onDelete={() => handleDeleteChat(note.id)}
              />
            ))
          ) : (
            <p>No saved chats available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyChats;
