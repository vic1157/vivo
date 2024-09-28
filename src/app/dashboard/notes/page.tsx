"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/DashboardNavbar";

interface Note {
  id?: string; // Added id for identifying notes
  subject: string;
  content: string;
  date: string;
  preview: string;
}

const NoteCard = ({ note, onClick }: { note: Note; onClick: () => void }) => {
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

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteSubject, setNoteSubject] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [expandedNote, setExpandedNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch notes from the database (GET request)
  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/dashboard/notes");
      const data = await response.json();
      if (response.ok) {
        setNotes(data);
      } else {
        console.error("Error fetching notes:", data.error);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Fetch notes when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Save a new note to the database (POST request)
  const handleSaveNote = async () => {
    if (noteSubject && noteContent) {
      const newNote: Note = {
        subject: noteSubject,
        content: noteContent,
        date: new Date().toLocaleDateString(),
        preview: noteContent.slice(0, 50) + "...", // Limiting preview text
      };

      setLoading(true);
      try {
        const response = await fetch("/api/dashboard/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        });

        if (response.ok) {
          const createdNote = await response.json();
          setNotes([...notes, createdNote]);
          setNoteSubject("");
          setNoteContent("");
        } else {
          console.error("Error saving note");
        }
      } catch (error) {
        console.error("Error saving note:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Update an existing note in the database (PUT request)
  const handleUpdateNote = async () => {
    if (expandedNote) {
      const updatedNote = {
        id: expandedNote.id,
        subject: expandedNote.subject,
        content: expandedNote.content,
        date: expandedNote.date,
        preview: expandedNote.content.slice(0, 50) + "...",
      };

      try {
        const response = await fetch("/api/dashboard/notes", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedNote),
        });

        if (response.ok) {
          const updatedNotes = notes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
          );
          setNotes(updatedNotes);
          setExpandedNote(null); // Close the expanded note after saving
        } else {
          console.error("Error updating note");
        }
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
  };

  // Delete a note from the database (DELETE request)
  const handleDeleteNote = async () => {
    if (expandedNote) {
      try {
        const response = await fetch("/api/dashboard/notes", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: expandedNote.id }),
        });

        if (response.ok) {
          setNotes(notes.filter((note) => note.id !== expandedNote.id));
          setExpandedNote(null);
        } else {
          console.error("Error deleting note");
        }
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <Sidebar />
      <div className="p-6 bg-indigo-50 flex-grow">
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-3xl font-bold text-violet-950 mb-6">My Notes</h2>
          <div className="mb-6">
            <label htmlFor="note-subject" className="sr-only">
              Note Subject
            </label>
            <input
              id="note-subject"
              type="text"
              value={noteSubject}
              onChange={(e) => setNoteSubject(e.target.value)}
              placeholder="Enter subject"
              className="w-full p-3 text-xl rounded-lg border-2 mb-4"
            />
            <label htmlFor="note-content" className="sr-only">
              Note Content
            </label>
            <textarea
              id="note-content"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Type your note here..."
              className="w-full p-3 text-xl rounded-lg border-2"
              rows={6}
            />
          </div>
          <button
            onClick={handleSaveNote}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Save Note"}
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-violet-950 mb-6">Saved Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onClick={() => setExpandedNote(note)}
                />
              ))
            ) : (
              <p>No notes available</p>
            )}
          </div>
        </div>

        {expandedNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
              <h3 className="text-2xl font-bold text-violet-950 mb-4">
                <label htmlFor="expanded-subject" className="sr-only">
                  Note Subject
                </label>
                <input
                  id="expanded-subject"
                  className="text-xl w-full p-2 border-2 rounded-lg"
                  value={expandedNote.subject}
                  onChange={(e) =>
                    setExpandedNote({ ...expandedNote, subject: e.target.value })
                  }
                  placeholder="Enter subject"
                />
              </h3>
              <label htmlFor="expanded-content" className="sr-only">
                Note Content
              </label>
              <textarea
                id="expanded-content"
                className="w-full p-3 border-2 rounded-lg"
                value={expandedNote.content}
                rows={8}
                onChange={(e) =>
                  setExpandedNote({ ...expandedNote, content: e.target.value })
                }
                placeholder="Type your note here..."
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
