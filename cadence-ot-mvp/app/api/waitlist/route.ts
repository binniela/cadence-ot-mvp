import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email, role } = await req.json();
    const clean = typeof email === "string" ? email.toLowerCase().trim() : "";

    if (!clean || !EMAIL_RE.test(clean)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("waitlist")
      .insert({ email: clean, role: role ?? null });

    if (error?.code === "23505") {
      // Already on the list — return success so we don't leak existence
      return NextResponse.json({ ok: true });
    }
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const { count } = await supabaseAdmin
    .from("waitlist")
    .select("*", { count: "exact", head: true });
  return NextResponse.json({ count: count ?? 0 });
}
