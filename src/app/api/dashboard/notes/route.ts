import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// GET - Fetch all notes for the current user
export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // Fetch notes for the authenticated user
    const notes = await prisma.note.findMany({
      where: { userId },
    });

    if (notes.length === 0) {
      return NextResponse.json({ message: "No notes found." }, { status: 200 });
    }

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes." },
      { status: 500 }
    );
  }
}

// POST - Create a new note for the current user
export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { subject, content } = await request.json();

  if (!subject || !content) {
    return NextResponse.json(
      { error: "Subject and content are required." },
      { status: 400 }
    );
  }

  // Auto-generate date and preview on the server-side
  const date = new Date().toLocaleDateString();
  const preview = content.slice(0, 50) + "...";

  try {
    // Create a new note and associate it with the user
    const newNote = await prisma.note.create({
      data: {
        subject,
        content,
        date,
        preview,
        userId,
      },
    });
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note." },
      { status: 500 }
    );
  }
}

// PUT - Update an existing note for the current user
export async function PUT(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id, subject, content } = await request.json();

  if (!id || !subject || !content) {
    return NextResponse.json(
      { error: "ID, subject, and content are required." },
      { status: 400 }
    );
  }

  const preview = content.slice(0, 50) + "...";

  try {
    // Update the note if it belongs to the authenticated user
    const updatedNote = await prisma.note.updateMany({
      where: {
        id,
        userId, // Ensure only the user's note is updated
      },
      data: {
        subject,
        content,
        preview,
      },
    });

    if (updatedNote.count === 0) {
      return NextResponse.json(
        { error: "Note not found or unauthorized." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Failed to update note." },
      { status: 500 }
    );
  }
}

// DELETE - Delete a note for the current user
export async function DELETE(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Note ID is required." }, { status: 400 });
  }

  try {
    // Delete the note if it belongs to the authenticated user
    const deletedNote = await prisma.note.deleteMany({
      where: {
        id,
        userId, // Ensure only the user's note is deleted
      },
    });

    if (deletedNote.count === 0) {
      return NextResponse.json(
        { error: "Note not found or unauthorized." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Note deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Failed to delete note." },
      { status: 500 }
    );
  }
}
