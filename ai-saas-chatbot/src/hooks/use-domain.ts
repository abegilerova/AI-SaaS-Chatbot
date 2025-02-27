import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddDomainSchema } from "@/schemas/settings.schema"; // TODO: Define this schema
import { UploadClient } from "@uploadcare/upload-client";
import { onIntegrateDomain } from "@/app/actions/settings"; // TODO: Implement this server action
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string, // TODO: Set this in your .env file
});
// Infer the correct TypeScript type from Zod schema
type AddDomainFormData = z.infer<typeof AddDomainSchema>;

export const useDomain = () => {
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddDomainFormData>({
        resolver: zodResolver(AddDomainSchema), // ✅ Uses Zod for type inference
      });

  const pathname = usePathname();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    setIsDomain(pathname.split("/").pop()); // Extract domain from URL
  }, [pathname]);

  const onAddDomain = handleSubmit(async (values: FieldValues) => {
    setLoading(true);

    try {
      // ✅ TODO 1: Upload the domain icon image to UploadCare
      let uploadedIconUrl = "";
      if (values.icon.length > 0) {
        const file = values.icon[0]; // Get the uploaded file
        const result = await upload.uploadFile(file);
        uploadedIconUrl = result.cdnUrl;
      }

      // ✅ TODO 2: Call the server action to add the domain
      const response = await onIntegrateDomain(values.domain, uploadedIconUrl);

      // ✅ TODO 3: Show a success or error toast
      toast({ 
        title: response.status === 200 ? "Success" : "Error", 
        description: response.message 
      });

      // ✅ TODO 4: Reset the form and refresh UI on success
      if (response.status === 200) {
        reset();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  });

  return { register, onAddDomain, errors, loading, isDomain };
};
