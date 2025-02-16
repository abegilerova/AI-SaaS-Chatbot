import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/app/actions/user";


const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    // Verify Clerk's webhook secret
    const secret = req.headers.get("clerk-secret");
    if (!secret || secret !== CLERK_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Ensure it's a user creation event
    if (body.type !== "user.created") {
      return NextResponse.json({ message: "Event ignored" }, { status: 200 });
    }

    const user = body.data;

    // Call the server action to save the user in NeonDB
    const savedUser = await createUser({
      clerkId: user.id,
      fullname: `${user.first_name} ${user.last_name}`,
      type: "user", // Default role, modify as needed
    });

    return NextResponse.json({ message: "User saved", user: savedUser }, { status: 200 });
  } catch (error) {
    console.error("Clerk Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
