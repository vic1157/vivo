import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { chatId: string } }) {
  const { chatId } = params;

  try {
    // First delete all messages related to the chat (to handle cascade deletion issues)
    await prisma.message.deleteMany({
      where: {
        chatId: chatId,
      },
    });

    // Then delete the chat itself
    const deletedChat = await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });

    return NextResponse.json({ success: true, deletedChat });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
