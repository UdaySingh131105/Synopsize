"use client";
import { useState } from "react";
import UploadFiles from "@/components/uploadFiles";   // make sure filename matches
import Summarize from "@/components/summarize";       // same here

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <section className="flex items-center justify-center h-[80vh]">
      {/* Left: Upload */}
      <div className="w-[30vw]">
        <UploadFiles onFileSelect={setSelectedFile} />
      </div>

      {/* Right: Summarize */}
      <div className="w-[70vw]">
        <Summarize file={selectedFile} />
      </div>
    </section>
  );
}
