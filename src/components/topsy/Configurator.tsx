"use client";

import { useMemo, useState } from "react";
import { useCart, lineKey, type CartOption } from "@/lib/cart/store";
import { formatCents } from "@/lib/price";
import { localize, type MenuItem, type OptionGroup } from "@/lib/api/menu";
import Photo from "./Photo";

function constraintLabel(group: OptionGroup): string {
  if (group.max_select === 1) return "Choisissez-en 1";
  return `Choisissez-en ${group.min_select}–${group.max_select}`;
}

export default function Configurator({
  item,
  locale,
  onClose,
}: {
  item: MenuItem;
  locale: string;
  onClose: () => void;
}) {
  const add = useCart((s) => s.add);
  const name = localize(item, "name", locale);
  const description = localize(item, "description", locale);
  const groups = [...item.option_groups].sort((a, b) => a.position - b.position);

  // selected option ids per group id
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function toggle(group: OptionGroup, optionId: string) {
    setSelected((prev) => {
      const current = prev[group.id] ?? [];
      if (group.max_select === 1) {
        return { ...prev, [group.id]: [optionId] };
      }
      if (current.includes(optionId)) {
        return { ...prev, [group.id]: current.filter((id) => id !== optionId) };
      }
      if (current.length >= group.max_select) return prev;
      return { ...prev, [group.id]: [...current, optionId] };
    });
  }

  const chosen: CartOption[] = useMemo(() => {
    const out: CartOption[] = [];
    for (const group of groups) {
      const ids = selected[group.id] ?? [];
      for (const opt of group.options) {
        if (ids.includes(opt.id)) {
          out.push({ id: opt.id, name: localize(opt, "name", locale), price_cents: opt.price_cents });
        }
      }
    }
    return out;
  }, [groups, selected, locale]);

  const unitPriceCents = item.price_cents + chosen.reduce((sum, o) => sum + o.price_cents, 0);

  const valid = groups.every((group) => {
    const count = (selected[group.id] ?? []).length;
    return count >= group.min_select && count <= group.max_select;
  });

  function onAdd() {
    if (!valid) return;
    const optionIds = chosen.map((o) => o.id);
    add({
      key: lineKey(item.id, optionIds),
      itemId: item.id,
      slug: item.slug,
      name,
      basePriceCents: item.price_cents,
      options: chosen,
      qty,
      unitPriceCents,
      imageUrl: item.image_url,
    });
    setAdded(true);
    setTimeout(onClose, 450);
  }

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal modal--config" onClick={(e) => e.stopPropagation()}>
        <div className="config__media">
          <Photo imageUrl={item.image_url} alt={`photo · ${name}`} />
          <button className="icon-btn config__close" onClick={onClose} aria-label="Fermer">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="modal__body config__body">
          <h3 className="config__name">{name}</h3>
          {description && <p className="config__desc">{description}</p>}

          {groups.map((group) => {
            const ids = selected[group.id] ?? [];
            const single = group.max_select === 1;
            return (
              <section className="optgroup" key={group.id}>
                <div className="optgroup__head">
                  <h4 className="optgroup__title">{localize(group, "name", locale)}</h4>
                  <span className="optgroup__rule">
                    {constraintLabel(group)}
                    {group.min_select > 0 && <em className="optgroup__req"> · Obligatoire</em>}
                  </span>
                </div>
                <div className="optgroup__list">
                  {group.options.map((opt) => {
                    const checked = ids.includes(opt.id);
                    const disabled = !opt.available || (!single && !checked && ids.length >= group.max_select);
                    return (
                      <label
                        key={opt.id}
                        className={`optrow${checked ? " is-on" : ""}${disabled ? " is-off" : ""}`}
                      >
                        <input
                          type={single ? "radio" : "checkbox"}
                          name={group.id}
                          checked={checked}
                          disabled={disabled}
                          onChange={() => toggle(group, opt.id)}
                        />
                        <span className="optrow__name">{localize(opt, "name", locale)}</span>
                        {opt.price_cents > 0 && (
                          <span className="optrow__price">+{formatCents(opt.price_cents)}</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <div className="modal__foot config__foot">
          <div className="qty qty--lg">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="moins">
              –
            </button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="plus">
              +
            </button>
          </div>
          <button
            className={`btn btn--primary config__add${added ? " add-btn--on" : ""}`}
            disabled={!valid || added}
            onClick={onAdd}
          >
            {added ? "ajouté ✓" : `ajouter · ${formatCents(unitPriceCents * qty)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
