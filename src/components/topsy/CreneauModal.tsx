"use client";

import { useEffect, useState } from "react";
import {
  useCart,
  nextDays,
  SLOTS_MIDI,
  SLOTS_SOIR,
  type CreneauMode,
} from "@/lib/cart/store";

export default function CreneauModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const creneau = useCart((s) => s.creneau);
  const setCreneau = useCart((s) => s.setCreneau);
  const [mode, setMode] = useState<CreneauMode>(creneau.mode);
  const [date, setDate] = useState<string | null>(creneau.date);
  const [time, setTime] = useState<string | null>(creneau.time);
  const days = nextDays(8);

  useEffect(() => {
    if (open) {
      setMode(creneau.mode);
      setDate(creneau.date);
      setTime(creneau.time);
    }
  }, [open, creneau]);

  if (!open) return null;

  function confirm() {
    const day = days.find((d) => d.iso === date);
    setCreneau({ mode, date, time, dateLabel: day ? day.label : null });
    onClose();
  }

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal modal--creneau" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <h3>votre créneau</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Fermer">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="modal__body">
          <div className="seg">
            <button className={mode === "livraison" ? "is-on" : ""} onClick={() => setMode("livraison")}>
              Livraison
            </button>
            <button className={mode === "retrait" ? "is-on" : ""} onClick={() => setMode("retrait")}>
              Retrait
            </button>
          </div>
          <p className="modal__hint">
            Service Mar–Sam 11h–21h · Dim 11h–14h. Précommande conseillée la veille.
          </p>
          <h4 className="modal__sub">Date</h4>
          <div className="chips">
            {days.map((d) => (
              <button
                key={d.iso}
                className={`chip${date === d.iso ? " is-on" : ""}`}
                onClick={() => setDate(d.iso)}
              >
                {d.label}
              </button>
            ))}
          </div>
          <h4 className="modal__sub">Heure</h4>
          <div className="slots-group">
            <span>Midi</span>
            <div className="chips">
              {SLOTS_MIDI.map((t) => (
                <button key={t} className={`chip${time === t ? " is-on" : ""}`} onClick={() => setTime(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="slots-group">
            <span>Soir</span>
            <div className="chips">
              {SLOTS_SOIR.map((t) => (
                <button key={t} className={`chip${time === t ? " is-on" : ""}`} onClick={() => setTime(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="modal__foot">
          <button className="btn btn--primary" disabled={!date || !time} onClick={confirm}>
            valider le créneau
          </button>
        </div>
      </div>
    </div>
  );
}
