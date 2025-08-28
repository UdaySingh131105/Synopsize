"use client";

import { useState, useEffect } from "react";
import { FileText, Loader2, Sparkles } from "lucide-react";

export default function Summarize({ fileUrl, options }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset summary when file changes
  useEffect(() => {
    setSummary("");
  }, [fileUrl]);

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
      if (!data.ok) {
        setSummary((data.error || "Failed to generate summary."));
      } else {
        setSummary(data.summary + "\n");
      }
    } catch (err) {
      console.error("Error:", err);
      setSummary("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-[80%] p-6 bg-gray-700/10 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <FileText className="text-blue-600" />
        <h2 className="text-xl font-semibold">Document Summary</h2>
      </div>

      {/* Scrollable summary box */}
      <div className="flex scrollbar-hidden border rounded-lg p-5 bg-gray-200/10 text-gray-200 whitespace-pre-wrap h-64 overflow-y-auto outline-none">
        {summary ? (
          summary
        ) : (
          <span className="text-gray-400 italic">
            {fileUrl
              ? "Click Generate to summarize your document..."
              : "Upload a file to enable summarization."}
          </span>
        )}
      </div>

      {/* Action Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={generateSummary}
          disabled={!fileUrl || loading}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition ${
            !fileUrl || loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate
            </>
          )}
        </button>
      </div>
    </div>
  );
}
