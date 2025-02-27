import { z } from "zod";

export const AddDomainSchema = z.object({
  domain: z
    .string()
    .min(3, "Domain must be at least 3 characters long")
    .max(255, "Domain must be less than 255 characters")
    .regex(
      /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,6}$/,
      "Invalid domain format"
    ),
  icon: z
    .any()
    .refine((file) => file && file.length > 0, "Icon is required"),
});

export type AddDomainType = z.infer<typeof AddDomainSchema>;
