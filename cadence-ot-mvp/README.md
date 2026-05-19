# Cadence Outpatient OT MVP

Cadence is a Next.js MVP for an outpatient occupational therapy documentation copilot. It is intentionally scoped as an EMR-adjacent layer: generate a defensible note, map evidence back to goals, flag billing/compliance risk, and copy the result into the clinic's existing EMR.

## What is built

- Client chart with auth burn-down, pending-note risk, active goals, and recent sessions.
- Note copilot that accepts messy typed or pasted session notes.
- Local prototype note engine for SOAP, DAP, or narrative output.
- Evidence-linked goal updates that avoid marking progress unless the raw note supports it.
- Billing review with timed-code unit math, CPT rationale, ICD-10 suggestions, and OT modifier reminders.
- Compliance linting for missing objective data, weak skilled-intervention language, weak functional linkage, missing pediatric caregiver handoff, Cigna timed-code risk, and auth risk.
- Reauthorization packet starter with goal evidence and medical-necessity language.
- Competitor and MVP strategy screens based on current public research.

## Run locally

From this folder:

```powershell
npm install
npm run dev -- -p 4173
```

Then open:

```text
http://localhost:4173/
```

Production build check:

```powershell
npm run build
```

The original static prototype remains in `index.html` as a reference artifact, but the active app now lives in `app/page.tsx` and `app/globals.css`.

## Important scope notes

This MVP does not send data to an AI provider. The generated output is created by local deterministic JavaScript so it can be tested safely with fake data and without credentials.

Production would replace the local generator with a HIPAA/BAA-backed model service, add authentication, audit logs, encryption, user/clinic settings, consent workflow, transcript-retention controls, and EMR-specific copy or integration adapters.

The billing output is advisory. A therapist or biller must review final codes, units, modifiers, payer rules, and diagnosis mapping before submission.

## Suggested first pilot

Use five to ten outpatient OTs across one or two clinics. For each session:

1. Therapist dictates or pastes an anonymized real session recap.
2. Cadence generates the note and flags.
3. Therapist edits until submit-ready.
4. Measure draft-to-final edit time, accepted goal updates, compliance flags resolved, and whether the note was signed same day.
5. Ask whether copy/paste into the EMR is enough for daily use before deeper integration.

Success threshold: median review time below 3 minutes, accepted goal updates above 70%, and same-day note completion meaningfully better than baseline.
