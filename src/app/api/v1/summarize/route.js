import { NextResponse } from "next/server";
import { extractTextAction } from "@/app/actions/extract";
import { summarizeWithOpenAIAction } from "@/app/actions/summarize";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    const fileUrl = body?.fileUrl;
    const promptOptions = body?.options;

    if (!fileUrl || typeof fileUrl !== "string") {
      return NextResponse.json(
        { ok: false, error: "Provide JSON { fileUrl: string }" },
        { status: 400 }
      );
    }

    // Extract text from Cloudinary file URL
    const extracted = await extractTextAction(fileUrl);
    if (!extracted.ok || !extracted.text || extracted.text.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: extracted.error || "No extractable text." },
        { status: 422 }
      );
    }

    // Summarize with OpenAI
    const summary = await summarizeWithOpenAIAction(extracted.text, promptOptions);
    if (!summary.ok) {
      return NextResponse.json(summary, { status: 502 });
    }

    return NextResponse.json(
      { ok: true, summary: summary.summary },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Summarization failed." },
      { status: 500 }
    );
  }
}
