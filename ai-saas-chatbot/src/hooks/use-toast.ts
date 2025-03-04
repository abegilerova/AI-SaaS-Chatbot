import { toast } from "sonner";

export const useToast = () => {
  return {
    toast: ({ title, description }: { title: string; description: string }) => {
      toast(title, {
        description,
      });
    },
  };
};