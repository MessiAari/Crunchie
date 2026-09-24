"use client";

import { useToast } from "@/hooks/useToast";

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div id="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.show ? "show" : ""}`}>
          <span className="tk">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="m5 13 4 4L19 7" />
            </svg>
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
