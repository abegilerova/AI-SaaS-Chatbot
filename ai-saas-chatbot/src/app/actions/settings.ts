"use server";
import { currentUser } from "@clerk/nextjs/server"; // Correct import
 // Fetch the current authenticated user
import { client } from "@/lib/prisma";

export const onIntegrateDomain = async (domain: string, icon: string) => {
  const user = await currentUser();
  console.log("user aika ", user);
  if (!user) return { status: 401, message: "Unauthorized" };

  try {
    // TODO: Fetch the user's subscription and count their current domains.
  
    const existingUser = await client.user.findUnique({
            where: { id: user.id },
            include: { billings: true, domains: true },
        });

            if(!existingUser){
                return {status: 404, message: "User not found"} ;
            }

        // Step 2: Check user's subscription plan
        const userPlan = existingUser.billings?.[0]?.plan || "free"; // Default to "free" if no billing info

        const domainLimit = userPlan === "free" ? 1 : userPlan === "pro" ? 5 : 10; // Example limits

         // Step 3: Count user's existing domains
         if (existingUser.domains.length >= domainLimit) {
            return { status: 403, message: "Domain limit reached. Upgrade your plan to add more." };
          }

    // TODO: Check if the domain already exists.

    const existingDomain = await client.domain.findFirst({
        where: { name: domain, userId: existingUser.id },
      });

      if (existingDomain) {
        return { status: 400, message: "Domain already exists" };
      }
  
      

    // TODO: Check the subscription plan and enforce limits.
    
    

    // TODO: Create a new domain entry and link it to the user.
    await client.domain.create({
        data: {
          name: domain,
          icon: icon,
          userId: existingUser.id,
          campaignId: "", // TODO: Assign a campaign ID if necessary
        },
      });
  
      return { status: 200, message: "Domain successfully added" };
    } catch (error) {
      console.error("Error in onIntegrateDomain:", error);
      return { status: 500, message: "Internal Server Error" };
    }
  };
