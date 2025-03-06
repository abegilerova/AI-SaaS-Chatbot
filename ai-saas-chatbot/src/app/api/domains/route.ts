import { NextResponse } from "next/server";
import { client } from "@/lib/prisma";

export async function GET() {
  try {
    const domains = await client.domain.findMany({
      select: { id: true, name: true, icon: true },
    });

    return NextResponse.json(domains);
  } catch (error) {
    console.error("Failed to fetch domains:", error);
    return NextResponse.json({ error: "Failed to fetch domains" }, { status: 500 });
  }
}
