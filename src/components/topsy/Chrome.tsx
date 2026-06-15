"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useCart, subtotalCents, count as countItems } from "@/lib/cart/store";
import { formatCents } from "@/lib/price";
import { UIContext } from "./ui-context";
import Stars from "./Stars";
import BogolanBand from "./BogolanBand";
import CartDrawer from "./CartDrawer";
import CreneauModal from "./CreneauModal";

const NAV: [string, string][] = [
  ["accueil", "/"],
  ["la carte", "/menu"],
  ["traiteur", "/traiteur"],
  ["livraison", "/livraison"],
  ["avis", "/avis"],
  ["contact", "/contact"],
];

const RATING = 4.75;

function LangSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = (useParams().locale as string) ?? "fr";
  return (
    <span className="lang">
      <span
        role="button"
        tabIndex={0}
        style={{ cursor: "pointer" }}
        onClick={() => router.replace(pathname, { locale: "fr" })}
        className={locale === "fr" ? "" : "lang__off"}
      >
        FR
      </span>
      <span className="lang__sep">/</span>
      <span
        role="button"
        tabIndex={0}
        style={{ cursor: "pointer" }}
        onClick={() => router.replace(pathname, { locale: "en" })}
        className={locale === "en" ? "" : "lang__off"}
      >
        EN
      </span>
    </span>
  );
}

function Header({
  onCart,
  onMenu,
  cartCount,
}: {
  onCart: () => void;
  onMenu: () => void;
  cartCount: number;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const accountHref = user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/auth/login";
  const here = (p: string) => (p === "/" ? pathname === "/" : pathname.startsWith(p));
  return (
    <>
      <div className="topbar">
        <span>Livraison IDF dès 45 €</span>
        <span className="topbar__dot" />
        <span>Retrait à La Courneuve</span>
        <span className="topbar__dot" />
        <span className="topbar__rating">
          <Stars value={RATING} size={13} /> 4,75/5
        </span>
      </div>
      <header className="site-header">
        <Link className="brand" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Topsy Paris" className="brand__logo" />
          <span className="brand__wordmark">
            topsy <em>paris</em>
          </span>
        </Link>
        <nav className="nav">
          {NAV.map(([label, to]) => (
            <Link key={to} href={to} className={`nav__link${here(to) ? " is-here" : ""}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header__actions">
          <LangSwitch />
          <Link className="icon-btn" href={accountHref} aria-label="Mon compte">
            <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="3.4" />
              <path d="M5 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5" />
            </svg>
          </Link>
          <button className="icon-btn cart-btn" onClick={onCart} aria-label="Panier">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.5-1.2L22 8H6" />
              <circle cx="9.5" cy="20.5" r="1.4" />
              <circle cx="18.5" cy="20.5" r="1.4" />
            </svg>
            {cartCount > 0 && <span className="cart-btn__count">{cartCount}</span>}
          </button>
          <Link className="btn btn--primary header__cta" href="/menu">
            commander
          </Link>
          <button className="burger" onClick={onMenu} aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  return (
    <div className="mobile-menu">
      <div className="mobile-menu__top">
        <span className="brand__wordmark">
          topsy <em>paris</em>
        </span>
        <button className="icon-btn" onClick={onClose} aria-label="Fermer">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <nav>
        {NAV.map(([label, to]) => (
          <Link key={to} href={to} onClick={onClose}>
            {label}
          </Link>
        ))}
        <Link href="/a-propos" onClick={onClose}>
          qui sommes-nous
        </Link>
        <Link href={user ? "/dashboard" : "/auth/login"} onClick={onClose}>
          espace client
        </Link>
        {user?.role === "admin" && (
          <Link href="/admin" onClick={onClose}>
            espace resto
          </Link>
        )}
      </nav>
      <Link href="/menu" className="btn btn--primary mobile-menu__cta" onClick={onClose}>
        commander
      </Link>
    </div>
  );
}

function CartBar({ onOpen, count, subtotal }: { onOpen: () => void; count: number; subtotal: number }) {
  return (
    <button className="cartbar" onClick={onOpen}>
      <span className="cartbar__count">{count}</span>
      <span className="cartbar__label">voir le panier</span>
      <span className="cartbar__total">{formatCents(subtotal)}</span>
    </button>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <BogolanBand height={20} />
      <div className="footer__main">
        <div className="footer__col footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Topsy Paris" className="footer__logo" />
          <p className="footer__tag">
            Cuisine camerounaise familiale, fondée par deux sœurs. Fait maison, halal, bio &amp; frais.
          </p>
          <span className="footer__chip">
            <Stars value={RATING} size={14} /> 4,75/5
          </span>
        </div>
        <div className="footer__col">
          <h4>Commander</h4>
          <Link href="/menu">La carte</Link>
          <Link href="/traiteur">Traiteur</Link>
          <Link href="/livraison">Livraison &amp; retrait</Link>
          <Link href="/avis">Avis</Link>
        </div>
        <div className="footer__col">
          <h4>La maison</h4>
          <Link href="/a-propos">Qui sommes-nous</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/dashboard">Espace client</Link>
        </div>
        <div className="footer__col">
          <h4>Infos</h4>
          <p>10–12 mail de l&apos;Égalité, 93120 La Courneuve</p>
          <p>07 87 75 96 10</p>
          <p>Mar–Sam 11h–21h · Dim 11h–14h</p>
        </div>
      </div>
      <div className="footer__legal">
        <span>© {new Date().getFullYear()} Topsy Paris</span>
        <span className="footer__legal-links">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/cgv">CGV</Link>
          <Link href="/confidentialite">Confidentialité</Link>
          <Link href="/cookies">Cookies</Link>
        </span>
      </div>
    </footer>
  );
}

export default function Chrome({ children }: { children: React.ReactNode }) {
  const [drawer, setDrawer] = useState(false);
  const [creneauOpen, setCreneauOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCart((s) => s.items);
  const pathname = usePathname();
  const count = countItems(items);
  const subtotal = subtotalCents(items);

  useEffect(() => {
    setDrawer(false);
    setMenuOpen(false);
  }, [pathname]);

  const onCheckoutFlow = pathname.startsWith("/checkout") || pathname === "/panier";

  return (
    <UIContext.Provider value={{ openDrawer: () => setDrawer(true), openCreneau: () => setCreneauOpen(true) }}>
      <div className="page">
        <Header onCart={() => setDrawer(true)} onMenu={() => setMenuOpen(true)} cartCount={count} />
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
        <main>{children}</main>
        <Footer />
      </div>
      {count > 0 && !onCheckoutFlow && <CartBar onOpen={() => setDrawer(true)} count={count} subtotal={subtotal} />}
      <CartDrawer open={drawer} onClose={() => setDrawer(false)} />
      <CreneauModal open={creneauOpen} onClose={() => setCreneauOpen(false)} />
    </UIContext.Provider>
  );
}
