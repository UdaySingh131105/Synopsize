"use client";

import { useState } from "react";

export default function SummaryOptions({ onOptionsChange }) {
  const [length, setLength] = useState("medium");
  const [tone, setTone] = useState("neutral");

  const handleChange = (field, value) => {
    const updated = { length, tone, [field]: value };
    setLength(updated.length);
    setTone(updated.tone);
    onOptionsChange(updated);
  };

  return (
    <div className="mt-4 p-4 w-full bg-gray-700/10 rounded-xl shadow">
      <h3 className="text-lg text-center font-semibold mb-3">Summary Options</h3>

      <div className="mb-3">
        <label className="block text-sm mb-1">Length</label>
        <select
          value={length}
          onChange={(e) => handleChange("length", e.target.value)}
          className="w-full p-2 rounded-md bg-gray-200 text-gray-800"
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      </div>


      <div className="mb-3">
        <label className="block text-sm mb-1">Tone</label>
        <select
          value={tone}
          onChange={(e) => handleChange("tone", e.target.value)}
          className="w-full p-2 rounded-md bg-gray-200 text-gray-800"
        >
          <option value="neutral">Neutral</option>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
        </select>
      </div>
    </div>
  );
}
