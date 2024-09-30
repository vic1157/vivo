import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";  // Comment out Prisma since it's not needed for the bypass

export const dynamic = 'force-dynamic'; // Ensure this route is treated as dynamic

export async function DELETE(req: Request, { params }: { params: { chatId: string } }) {
  const { chatId } = params;

  if (!chatId) {
    return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
  }

  // Bypass actual deletion logic and return a success response
  return NextResponse.json({ success: true, message: `Bypassed deletion for chat ${chatId}` });
}

