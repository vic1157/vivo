import { db } from "@/lib/db";
import { StepSixSchema } from "@/lib/validators/step-six";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Ensure this route is treated as dynamic

export async function POST(req: Request) {
  const body = await req.json();
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { lastPhysicalExam, labWorkFrequency, primaryCarePhysician, comfortLevelWithProviders } = StepSixSchema.parse(body);

  try {
    await db.user.update({
      where: { clerkId: user.id },
      data: {
        lastPhysicalExam: lastPhysicalExam ? new Date(lastPhysicalExam) : null,
        labWorkFrequency,
        primaryCarePhysician,
        comfortLevelWithProviders,
      },
    });

    return NextResponse.json("Data saved", { status: 200 });
  } catch (error) {
    return new NextResponse("Error saving data", { status: 500 });
  }
}
