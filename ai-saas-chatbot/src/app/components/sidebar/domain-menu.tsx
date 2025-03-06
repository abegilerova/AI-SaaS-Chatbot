"use client";
import { useEffect } from "react";
import { useDomain } from "@/hooks/use-domain";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import UploadButton from "./../upload-button";
import FormGenerator, { FormField } from "../forms/form-generator";
import { Dialog, DialogContent, DialogTrigger, 
  DialogHeader,
  DialogTitle, } from "../ui/dialog";
import { useToast } from "@/hooks/use-toast";
import SidebarItem from "../SideBarItem";
import { Globe } from "lucide-react"; 


type Props = {
  min?: boolean;
  domains:
    | { id: string; name: string; icon: string | null }[]
    | null
    | undefined;
};

const DomainMenu = ({ domains, min }: Props) => {
  const { register, onAddDomain, loading, errors, isDomain, setValue, reset } =
    useDomain();
  const [isOpen, setIsOpen] = useState(false);
  const [iconUrl, setIconUrl] = useState("");
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAddDomain();
      toast({
        title: "Success",
        description: "Domain successfully added",
      });
      setIsOpen(false);
      setIconUrl("");
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add domain",
      });
    }
  };

  useEffect(() => {
    if (iconUrl) {
      setValue("icon", iconUrl);
    }
  }, [iconUrl, setValue]);

  type FormValues = {
    name: string;
    icon: string;
    campaignId?: string;
  };

  const formFields: FormField<FormValues>[] = [
    {
      name: "name",
      label: "Domain Name",
      type: "text",
      placeholder: "e.g., mywebsite.com",
    },
    {
      name: "icon",
      label: "Domain Icon",
      type: "hidden",
    },
  ];

  return (
    <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
      <div className="flex justify-between w-full items-center">
        {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
        <PlusCircle
          className="cursor-pointer hover:text-gray-600"
          size={25}
          onClick={() => setIsOpen(true)}
        />
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setIconUrl("");
            reset();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Domain</DialogTitle>
            <p className="text-sm text-gray-500 mt-2">
              Add a domain where you want to integrate your chatbot. This can be
              your existing website or a new site you're planning to build.
            </p>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormGenerator<FormValues>
              fields={[
                {
                  name: "name",
                  label: "Domain Name",
                  type: "text",
                  placeholder: "e.g., mywebsite.com",
                },
                {
                  name: "icon",
                  label: "Domain Icon",
                  type: "hidden",
                },
              ]}
              register={register}
              errors={errors}
            />
            <div className="text-xs text-gray-500">
              Enter the domain name without http:// or https://
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Upload Icon
              </label>
              <UploadButton onUploadComplete={(url) => setIconUrl(url)}>
                {iconUrl ? "Change Icon" : "Upload Icon"}
              </UploadButton>
              {iconUrl && (
                <div className="relative w-12 h-12">
                  <Image
                    src={iconUrl}
                    alt="Domain icon"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setIconUrl("")}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading || !iconUrl}
              className="w-full"
            >
              {loading ? "Adding..." : "Add Domain"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-2">
      <ul className="space-y-3">
      {domains?.map((domain) => (
          <SidebarItem
            key={domain.id}
            icon={domain.icon ? <img src={domain.icon} alt={domain.name} className="h-5 w-5 rounded-full" /> : <Globe className="h-5 w-5" />}
            text={domain.name}
            collapsed={false} // Adjust based on Sidebar collapsed state
          />
        ))}
          </ul>
      </div>
    </div>
  );
};

export default DomainMenu;