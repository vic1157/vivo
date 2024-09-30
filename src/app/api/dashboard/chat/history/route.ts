import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic'; // Ensure this route is treated as dynamic

export async function GET(req: NextRequest) {
  try {
    // Extract the user ID from the authentication context
    const { userId } = auth();

    // If the user is not authenticated, return a 401 error
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get the chat ID from the query parameters
    const url = new URL(req.url);
    const chatId = url.searchParams.get("chatId");

    // If no chat ID is provided, return a 400 error
    if (!chatId) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
    }

    // Fetch the chat along with its messages for the authenticated user
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userId: userId, // Ensure the chat belongs to the authenticated user
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" }, // Ensure messages are ordered by creation time
        },
      },
    });

    // If the chat is not found, return a 404 error
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    // Return the chat and its messages in the response
    return NextResponse.json(chat, { status: 200 });

  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching chat history:", error);

    // Return a 500 error if something goes wrong
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 });
  }
}
