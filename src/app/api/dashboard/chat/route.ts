import { NextResponse } from "next/server";
import NewChat from "@/lib/newChat";

const chatInstance = new NewChat();

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const response = await chatInstance.newThreadRun(message);
    return NextResponse.json({ success: true, message: response });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}


