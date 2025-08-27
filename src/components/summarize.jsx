"use client";

import { useState } from "react";

export default function Summarize({ file }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!file) return;
    setLoading(true);
    setSummary(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error("Error:", err);
      setSummary("❌ Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  if (!file) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please upload a file to generate a summary.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start p-8 h-full">
      <button
        className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400"
        onClick={generateSummary}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {/* Summary */}
      {summary && (
        <div className="mt-6 w-full max-w-2xl p-4 bg-gray-100 rounded-lg text-sm text-gray-800">
          <h3 className="font-semibold mb-2">📄 Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
