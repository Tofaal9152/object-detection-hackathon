"use client";
import { FileUpload } from "@/components/ui/file-upload";
import api from "@/lib/api";
import { useState } from "react";
const FileUploadSection = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleFileUpload = (files: File[]) => {
    // console.log(files);
    setImageFile(files[0]);
  };

  return (
    <div className="w-full h-full border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
      <div className="flex flex-col items-center justify-center w-full h-full p-4"></div>
    </div>
  );
};

export default FileUploadSection;
