import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSessionId, verifyStudentSession } from "@/lib/session";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: studentId } = await params;
    const sessionId = getSessionId(req);

    if (!(await verifyStudentSession(studentId, sessionId))) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const { color } = await req.json();
    if (!color || !HEX_RE.test(color)) {
      return NextResponse.json({ error: "Invalid color" }, { status: 400 });
    }

    await supabaseAdmin
      .from("students")
      .update({ avatar_url: color })
      .eq("id", studentId);

    return NextResponse.json({ color });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown" },
      { status: 500 },
    );
  }
}
