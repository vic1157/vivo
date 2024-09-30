import { db } from "@/lib/db";
import { StepFourSchema } from "@/lib/validators/step-four";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = 'force-dynamic'; // Ensure this route is treated as dynamic 

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse and validate the request body
    const body = await req.json();
    const { mood, sleep, stress, happiness } = StepFourSchema.parse(body);

    // Check if the user exists in the database
    const dbUser = await db.user.findFirst({
      where: {
        clerkId: user.id,
      },
    });

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Update the user's lifestyle and mental well-being data in the database
    await db.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        mood: mood,
        sleepQuality: sleep,
        stressLevel: stress,
        happinessRating: happiness,
      },
    });

    return NextResponse.json("Step 4 data saved successfully!", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid data format", { status: 422 });
    }
    return new NextResponse("Error saving step 4 data", { status: 500 });
  }
}
