import { useState } from "react";
import { UploadClient } from "@uploadcare/upload-client";
import { Button } from "./ui/button";

const uploadClient = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
});

type UploadButtonProps = {
  onUpload: (url: string) => void;
};

const UploadButton = ({ onUpload }: UploadButtonProps) => {
  const [loading, setLoading] = useState(false);

const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
        const { cdnUrl: fileUrl } = await uploadClient.uploadFile(file);
        onUpload(fileUrl);
    } catch (error) {
        console.error("Upload failed", error);
    } finally {
        setLoading(false);
    }
};

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
        className="hidden"
        id="upload-input"
      />
      <label htmlFor="upload-input">
        <Button disabled={loading}>{loading ? "Uploading..." : "Upload Icon"}</Button>
      </label>
    </div>
  );
};

export default UploadButton;
