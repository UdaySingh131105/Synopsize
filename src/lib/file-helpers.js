import path from "node:path";

const UPLOAD_BASE = path.join(process.cwd(), "uploads");

export function resolveSafe(p) {
  const abs = path.isAbsolute(p) ? p : path.join(UPLOAD_BASE, p);
  const norm = path.normalize(abs);
  if (!norm.startsWith(UPLOAD_BASE)) {
    throw new Error("Invalid path");
  }
  return norm;
}

export function inferType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".pdf") return "pdf";
  if ([".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(ext)) return "image";
  if ([".txt", ".md"].includes(ext)) return "text";
  return "unknown";
}
