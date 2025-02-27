import { useDomain } from "@/hooks/use-domain";
import { cn } from "@/lib/utils";
import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import UploadButton from "@/components/upload-button";
import FormGenerator from "@/components/forms/form-generator";

type Props = {
  min?: boolean;
  domains: { id: string; name: string; icon: string | null }[] | null | undefined;
};

const DomainMenu = ({ domains, min }: Props) => {
  const { register, onAddDomain, loading, errors, isDomain } = useDomain();

  return (
    <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
      {/* TODO: Header with Add Domain Button */}
      <div className="flex justify-between w-full items-center">
        {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
        <PlusCircle className="cursor-pointer" size={25} onClick={() => {/* TODO: Open modal */}} />
      </div>

      {/* TODO: Form to add a new domain */}
      
      {/* TODO: Render existing domains */}
      
    </div>
  );
};

export default DomainMenu;
