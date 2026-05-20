"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseMicOptions {
  onTranscript: (text: string) => void;
}

function useMic({ onTranscript }: UseMicOptions) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recogRef = useRef<any>(null);
  const interimRef = useRef("");

  useEffect(() => {
    const SR =
      typeof window !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    setSupported(!!SR);
  }, []);

  const start = useCallback(() => {
    const SR =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r: any = new SR();
    r.lang = "en-US";
    r.continuous = true;
    r.interimResults = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    r.onresult = (e: any) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          final += t;
        } else {
          interim = t;
        }
      }
      interimRef.current = interim;
      if (final) onTranscript(final);
    };

    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);

    recogRef.current = r;
    r.start();
    setListening(true);
  }, [onTranscript]);

  const stop = useCallback(() => {
    recogRef.current?.stop();
    recogRef.current = null;
    setListening(false);
  }, []);

  const toggle = useCallback(() => {
    listening ? stop() : start();
  }, [listening, start, stop]);

  // Cleanup on unmount
  useEffect(() => () => { recogRef.current?.stop(); }, []);

  return { listening, supported, toggle };
}

interface MicButtonProps {
  onTranscript: (text: string) => void;
}

export function MicButton({ onTranscript }: MicButtonProps) {
  const { listening, supported, toggle } = useMic({ onTranscript });

  if (!supported) return null;

  return (
    <button
      type="button"
      className={`mic-btn${listening ? " mic-btn--active" : ""}`}
      onClick={toggle}
      title={listening ? "Stop recording" : "Tap to dictate"}
      aria-label={listening ? "Stop recording" : "Start voice dictation"}
    >
      <span className="mic-btn__icon">
        {listening ? (
          /* Stop / recording indicator */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="4" y="4" width="8" height="8" rx="1.5" fill="currentColor" />
          </svg>
        ) : (
          /* Mic icon */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="5.5" y="1" width="5" height="8" rx="2.5" fill="currentColor" />
            <path d="M3 7.5C3 10.538 5.239 13 8 13s5-2.462 5-5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="8" y1="13" x2="8" y2="15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="5.5" y1="15.5" x2="10.5" y2="15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className="mic-btn__label">
        {listening ? "Recording… tap to stop" : "Tap to dictate"}
      </span>
      {listening && <span className="mic-btn__pulse" />}
    </button>
  );
}
