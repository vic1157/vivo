// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";
// import ChatCompletionMessageParam from "openai";
// import { OpenAI } from "openai";

// // Initialize OpenAI client with API key
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//   const user = await currentUser();
//   if (!user) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   try {
//     const { chatId, content } = await req.json();

//     // Find the chat in the database, including its messages
//     const chat = await prisma.chat.findUnique({
//       where: { id: chatId },
//       include: { messages: true },
//     });

//     if (!chat) {
//       return NextResponse.json({ error: "Chat not found" }, { status: 404 });
//     }

//     // Create a new message for the user
//     const userMessage = await prisma.message.create({
//       data: {
//         content: content,
//         role: "user", // User message
//         chat: { connect: { id: chatId } },
//       },
//     });

//     // Send a message to the OpenAI API
//     const aiResponse = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         ...chat.messages.map((msg) => ({
//           role: msg.role as "user" | "system" | "assistant", // Preserve the role from the database messages
//           content: msg.content,
//         })),
//         { role: "user", content: content }, // Update the role to "user" and provide the content
//       ],
//     });

//     // Create a new message for the assistant's response
//     const aiMessage = await prisma.message.create({
//       data: {
//         content: aiResponse.choices[0]?.message?.content || "No response",
//         role: "assistant", // AI assistant message
//         chat: { connect: { id: chatId } },
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       userMessage,
//       aiMessage,
//     });
//   } catch (error) {
//     console.error("Error sending message:", error);
//     return NextResponse.json({ error: (error as Error).message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { OpenAI } from "openai";

// Initialize OpenAI client with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not found" },
      { status: 500 }
    );
  }

  try {
    const { chatId, content } = await req.json();

    // Find the chat in the database, including its messages
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    // Create a new message for the user
    const userMessage = await prisma.message.create({
      data: {
        content: content,
        role: "user", // User message
        chat: { connect: { id: chatId } },
      },
    });

    // Call OpenAI API for the AI response
    let aiMessageContent = "No response";
    try {
      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          ...chat.messages.map((msg) => ({
            role: msg.role as "user" | "system" | "assistant", // Preserve the role from the database
            content: msg.content,
          })),
          { role: "user", content: content }, // User's new message
        ],
      });

      aiMessageContent = aiResponse.choices[0]?.message?.content || aiMessageContent;
    } catch (apiError) {
      console.error("OpenAI API error:", apiError);
      return NextResponse.json(
        { error: "Failed to get AI response from OpenAI" },
        { status: 500 }
      );
    }

    // Create a new message for the assistant's response
    const aiMessage = await prisma.message.create({
      data: {
        content: aiMessageContent,
        role: "assistant", // AI assistant message
        chat: { connect: { id: chatId } },
      },
    });

    return NextResponse.json({
      success: true,
      userMessage,
      aiMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
