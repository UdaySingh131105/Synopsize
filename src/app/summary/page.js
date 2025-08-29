"use client";
import { useState } from "react";
import UploadFiles from "@/components/uploadFiles";
import Summarize from "@/components/summarize";
import SummaryOptions from "@/components/summaryOptions";

export default function Home() {
  const [selectedFilePath, setSelectedFilePath] = useState(null);
  const [options, setOptions] = useState({ length: "medium", tone: "neutral" });

  return (
    <section className="flex flex-col items-center justify-start min-h-screen p-8 gap-10 bg-gradient-to-b from-[#27233a] to-[#505168]">
      <h1 className="text-[#EAEFD3] text-3xl font-bold text-center">Summarize Your Document</h1>

      <div className="flex w-full flex-col gap-2 lg:flex-row">
        <div className="flex flex-col md:w-full gap-3">
          <UploadFiles onFileSelect={setSelectedFilePath} />
          <SummaryOptions onOptionsChange={setOptions} />
        </div>

        <div className="flex justify-center items-center md:w-full">
          <Summarize fileUrl={selectedFilePath} options={options} />
        </div>
      </div>
    </section>
  );
}
