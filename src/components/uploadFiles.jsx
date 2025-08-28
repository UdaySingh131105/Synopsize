"use client";

import { useState, useRef } from "react";
import { FileText, UploadIcon, Image as ImageIcon, X } from "lucide-react";

export default function UploadFiles({ onFileSelect }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [summaryLength, setSummaryLength] = useState("medium");
  const fileInputRef = useRef(null);

  const handleUpload = async (selected) => {
    if (selected) {
      const formData = new FormData();
      formData.append("file", selected);
      formData.append("summaryLength", summaryLength);
      const uploadRes = await fetch(
        `/api/v1/upload/cloud`,
        {
          method: "POST",
          body: formData,
        }
      );
      const body = await uploadRes.json();
      setFile(selected);
      onFileSelect?.(body.url);
    }
  };

  const handleRemove = () => {
    setFile(null);
    onFileSelect?.(null);
  };

  const getFileIcon = () => {
    if (!file) return null;
    if (file.type === "application/pdf") {
      return <FileText size={50} className="text-red-600" />;
    }
    if (file.type.startsWith("image/")) {
      return <ImageIcon size={50} className="text-green-600" />;
    }
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDivClick = () => {
    if (!file && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`p-10 gap-3 flex flex-col w-full items-center justify-center border-2 rounded-2xl transition-colors duration-200 cursor-pointer 
        ${isDragging ? "border-blue-500 bg-blue-50 border-dashed" : "border-gray-600 border-dashed"}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleDivClick}
    >
      {!file && (
        <>
          <UploadIcon size={50} className="text-gray-500" />
          <p className="text-gray-400 text-center">
            {isDragging ? "Drop file here" : "Click or drag & drop PDF/Image"}
          </p>
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            accept=".pdf, image/*"
            onChange={(e) => handleUpload(e.target?.files[0])}
            className="hidden"
          />
        </>
      )}

      {file && (
        <div className="mt-4 flex flex-col items-center justify-center space-y-1">
          <div className="flex flex-col space-y-2 justify-center items-center space-x-2 text-sm text-gray-800">
            {getFileIcon()}
            <span>{file.name}</span>
          </div>
          <button
            onClick={handleRemove}
            className="text-xs text-red-500 hover:underline flex items-center space-x-1"
          >
            <X size={12} />
            <span>Remove file</span>
          </button>
        </div>
      )}
    </div>
  );
}
