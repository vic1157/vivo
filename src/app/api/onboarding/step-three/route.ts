import { db } from "@/lib/db";
import { StepThreeSchema } from "@/lib/validators/step-three";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const data = StepThreeSchema.parse(body); // Validate data using the schema
        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const dbUser = await db.user.findFirst({
            where: { clerkId: user.id },
        });

        if (!dbUser) {
            await db.user.create({
                data: {
                    clerkId: user.id,
                    email: user.primaryEmailAddress?.emailAddress!,
                    firstName: user.firstName!,
                    lastName: user.lastName || "",
                    medicationData: data, // Save Step 3 data (medication details) to MongoDB
                }
            });
        } else {
            await db.user.update({
                where: { clerkId: user.id },
                data: {
                    medicationData: data, // Update medication data to MongoDB
                },
            });
        }

        return NextResponse.json("Step three data saved!", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid data passed", { status: 422 });
        }
        return new NextResponse("Server error", { status: 500 });
    }
}