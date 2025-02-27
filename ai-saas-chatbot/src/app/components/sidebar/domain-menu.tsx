import { useDomain } from "@/hooks/use-domain";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import UploadButton from "./../upload-button";
import FormGenerator from "../forms/form-generator";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

type Props = {
  min?: boolean;
  domains: { id: string; name: string; icon: string | null }[] | null | undefined;
};

const DomainMenu = ({ domains, min }: Props) => {
  const { register, onAddDomain, loading, errors, isDomain } = useDomain();
  const [open, setOpen] = useState(false);

  const handleFileUpload = (file: File) => {
    // Handle file after upload (for example, storing it in state or submitting it)
    console.log("File uploaded: ", file);
  };


  return (
    <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
      {/* Header */}
    
      <UploadButton onUpload={() => handleFileUpload} />

      {/* Render Existing Domains */}
      <div className="flex flex-col gap-2">
        {domains?.length ? (
          domains.map((domain) => (
            <Link
              key={domain.id}
              href={`/dashboard/${domain.id}`}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg",
                isDomain === domain.id ? "bg-blue-100" : "hover:bg-gray-100"
              )}
            >
              {domain.icon && (
                <Image src={domain.icon} alt={domain.name} width={24} height={24} className="rounded" />
              )}
              <p className="text-sm">{domain.name}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-xs">No domains added yet.</p>
        )}
      </div>
    </div>
  );
};

export default DomainMenu;
