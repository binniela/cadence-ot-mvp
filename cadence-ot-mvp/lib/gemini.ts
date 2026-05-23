import "server-only";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY not set in .env.local");
}

export const gemini = new GoogleGenAI({ apiKey });
export const MODEL = "gemini-2.5-flash";

// Parse Gemini SDK errors (which sometimes wrap an inner JSON-stringified error)
// into a clean human-readable message.
export function geminiErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  try {
    const m = raw.match(/\{[\s\S]*\}/);
    if (m) {
      const parsed = JSON.parse(m[0]);
      const inner = parsed.error ?? parsed;
      if (inner.status === "RESOURCE_EXHAUSTED") {
        const retry = inner.details?.find(
          (d: { "@type"?: string; retryDelay?: string }) =>
            d["@type"]?.includes("RetryInfo"),
        )?.retryDelay;
        return `Gemini free-tier rate limit hit. ${retry ? `Retry in ${retry}.` : "Wait a minute and try again."}`;
      }
      if (inner.message) return inner.message;
    }
  } catch {
    // fall through
  }
  return raw;
}
