"use client";

import { useState, useRef } from "react";
import { FileText, UploadIcon, Image as ImageIcon, X, Loader2 } from "lucide-react";

export default function UploadFiles({ onFileSelect }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (selected) => {
    if (selected) {
      setUploading(true)

      try {
        const formData = new FormData();
        formData.append("file", selected);
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
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false)
      }
    }
  };

  const handleRemove = () => {
    setFile(null);
    onFileSelect?.(null);
  };

  const getFileIcon = () => {
    if (!file) return null;
    if (file.type === "application/pdf") {
      return <FileText size={50} className="text-[#27233A]" />;
    }
    if (file.type.startsWith("image/")) {
      return <ImageIcon size={50} className="text-[#27233A]" />;
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
      className={`p-10 gap-3 flex flex-col bg-[#B3C0A4] w-full items-center justify-center border-3 rounded-2xl transition-all duration-200 cursor-pointer hover:border-[#ffff]  text-[#505168] hover:text-[#27233A]
        ${isDragging ? "border-white bg-blue-50 border-dashed" : "border-gray-600 border-dashed"}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleDivClick}
    >
      {uploading ?
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="text-lg">Uploading...</p>
        </> :
        <>
          {!file && (
            <>
              <div className="flex flex-col items-center justify-center gap-2">
                <UploadIcon size={50} className="" />
                <p className="text-center">
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
              </div>
            </>
          )}

          {file && (
            <div className="flex flex-col items-center justify-center gap-2">
              {getFileIcon()}
              <span className="text-center">{file.name}</span>
              <button
                onClick={handleRemove}
                className="text-sm text-red-500 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <X size={12} />
                <span className="text-center">Remove file</span>
              </button>
            </div>
          )}
        </>
      }

    </div>
  );
}
