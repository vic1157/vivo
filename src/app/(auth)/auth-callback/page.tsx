import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const user = await currentUser();

  // Check if user is logged in and has valid email
  if (!user || !user.primaryEmailAddress?.emailAddress) {
    return redirect("/sign-in");
  }

  // Find user in the database
  const dbUser = await db.user.findFirst({
    where: {
      clerkId: user.id,
    },
  });

  // If user doesn't exist, create a new user in the database
  if (!dbUser) {
    await db.user.create({
      data: {
        clerkId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    // Redirect to onboarding if new user
    return redirect("/onboarding");
  }

  // If user exists, redirect to the dashboard
  return redirect("/dashboard");
};

export default AuthCallbackPage;