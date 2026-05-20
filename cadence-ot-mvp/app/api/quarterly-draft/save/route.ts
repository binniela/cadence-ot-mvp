import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Persists an edited quarterly draft paragraph back to the goal row.
export async function POST(req: NextRequest) {
  try {
    const { goalId, paragraph } = await req.json();
    if (!goalId) {
      return NextResponse.json({ error: "goalId required" }, { status: 400 });
    }
    const { error } = await supabaseAdmin
      .from("iep_goals")
      .update({ draft_paragraph: paragraph ?? null })
      .eq("id", goalId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
