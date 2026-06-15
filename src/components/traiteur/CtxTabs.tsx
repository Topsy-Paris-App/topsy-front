"use client";

import { useState } from "react";
import { TRAITEUR_CONTEXTS } from "@/content/traiteur";

export default function CtxTabs() {
  const [ctx, setCtx] = useState(TRAITEUR_CONTEXTS[0].id);
  return (
    <div className="ctx-tabs">
      {TRAITEUR_CONTEXTS.map((c) => (
        <button
          key={c.id}
          className={`ctx-tab${ctx === c.id ? " is-on" : ""}`}
          onClick={() => setCtx(c.id)}
        >
          <span className="ctx-tab__label">{c.label}</span>
          <span className="ctx-tab__desc">{c.desc}</span>
        </button>
      ))}
    </div>
  );
}
