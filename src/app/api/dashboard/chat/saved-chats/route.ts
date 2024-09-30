import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure Prisma is imported from a single shared instance
import { getAuth } from '@clerk/nextjs/server'; // Correct Clerk import

export const dynamic = 'force-dynamic'; // Force this route to be handled dynamically

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req); // Extract userId from Clerk auth
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch saved chats from the database associated with the userId
    const savedChats = await prisma.chat.findMany({
      where: {
        userId: userId, // Ensure only chats of the logged-in user are fetched
      },
      orderBy: {
        createdAt: 'desc', // Sort by the latest created chats first
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        messages: {
          select: {
            content: true,
            role: true, // Ensure the role field exists in the Message model
          },
        },
      },
    });

    return NextResponse.json(savedChats, { status: 200 });
  } catch (error) {
    console.error('Error fetching saved chats:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

