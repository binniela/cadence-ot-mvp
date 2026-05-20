"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <p className="waitlist__success">
        You&rsquo;re on the list. Pilot invites go out in batches before Fall 2026.
      </p>
    );
  }

  return (
    <form className="waitlist__form" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@district.edu"
        className="waitlist__input"
        required
      />
      <button type="submit" className="btn-primary">Request access</button>
    </form>
  );
}
