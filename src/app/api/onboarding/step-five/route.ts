import { db } from "@/lib/db";
import { StepFiveSchema } from "@/lib/validators/step-five";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { healthGoals } = StepFiveSchema.parse(body);

    try {
        await db.user.update({
            where: { clerkId: user.id },
            data: {
                healthGoals,  // This will now work because healthGoals is defined as a String[]
            },
        });

        return NextResponse.json("Data saved", { status: 200 });
    } catch (error) {
        return new NextResponse("Error saving data", { status: 500 });
    }
}
