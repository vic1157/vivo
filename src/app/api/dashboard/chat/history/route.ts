import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure this is the correct import path for your Prisma client
import { auth } from '@clerk/nextjs/server'; // Adjust this according to your authentication system

export const dynamic = 'force-dynamic'; // Force dynamic handling

export async function GET(req: Request) {
  try {
    const { userId } = auth(); // Assuming you're using Clerk for authentication
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const url = new URL(req.url);
    const chatId = url.searchParams.get('chatId');

    if (!chatId) {
      return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 });
    }

    // Fetch chat history from Prisma
    const chatHistory = await prisma.chat.findUnique({
      where: { id: chatId, userId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }, // Ensure proper ordering
        },
      },
    });

    if (!chatHistory) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, chatHistory }, { status: 200 });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json({ error: 'Failed to fetch chat history' }, { status: 500 });
  }
}
