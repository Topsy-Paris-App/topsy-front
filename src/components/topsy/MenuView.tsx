"use client";

import { useEffect, useState } from "react";
import { localize, type Category } from "@/lib/api/menu";
import DishCard from "./DishCard";
import CreneauBar from "./CreneauBar";

export default function MenuView({ categories, locale }: { categories: Category[]; locale: string }) {
  const visible = categories.filter((c) => c.active && c.items.some((i) => i.is_available));
  const [active, setActive] = useState(visible[0]?.id ?? null);

  useEffect(() => {
    const onScroll = () => {
      let current = visible[0]?.id ?? null;
      for (const c of visible) {
        const el = document.getElementById(`cat-${c.id}`);
        if (el && el.getBoundingClientRect().top <= 180) current = c.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  const goCat = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 150, behavior: "smooth" });
  };

  return (
    <div className="menu-page">
      <div className="menu-head">
        <div className="menu-head__inner">
          <h1 className="menu-head__title">la carte</h1>
          <CreneauBar />
        </div>
      </div>

      <nav className="catnav">
        <div className="catnav__inner">
          {visible.map((c) => (
            <button
              key={c.id}
              className={`catnav__link${active === c.id ? " is-active" : ""}`}
              onClick={() => goCat(c.id)}
            >
              {localize(c, "name", locale)}
            </button>
          ))}
        </div>
      </nav>

      <div className="menu-body">
        {visible.map((c) => {
          const dishes = c.items.filter((i) => i.is_available);
          return (
            <section className="cat" id={`cat-${c.id}`} key={c.id}>
              <h2 className="cat__title">{localize(c, "name", locale)}</h2>
              <div className="dish-grid">
                {dishes.map((item) => (
                  <DishCard key={item.id} item={item} locale={locale} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
