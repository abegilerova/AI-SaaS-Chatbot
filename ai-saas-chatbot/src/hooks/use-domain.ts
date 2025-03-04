"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddDomainSchema, AddDomainInput } from "@/schemas/settings.schema";
import { onIntegrateDomain } from "@/app/actions/settings";
import { useToast } from "@/hooks/use-toast";

type DomainResponse = {
  status: number;
  message: string;
  domain?: {
    id: string;
    name: string;
    icon: string;
  };
};

export const useDomain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AddDomainInput>({
    resolver: zodResolver(AddDomainSchema),
  });

  const pathname = usePathname();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    setIsDomain(pathname.split("/").pop());
  }, [pathname]);

  const onSubmit = async (data: AddDomainInput): Promise<DomainResponse> => {
    const response = await onIntegrateDomain(
      data.campaignId || "",
      data.name,
      data.icon
    );

    if (response.status === 200) {
      reset();
      router.refresh();
    }

    return response as DomainResponse;
  };

  const onAddDomain = async (e?: React.FormEvent): Promise<DomainResponse> => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);

    try {
      let response: DomainResponse = {
        status: 500,
        message: "Something went wrong",
      };

      await handleSubmit(async (data) => {
        response = await onSubmit(data);
      })();

      return response;
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  return { register, onAddDomain, errors, loading, isDomain, setValue, reset };
};