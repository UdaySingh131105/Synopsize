"use server";
/**
 * for development testing on local server
 */
import fs from "node:fs/promises";
import path from "node:path";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
]);

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

function sanitizeFilename(name) {
  return name.replace(/[/\\?%*:|"<>]/g, "_").replace(/\s+/g, "_").slice(0, 180);
}

export async function uploadFileAction(file) {
  if (!file) {
    return { ok: false, error: "No file provided." };
  }


  if (!ALLOWED_MIME.has(file.type)) {
    return { ok: false, error: "Only PDF and image files are allowed." };
  }


  if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
    return { ok: false, error: "File size must be >0 and <= 10MB." };
  }


  await fs.mkdir(UPLOAD_DIR, { recursive: true });


  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);


  const orig = file.name || "upload";
  const base = sanitizeFilename(orig);
  const ext = path.extname(base) || (() => {

    if (file.type === "application/pdf") return ".pdf";
    if (file.type === "image/png") return ".png";
    if (file.type === "image/webp") return ".webp";
    if (file.type === "image/gif") return ".gif";
    return ".jpg";
  })();

  const stamp = Date.now();
  const finalName = `${path.basename(base, path.extname(base))}-${stamp}${ext}`;
  const finalPath = path.join(UPLOAD_DIR, finalName);

  await fs.writeFile(finalPath, buffer);

  return { ok: true, filename: finalName, filePath: finalPath };
}
