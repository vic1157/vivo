"use client";

import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar"; // Assuming the sidebar component is in this location

// NoteCard Component
const NoteCard = ({ note, onClick }: { note: any, onClick: any }) => {
  return (
    <div
      onClick={onClick}
      className="bg-blue-100 rounded-lg p-4 cursor-pointer shadow-md hover:shadow-lg transition-all"
    >
      <p className="text-lg font-semibold text-violet-950">{note.subject}</p>
      <p className="text-sm text-gray-500">{note.date}</p>
      <p className="text-sm text-black mt-2">{note.preview}</p>
    </div>
  );
};

// NotesPage Component
const NotesPage = () => {
  const [notes, setNotes] = useState<
    { subject: string; content: string; date: string; preview: string }[]
  >([]);
  const [noteSubject, setNoteSubject] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [expandedNote, setExpandedNote] = useState<{
    subject: string;
    content: string;
    date: string;
    preview: string;
  } | null>(null);

  const handleSaveNote = () => {
    if (noteSubject && noteContent) {
      const newNote = {
        subject: noteSubject,
        content: noteContent,
        date: new Date().toLocaleDateString(),
        preview: noteContent.slice(0, 50) + "...", // Limiting preview text
      };
      setNotes([...notes, newNote]);
      setNoteSubject("");
      setNoteContent("");
    }
  };

  const handleUpdateNote = () => {
    if (expandedNote) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note === expandedNote
            ? {
                ...note,
                subject: expandedNote.subject,
                content: expandedNote.content,
                preview: expandedNote.content.slice(0, 50) + "...",
              }
            : note
        )
      );
      setExpandedNote(null); // Close the expanded note after saving
    }
  };

  const handleDeleteNote = () => {
    if (expandedNote) {
      setNotes(notes.filter((note) => note !== expandedNote));
      setExpandedNote(null);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Adding the Sidebar component */}
      <div className="p-6 bg-indigo-50 flex-grow">
        {/* Main Note Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-3xl font-bold text-violet-950 mb-6">My notes</h2>
          <div className="mb-6">
            <input
              type="text"
              value={noteSubject}
              onChange={(e) => setNoteSubject(e.target.value)}
              placeholder="Enter subject"
              className="w-full p-3 text-xl rounded-lg border-2 mb-4"
            />
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Type your note here..."
              className="w-full p-3 text-xl rounded-lg border-2"
              rows={6}
            />
          </div>
          <button
            onClick={handleSaveNote}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Save Note
          </button>
        </div>

        {/* Saved Notes Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-violet-950 mb-6">Saved Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, index) => (
              <NoteCard
                key={index}
                note={note}
                onClick={() => setExpandedNote(note)}
              />
            ))}
          </div>
        </div>

        {/* Expanded Note Section */}
        {expandedNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
              <h3 className="text-2xl font-bold text-violet-950 mb-4">
                <input
                  className="text-xl w-full p-2 border-2 rounded-lg"
                  value={expandedNote.subject}
                  onChange={(e) =>
                    setExpandedNote({ ...expandedNote, subject: e.target.value })
                  }
                />
              </h3>
              <textarea
                className="w-full p-3 border-2 rounded-lg"
                value={expandedNote.content}
                rows={8}
                onChange={(e) =>
                  setExpandedNote({ ...expandedNote, content: e.target.value })
                }
              />
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleUpdateNote}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
                >
                  Save Note
                </button>
                <button
                  onClick={handleDeleteNote}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
                >
                  Delete Note
                </button>
                <button
                  onClick={() => setExpandedNote(null)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
