import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
//import { prisma } from "@/lib/prisma"; 
import { createUser } from "@/app/actions/user";

export async function POST(req: Request) {
  try {
    const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!CLERK_WEBHOOK_SECRET) {
      console.error("❌ Error: CLERK_WEBHOOK_SECRET is missing.");
      return NextResponse.json({ error: "Missing secret" }, { status: 500 });
    }

    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    
    // Await headers() before calling .get()
    const headerPayload = await headers();  

    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
    }

    // Parse the incoming request
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verify the webhook
    const evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    console.log(`✅ Received webhook with type: ${evt.type}`);
    console.log(`📌 Webhook payload:`, evt.data);

    if (evt.type === "user.created") {
      const userData = evt.data;
      console.log(`🆕 New user created with Clerk ID: ${userData.id}`);

   


        const newUser = await createUser({
          fullname: `${userData.first_name} ${userData.last_name}`,
          clerkId: userData.id,
          type: "user",
          stripeId: "", 
      });

      if (newUser) {
        console.log("✅ User stored in database successfully.");
      } else {
        console.log("⚠️ User could not be saved.");
      }
    }
    // Always return a response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Webhook processing failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}