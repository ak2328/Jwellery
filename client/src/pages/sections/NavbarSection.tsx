import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/lib/CartContext";

export const NavbarSection = (): JSX.Element => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const linkStyle = (active = false) => ({
    fontFamily: "'Manrope', sans-serif",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "#1d1c12",
    textDecoration: "none",
    opacity: active ? 1 : 0.55,
    transition: "opacity 0.2s",
    cursor: "pointer",
  });

  const isCollection = location === "/collection";
  const isBespoke = location === "/bespoke";
  const isArchive = location === "/archive";
  const isContact = location === "/contact";

  const navLinks = [
    { href: "/collection", label: "Collection", active: isCollection },
    { href: "/bespoke", label: "Bespoke", active: isBespoke },
    { href: "/archive", label: "The Archive", active: isArchive },
    { href: "/#story", label: "The Story", active: false },
    { href: "#", label: "Journal", active: false },
    { href: "/contact", label: "Contact", active: isContact },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: "80px",
          background: scrolled ? "rgba(254,249,233,0.96)" : "#fef9e9",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(29,28,18,0.08)" : "none",
          transition: "all 0.3s",
        }}
      >
        {/* ── LEFT NAV (hidden on mobile) ─────────────────── */}
        <nav
          className="hidden md:flex"
          style={{ display: undefined, alignItems: "center", gap: "32px" }}
        >
          <a
            href="/collection"
            data-testid="link-nav-collection"
            style={linkStyle(isCollection)}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = isCollection ? "1" : "0.55")}
          >
            Collection
          </a>
          <a
            href="/bespoke"
            data-testid="link-nav-bespoke"
            style={linkStyle(isBespoke)}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = isBespoke ? "1" : "0.55")}
          >
            Bespoke
          </a>
          <a
            href="/archive"
            data-testid="link-nav-archive"
            style={linkStyle(isArchive)}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = isArchive ? "1" : "0.55")}
          >
            The Archive
          </a>
        </nav>

        {/* ── CENTERED LOGO ───────────────────────────────── */}
        <a
          href="/"
          data-testid="link-logo"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            height: "100%",
            textDecoration: "none",
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 1,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateX(-50%) scale(1.04)";
            const img = e.currentTarget.querySelector("img");
            const span = e.currentTarget.querySelector("span");
            if (img) img.style.boxShadow = "0px 6px 20px rgba(168, 132, 44, 0.28)";
            if (span) span.style.textShadow = "0px 2px 6px rgba(168, 132, 44, 0.25)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateX(-50%) scale(1)";
            const img = e.currentTarget.querySelector("img");
            const span = e.currentTarget.querySelector("span");
            if (img) img.style.boxShadow = "0px 4px 14px rgba(168, 132, 44, 0.16)";
            if (span) span.style.textShadow = "0px 1px 3px rgba(168, 132, 44, 0.15)";
          }}
        >
          <img
            src="/logo.png"
            alt="Mani D'Oro Monogram"
            style={{
              height: "44px",
              width: "44px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid rgba(168, 132, 44, 0.55)",
              boxShadow: "0px 4px 14px rgba(168, 132, 44, 0.16)",
              transition: "box-shadow 0.3s ease",
            }}
          />
          <span
            className="hidden sm:inline"
            style={{
              fontFamily: "'Noto Serif', Georgia, serif",
              fontSize: "20px",
              fontWeight: 400,
              letterSpacing: "0.03em",
              color: "#1d1c12",
              lineHeight: 1,
              textShadow: "0px 1px 3px rgba(168, 132, 44, 0.15)",
              transition: "text-shadow 0.3s ease",
            }}
          >
            Mani D&apos;Oro
          </span>
        </a>

        {/* ── RIGHT NAV (hidden on mobile) ────────────────── */}
        <nav
          className="hidden md:flex"
          style={{ display: undefined, alignItems: "center", gap: "32px" }}
        >
          <a
            href="/#story"
            data-testid="link-nav-the-story"
            style={linkStyle()}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.55")}
          >
            The Story
          </a>
          <a
            href="#"
            data-testid="link-nav-journal"
            style={linkStyle()}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.55")}
          >
            Journal
          </a>
          <a
            href="/contact"
            data-testid="link-nav-contact"
            style={linkStyle(isContact)}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = isContact ? "1" : "0.55")}
          >
            Contact
          </a>

          {/* Cart icon — desktop */}
          <button
            onClick={openCart}
            aria-label={`Open cart${totalItems > 0 ? `, ${totalItems} items` : ""}`}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: totalItems > 0 ? "#795900" : "rgba(29,28,18,0.55)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#795900")}
            onMouseLeave={(e) => (e.currentTarget.style.color = totalItems > 0 ? "#795900" : "rgba(29,28,18,0.55)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: "16px",
                  height: "16px",
                  background: "#c9a84c",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#fef9e9",
                  lineHeight: 1,
                  animation: "cartBadgePop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* ── HAMBURGER + CART (mobile only) ─────────────────────── */}
        <div className="flex md:hidden" style={{ display: undefined, alignItems: "center", gap: "8px", marginLeft: "auto" }}>
          {/* Cart icon — mobile */}
          <button
            onClick={openCart}
            aria-label={`Open cart${totalItems > 0 ? `, ${totalItems} items` : ""}`}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: totalItems > 0 ? "#795900" : "rgba(29,28,18,0.55)",
              transition: "color 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: "16px",
                  height: "16px",
                  background: "#c9a84c",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#fef9e9",
                  lineHeight: 1,
                }}
              >
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-testid="btn-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          className="flex md:hidden"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "5px",
            zIndex: 2,
          }}
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#1d1c12",
              transition: "all 0.3s",
              transformOrigin: "center",
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#1d1c12",
              transition: "all 0.3s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#1d1c12",
              transition: "all 0.3s",
              transformOrigin: "center",
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }}
          />
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ───────────────────────────────────── */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          top: "80px",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 49,
          background: "#fef9e9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          opacity: menuOpen ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
          pointerEvents: menuOpen ? "auto" : "none",
          overflowY: "auto",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0", width: "100%" }}>
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: "clamp(26px, 6vw, 36px)",
                fontWeight: 400,
                fontStyle: link.active ? "italic" : "normal",
                letterSpacing: "-0.01em",
                color: link.active ? "#795900" : "#1d1c12",
                textDecoration: "none",
                padding: "18px 40px",
                width: "100%",
                textAlign: "center",
                borderBottom: i < navLinks.length - 1 ? "1px solid rgba(29,28,18,0.07)" : "none",
                transition: "color 0.2s, background 0.2s",
                opacity: 0,
                animation: menuOpen ? `fadeInLink 0.4s ease ${i * 0.06}s forwards` : "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(29,28,18,0.03)"; e.currentTarget.style.color = "#795900"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = link.active ? "#795900" : "#1d1c12"; }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(29,28,18,0.3)" }}>
            Milano — Via della Spiga 12
          </p>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.1em", color: "rgba(29,28,18,0.3)" }}>
            commissions@manidoro.it
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInLink {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cartBadgePop {
          0%   { transform: scale(0); }
          70%  { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
        @media (min-width: 768px) {
          .hidden.md\\:flex { display: flex !important; }
          .flex.md\\:hidden { display: none !important; }
        }
      `}</style>
    </>
  );
};
