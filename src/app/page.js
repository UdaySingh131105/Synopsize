"use client";
import { useState } from "react";
import UploadFiles from "@/components/uploadFiles";  
import Summarize from "@/components/summarize";    
import SummaryOptions from "@/components/summaryOptions";

export default function Home() {
  const [selectedFilePath, setSelectedFilePath] = useState(null);
  const [options, setOptions] = useState({ length: "medium", tone: "neutral" });

  return (
    <section className="flex items-center justify-center h-[80vh] p-4 gap-10">
      {/* Left: Upload */}
      <div className="w-[25vw] flex flex-col justify-center items-center">
        <UploadFiles onFileSelect={setSelectedFilePath} />
        <SummaryOptions onOptionsChange={setOptions} />
      </div>

      {/* Right: Summarize */}
      <div className="w-[65vw] flex justify-center items-center">
        <Summarize fileUrl={selectedFilePath} options={options} />
      </div>
    </section>
  );
}
