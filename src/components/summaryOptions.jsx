"use client";

import { useState } from "react";

function Segmented({ label, value, onChange, options, name }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-3">
      <div
        role="group"
        aria-label={label}
        className="flex w-full gap-2 rounded-2xl bg-[#27233A]/90 p-2 shadow-inner"
      >
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              name={name}
              aria-pressed={active}
              onClick={() => onChange(opt.value)}
              className={[
                "flex-1 cursor-pointer basis-0 min-w-0 grow h-10 leading-[2.5rem] rounded-xl px-4 text-sm font-medium transition-all items-center justify-center", 
                "text-[#EAEFD3]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                "focus-visible:ring-[#505168] focus-visible:ring-offset-[#27233A] transition-all",
                active
                  ? "shadow-md bg-gradient-to-r from-[#DCC48E] to-[#B3C0A4] text-black font-semibold"
                  : "bg-transparent hover:bg-[#505168]/30"
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}


export default function SummaryOptions({ onOptionsChange }) {
  const [length, setLength] = useState("medium");
  const [tone, setTone] = useState("neutral");

  const handleChange = (field, value) => {
    const updated = { length, tone, [field]: value };
    setLength(updated.length);
    setTone(updated.tone);
    onOptionsChange?.(updated);
  };

  const lengthOptions = [
    { value: "short", label: "Short" },
    { value: "medium", label: "Medium" },
    { value: "long", label: "Long" },
  ];

  const toneOptions = [
    { value: "neutral", label: "Neutral" },
    { value: "formal", label: "Formal" },
    { value: "casual", label: "Casual" },
  ];

  return (
    <div className="mt-4 w-full rounded-2xl bg-[#B3C0A4] p-5 shadow">
      <h3 className="mb-4 text-center text-lg font-semibold text-[#27233A]">Summary Options</h3>

      <Segmented
        label="Length"
        name="length"
        value={length}
        onChange={(val) => handleChange("length", val)}
        options={lengthOptions}
      />

      <Segmented
        label="Tone"
        name="tone"
        value={tone}
        onChange={(val) => handleChange("tone", val)}
        options={toneOptions}
      />
    </div>
  );
}
