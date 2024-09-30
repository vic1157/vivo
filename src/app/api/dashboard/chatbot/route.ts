import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI API
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { summary, question } = await req.json();

    if (!summary || !question) {
      return NextResponse.json(
        { message: 'Summary and question are required' },
        { status: 400 }
      );
    }

    // Create a chat completion with the OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4', // Use 'gpt-3.5-turbo' or another model if required
      messages: [
        { role: 'system', content: 'You are an assistant specialized in analyzing lab reports.' },
        { role: 'user', content: `Here is a medical lab report summary:\n${summary}` },
        { role: 'user', content: `Question: ${question}` },
      ],
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json(
      { message: 'Error interacting with OpenAI API' },
      { status: 500 }
    );
  }
}


