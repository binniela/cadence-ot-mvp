"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cadence_demo_onboarded";

export function Onboarding() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="onboarding-overlay" onClick={dismiss}>
      <div className="onboarding-modal" onClick={(e) => e.stopPropagation()}>
        <div>
          <span className="onboarding-logo">Cadence</span>
          <p className="onboarding-sub">Your private demo workspace</p>
        </div>

        <p className="onboarding-intro">
          Cadence is set up for de-identified demo use. Start with initials or
          a local label, keep direct identifiers out of the recap, then copy the
          generated note into the system your district already uses.
        </p>

        <div className="onboarding-steps">
          <div className="onboarding-step">
            <span className="onboarding-step__num">01</span>
            <div>
              <strong>Composer</strong>
              <p>
                Hit <em>Try an example →</em> then <em>Generate note →</em> to
                see AI documentation in action. You get 2 AI generations.
              </p>
            </div>
          </div>
          <div className="onboarding-step">
            <span className="onboarding-step__num">02</span>
            <div>
              <strong>Students</strong>
              <p>
                Add local labels and goals only when you want saved notes to
                become evidence for later progress reporting.
              </p>
            </div>
          </div>
          <div className="onboarding-step">
            <span className="onboarding-step__num">03</span>
            <div>
              <strong>Quarterly</strong>
              <p>
                See how session evidence accumulates per IEP goal, then draft a
                progress narrative with one click.
              </p>
            </div>
          </div>
        </div>

        <button className="onboarding-cta" onClick={dismiss}>
          Start exploring →
        </button>
      </div>
    </div>
  );
}
