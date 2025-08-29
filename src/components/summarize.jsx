"use client";

import { useState, useEffect, useRef } from "react";
import { FileText, Loader2, Sparkles, ClipboardCopy, Check, Code2 } from "lucide-react";

export default function Summarize({ fileUrl, options }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef(null);

  useEffect(() => {
    setSummary("");
    setCopied(false);
  }, [fileUrl]);


  const copyText = async () => {
    const text = summaryRef.current?.innerText?.trim() || "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const generateSummary = async () => {
    if (!fileUrl) return;
    setLoading(true);
    setSummary("");
    try {
      const res = await fetch("/api/v1/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl, options }),
      });
      const data = await res.json();
      setSummary(data.ok ? (data.summary || "") : (data.error || "Failed to generate summary."));
    } catch (err) {
      console.error("Error:", err);
      setSummary("Failed to generate summary.");
    } finally {
      setLoading(false);
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-6 bg-[#B3C0A4] rounded-2xl shadow-lg text-[#27233A]">
      <div className="flex items-center justify-center gap-2 mb-4">
        <FileText className="text-[#505168]" />
        <h2 className="text-xl font-semibold">Document Summary</h2>
      </div>

      <div
        className="relative border rounded-lg p-5 bg-[#505168]/10 text-gray-800 h-64 overflow-y-auto outline-none scrollbar-hidden"
        aria-live="polite"
        aria-atomic="true"
      >
        {summary && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={copyText}
              aria-label="Copy visible text"
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium bg-[#27233A] text-[#EAEFD3] hover:bg-[#505168] transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}

        {summary ? (
          <div
            ref={summaryRef}
            className="generatedSummary prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        ) : (
          <span className="italic text-[#505168]">
            {fileUrl
              ? "Click Generate to summarize the document…"
              : "Upload a file to enable summarization."}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          onClick={generateSummary}
          disabled={!fileUrl || loading}
          className="flex items-center gap-2 rounded-lg px-5 py-2 font-medium transition
                     bg-[#27233A] text-[#EAEFD3] hover:bg-[#505168]
                     disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#27233A]"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate
            </>
          )}
        </button>
      </div>
    </div>
  );
}
