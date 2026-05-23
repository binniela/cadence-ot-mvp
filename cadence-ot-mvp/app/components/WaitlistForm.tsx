"use client";

import { useState } from "react";
import { Select } from "@/app/components/Select";

const ROLE_OPTIONS = [
  { value: "", label: "Role (optional)" },
  { value: "School-based OTR", label: "School-based OTR" },
  { value: "COTA working in schools", label: "COTA working in schools" },
  { value: "OT supervisor / program lead", label: "OT supervisor / program lead" },
  { value: "Other", label: "Other" },
];

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), role: role || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setSubmitted(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="waitlist__success-wrap">
        <p className="waitlist__success">You&rsquo;re on the list.</p>
        <p className="waitlist__note">
          We&rsquo;ll reach out when a spot opens — no spam, ever.
        </p>
      </div>
    );
  }

  return (
    <form className="waitlist__form" onSubmit={handleSubmit}>
      <div className="waitlist__row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="waitlist__input"
          required
          autoComplete="email"
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Joining…" : "Request access"}
        </button>
      </div>
      <Select
        value={role}
        onChange={setRole}
        options={ROLE_OPTIONS}
        className="cselect--light"
      />
      {err && <p className="waitlist__error">{err}</p>}
    </form>
  );
}
