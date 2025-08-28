"use server"
import Tesseract from "tesseract.js";

export async function extractTextAction(fileUrl) {
  try {
    if (!fileUrl || typeof fileUrl !== "string") {
      return { ok: false, error: "File URL must be a string." };
    }

    const lower = fileUrl.toLowerCase();
    const isPdf = lower.endsWith(".pdf");
    const isImage = /\.(png|jpg|jpeg|bmp|gif|tiff|webp)$/i.test(lower);
    const isText = lower.endsWith(".txt");


    if (isPdf) {
      const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");
      const res = await fetch(fileUrl, { cache: "no-store" });

      if (!res.ok) {
        return { ok: false, error: `Failed to fetch PDF: ${res.status} ${res.statusText}` };
      }

      const buf = Buffer.from(await res.arrayBuffer());
      const parsed = await pdfParse(buf);
      return { ok: true, text: parsed.text || "" };
    }


    if (isImage) {
      const { data: { text } } = await Tesseract.recognize(fileUrl, "eng");
      return { ok: true, text: text || "" };
    }

    if (isText) {
      const res = await fetch(fileUrl);
      if (!res.ok) return { ok: false, error: "Failed to fetch text file from Cloudinary." };
      const text = await res.text();
      return { ok: true, text };
    }

    return { ok: false, error: "Unsupported file type. Only PDF, images, or text." };
  } catch (e) {
    return { ok: false, error: e?.message || "Extraction failed." };
  }
}
