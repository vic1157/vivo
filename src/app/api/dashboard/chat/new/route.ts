import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // Ensure Prisma is correctly imported
import { currentUser } from "@clerk/nextjs/server"; // Use Clerk for user authentication

export const dynamic = 'force-dynamic'; // Ensure this route is treated dynamically by Next.js

export async function POST(req: NextRequest) {
  try {
    // Get the current authenticated user
    const user = await currentUser();

    // If no user is authenticated, return a 401 error
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Parse the request body
    const { title } = await req.json() as { title?: string };

    // Check if the user exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    // If the user is not found, return a 404 error
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create a new chat associated with the authenticated user
    const newChat = await prisma.chat.create({
      data: {
        title: title || "New Chat", // Default title if none provided
        user: { connect: { clerkId: user.id } }, // Associate chat with the user
        messages: {
          create: [
            {
              content: "Starting a new chat session...",
              role: "user", // Add the 'role' property with a default value
            },
          ],
        },
      },
      include: { messages: true }, // Include messages in the response
    });

    // Return the newly created chat
    return NextResponse.json({ success: true, chat: newChat }, { status: 201 });

  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error creating new chat:", error);

    // Return a 500 error if something goes wrong
    return NextResponse.json({ success: false, error: "Failed to create chat" }, { status: 500 });
  }
}

