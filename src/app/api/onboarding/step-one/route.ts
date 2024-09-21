import { db } from "@/lib/db";
import { StepOneSchema } from "@/lib/validators/step-one";
import { currentUser } from "@clerk/nextjs/server"; // Importing currentUser from @clerk/nextjs/server
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Get current user using Clerk's currentUser helper
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse and validate the data using Zod schema
    const { dateOfBirth, weight, height, gender } = StepOneSchema.parse(body);

    // Convert dateOfBirth string to Date object
    const parsedDate = new Date(dateOfBirth);

    if (isNaN(parsedDate.getTime())) {
      return new NextResponse("Invalid date of birth", { status: 422 });
    }

    // Find the user in the database
    const dbUser = await db.user.findFirst({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Update the user data in the database
    await db.user.update({
      where: { clerkId: user.id },
      data: {
        dateOfBirth: parsedDate,
        weight,
        height,
        gender,
      },
    });

    return NextResponse.json({ message: "Data saved" }, { status: 200 });
  } catch (error) {
    console.error("Error saving data:", error);
    return new NextResponse("Error saving data", { status: 500 });
  }
}