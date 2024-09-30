import { db } from "@/lib/db";
import { StepSevenSchema } from "@/lib/validators/step-seven";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Ensure this route is treated as dynamic

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request body using the StepSevenSchema
    const { usesFitnessTrackingTech, willingToConnectHealthData, comfortWithHealthTech } = StepSevenSchema.parse(body);

    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Convert "yes"/"no" to boolean for willingToConnectHealthData
    const willingToConnect = willingToConnectHealthData === "yes";

    // Update the user's step seven information in the database
    await db.user.update({
      where: { clerkId: user.id },
      data: {
        usesFitnessTrackingTech, // This is already a boolean
        willingToConnectHealthData: willingToConnect, // Store as a boolean
        comfortWithHealthTech,
      },
    });

    return NextResponse.json("Data saved", { status: 200 });
  } catch (error) {
    console.error("Error saving step seven data:", error);
    return new NextResponse("Error saving data", { status: 500 });
  }
}

