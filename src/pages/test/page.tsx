import { GalleryUploader } from "@/components/files/gallery-uploader";
import { VideoUploader } from "@/components/files/video/uploader";
import { ImageUploader } from "@/components/files/image-uploader";
import GroupedAdminSidebar from "../admin/(sidebar)/GroupedSidebarLinks";
import { CloudinaryWidget } from "@/components/cloudinary/Cloudinary";
import GlassmorphicTest from "./Glassmorphic";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function TestPage() {
  return (
    <div className="   ">
      <main className="block p-5">
        <Input />

        <br />
        <GlassmorphicTest />
        <GroupedAdminSidebar />
        <ImageUploader onUpload={(url) => console.log(url)} />

        <br />

        <GalleryUploader />

        <br />

        <VideoUploader />
        <CloudinaryWidget />
      </main>
    </div>
  );
}

export function Input() {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-center group relative focus-within:ring-2 ring-primary border border-gray-300 rounded-lg h-13 w-fit">
      <label
        htmlFor="test-input"
        className={cn(
          `absolute top-6 left-4 text-muted-foreground group-focus-within:top-2 group-focus-within:text-sm group-focus-within:text-primary transition-all duration-300 ease-out -translate-y-1/2 text-sm font-medium `,
          value ? "top-2" : "",
        )}
      >
        Test Input:
      </label>
      <input
        id="test-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-full pb-0 pt-2 px-4 focus:outline-none outline-0 font-[350]"
      />
    </div>
  );
}
