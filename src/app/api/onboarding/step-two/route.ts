import { db } from "@/lib/db";
import { StepTwoSchema } from "@/lib/validators/step-two";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = 'force-dynamic'; // Ensure this route is treated as dynamic

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const data = StepTwoSchema.parse(body); // Validate data using the schema
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
                    image: user.imageUrl,
                    lifestyleData: data, // Save step 2 data to MongoDB
                }
            });
        } else {
            await db.user.update({
                where: { clerkId: user.id },
                data: {
                    lifestyleData: data, // Update step 2 data to MongoDB
                },
            });
        }

        return NextResponse.json("Step two data saved!", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid data passed", { status: 422 });
        }
        return new NextResponse("Server error", { status: 500 });
    }
}