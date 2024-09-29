import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma"; // Adjust this to your Prisma import path
import { currentUser } from "@clerk/nextjs/server"; // Use currentUser for authentication

export async function POST(req: Request) {
  const user = await currentUser(); // Fetch the current user

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { title } = await req.json();

    // Ensure user is already created in the database with all required fields
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    // Create a new chat associated with the authenticated user
    const newChat = await prisma.chat.create({
      data: {
        title: title || "New Chat",
        user: { connect: { clerkId: user.id } }, // Connect the chat to the authenticated user
        messages: {
          create: [
            {
              content: "Starting a new chat session...",
              role: "user", // Add the 'role' property with a value
            },
          ],
        },
      },
      include: { messages: true }, // Include messages in the response
    });

    return NextResponse.json({ success: true, chat: newChat });
  } catch (error) {
    console.error("Error creating new chat:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
