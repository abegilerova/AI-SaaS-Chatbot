"use server";

import { currentUser } from "@clerk/nextjs/server"; // Correct import
 // Fetch the current authenticated user
import { client } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const onIntegrateDomain = async (
  campaignId: string,
  domain: string,
  icon: string
) => {
  const user = await currentUser();
  if (!user) return { status: 401, message: "Unauthorized" };

  try {
    const dbUser = await client.user.findFirst({
      where: { clerkId: user.id },
      include: {
        domains: true,
        billings: {
          orderBy: { id: "desc" },
          take: 1,
        },
        campaigns: {
          take: 1,
        },
      },
    });

    if (!dbUser) {
      return { status: 404, message: "User not found" };
    }

    // Check if the domain already exists
    const existingDomain = await client.domain.findFirst({
      where: {
        name: domain,
        userId: dbUser.id,
      },
    });

    if (existingDomain) {
      return { status: 400, message: "Domain already exists" };
    }

    // Check the subscription plan and enforce limits
    const currentPlan = dbUser.billings[0]?.plan || "free";
    const domainLimit =
      currentPlan === "pro" ? 10 : currentPlan === "enterprise" ? -1 : 3;

    if (domainLimit !== -1 && dbUser.domains.length >= domainLimit) {
      return {
        status: 403,
        message: `You've reached the maximum number of domains for your ${currentPlan} plan`,
      };
    }

    // Get or create a default campaign
    let targetCampaignId = campaignId;
    if (!targetCampaignId) {
      const defaultCampaign =
        dbUser.campaigns[0] ||
        (await client.campaign.create({
          data: {
            name: "Default Campaign",
            customers: [],
            userId: dbUser.id,
          },
        }));
      targetCampaignId = defaultCampaign.id;
    }

    // Create a new domain entry and link it to the user
    const newDomain = await client.domain.create({
      data: {
        name: domain,
        icon,
        userId: dbUser.id,
        campaignId: targetCampaignId,
      },
    });

    revalidatePath("/dashboard");
    return {
      status: 200,
      message: "Domain successfully added",
      domain: newDomain,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
};