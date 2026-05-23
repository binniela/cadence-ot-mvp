# Cadence School OT MVP

Cadence is a Next.js MVP for school-based occupational therapists who need to finish daily documentation between sessions, often from a phone in the hallway, parking lot, or car. It is intentionally scoped as an EMR-adjacent layer: turn de-identified session recaps into defensible notes, flag documentation gaps, and copy the result into the district's existing EMR.

## What is built

- Quick-start note composer for on-the-fly, de-identified school OT documentation.
- Voice or typed post-session recap input.
- Gemini-generated SOAP, DAP, Goal-bullets, or Narrative notes.
- Identifier checks before AI generation for obvious DOB, ID, MRN, address, school, teacher, email, and phone patterns.
- Compliance flags and service-log fields for review before copying to the EMR.
- Optional student profiles and IEP goals.
- Saved session-note history by student.
- Downstream quarterly-progress drafting from saved note evidence when goals are linked.

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

This MVP sends de-identified note-generation requests to Gemini. Do not enter student names, DOB, IDs, MRNs, addresses, school names, teacher names, parent names, or rare identifying details unless the deployment has appropriate privacy, consent, and contracting controls in place.

Production would add authentication, audit logs, encryption, user/district settings, consent workflow, transcript-retention controls, provider privacy review, and EMR-specific copy or integration adapters.

The billing output is advisory. A therapist or biller must review final codes, units, modifiers, payer rules, and diagnosis mapping before submission.

## Suggested first pilot

Use five to ten school-based OTs across one or two schools or districts. For each session:

1. Therapist dictates or pastes an anonymized real session recap.
2. Cadence generates the note and flags.
3. Therapist edits until submit-ready.
4. Measure draft-to-final edit time, accepted goal updates, compliance flags resolved, and whether the note was signed same day.
5. Ask whether copy/paste into the EMR is enough for daily use before deeper integration.

Success threshold: median review time below 3 minutes, accepted goal updates above 70%, and same-day note completion meaningfully better than baseline.
