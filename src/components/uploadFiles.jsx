"use client";

import { useState } from "react";
import { FileText, UploadIcon } from "lucide-react";

export default function UploadFiles({ onFileSelect }) {
  const [file, setFile] = useState(null);

  const handleFileSelect = (selected) => {
    if (selected) {
      setFile(selected);
      onFileSelect?.(selected); // pass file up to parent safely
    }
  };

  return (
    <div className="p-10 gap-3 flex flex-col items-center justify-center border-dashed border-2 border-gray-600 rounded-2xl">
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
        <UploadIcon size={50} className="text-gray-500" />
        <p className="text-gray-400">Click or drag & drop PDF/Image</p>
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".pdf, image/*"
        onChange={(e) => handleFileSelect(e.target.files[0])}
        className="hidden"
      />

      {file && (
        <div className="mt-4 flex items-center space-x-2 text-sm text-gray-800">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>{file.name}</span>
        </div>
      )}
    </div>
  );
}
