"use client";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
const FileUploadSection = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleFileUpload = (files: File[]) => {
    console.log(files);
    setImageFile(files[0]);
  };
  const handleImageUpload = async () => {
    console.log(imageFile)
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}administrator/setup-workplace/?action=add-image`,
      imageFile,
      {
        
        withCredentials: true,
      }
    );
    console.log(res);
  };

  return (
    <div className="w-full h-full border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <button
          onClick={handleImageUpload}
          className="inline-flex mt-12 h-12 cursor-pointer animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Upload Image & Continue <ArrowRightIcon className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default FileUploadSection;
