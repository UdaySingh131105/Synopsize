"use server";
export async function summarizeWithOpenAIAction(inputText, opts = {}) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Missing OPENAI_API_KEY." };

    const model = opts.model ?? process.env.OPENAI_SUMMARY_MODEL ?? "gpt-4o-mini";
    const temperature = opts.temperature ?? 0.3;
    const maxChars = opts.maxChars ?? 120000;

    const text = inputText && inputText.length > maxChars
      ? inputText.slice(0, maxChars)
      : (inputText || "");


    let lengthInstruction = "";
    if (opts.length === "short") {
      lengthInstruction = "Keep it very brief (2-3 sentences).";
    } else if (opts.length === "medium") {
      lengthInstruction = "Provide a moderate summary (~1 paragraph).";
    } else if (opts.length === "long") {
      lengthInstruction = "Provide a detailed summary (~3-5 paragraphs).";
    }

    const customPrompts = [];
    if (opts.tone) customPrompts.push(`Write in a ${opts.tone} tone.`);
    if (opts.focusOn) customPrompts.push(`Focus especially on ${opts.focusOn}.`);

    const userPrompt =
      `Summarize the following document in Markdown format.\n` +
      `${lengthInstruction}\n` +
      `${customPrompts.join("\n")}\n\n` +
      `Document:\n${text}`;


    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature,
        messages: [
          { role: "system", content: "You are a precise assistant that produces faithful, concise summaries." },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => "");
      return { ok: false, error: `OpenAI error: ${res.status} ${err}` };
    }

    const json = await res.json();
    const content = json?.choices?.[0]?.message?.content?.trim() || "";
    return { ok: true, summary: content };
  } catch (e) {
    return { ok: false, error: e?.message || "Summarization failed." };
  }
}
