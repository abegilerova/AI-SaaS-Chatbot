import { toast as sonnerToast } from "sonner";

export const useToast = () => {
  const toast = ({ title, description, type = "info" }: { title: string; description?: string; type?: "success" | "error" | "info" }) => {
    sonnerToast[type](title, { description });
  };

  return { toast };
};
