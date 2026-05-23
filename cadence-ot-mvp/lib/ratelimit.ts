import "server-only";
import { supabaseAdmin } from "./supabase";

const DAILY_LIMIT = 2;

export async function checkRateLimit(ip: string): Promise<boolean> {
  const today = new Date().toISOString().slice(0, 10);

  const { data } = await supabaseAdmin
    .from("api_usage")
    .select("count")
    .eq("ip", ip)
    .eq("date", today)
    .maybeSingle();

  const count = data?.count ?? 0;
  if (count >= DAILY_LIMIT) return false;

  if (data) {
    await supabaseAdmin
      .from("api_usage")
      .update({ count: count + 1 })
      .eq("ip", ip)
      .eq("date", today);
  } else {
    await supabaseAdmin
      .from("api_usage")
      .insert({ ip, date: today, count: 1 });
  }

  return true;
}
