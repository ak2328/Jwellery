import { useState, useEffect, useRef } from "react";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";

interface ArchiveItem {
  id: string;
  title: string;
  year: string;
  materials: string;
  status: string;
  image: string;
  description: string;
  sort_order?: number;
}

const FALLBACK: ArchiveItem[] = [
  { id: "a1", year: "2024", title: "Solaris Torque", materials: "22k Yellow Gold, Colombian Emerald", status: "Private Collection", image: "/products/new-bar-pendant.jpg", description: "A sweeping collar of solid gold ribbons, each hand-rolled at 1,000°C." },
  { id: "a2", year: "2024", title: "Kishangarh Signet", materials: "18k Rose Gold, Burmese Ruby", status: "Acquired", image: "/products/new-fish-pendant.png", description: "A monumental signet ring bearing the atelier cipher." },
  { id: "a3", year: "2024", title: "Drift Cuff No.7", materials: "24k Pure Gold", status: "On Display", image: "/products/new-bracelet.png", description: "Seventh in the molten drift series — the widest ever cast." },
  { id: "a4", year: "2023", title: "Nebula Pendant", materials: "18k Gold, White Diamond", status: "Acquired", image: "/products/new-fish-pendant.png", description: "Inspired by the cosmic dust rings of the Orion nebula." },
  { id: "a5", year: "2023", title: "Lumière Chain", materials: "22k Yellow Gold", status: "Private Collection", image: "/products/new-bar-pendant.jpg", description: "A 90cm opera chain of individually hammered links." },
  { id: "a6", year: "2023", title: "Vesper Bangle", materials: "22k Gold, Sapphire", status: "On Display", image: "/products/new-bracelet.png", description: "A twilight-inspired bangle with a hidden sapphire clasp." },
  { id: "a7", year: "2022", title: "Aura Band", materials: "18k Gold, Pink Sapphire", status: "Acquired", image: "/products/new-bracelet.png", description: "A statement band inspired by the solar corona." },
  { id: "a8", year: "2022", title: "Eclipse Ring", materials: "22k Gold, Black Diamond", status: "Private Collection", image: "/products/new-fish-pendant.png", description: "Black diamond set in an eclipse-phase gold bezel." },
  { id: "a9", year: "2022", title: "Meridian Necklace", materials: "22k Gold", status: "On Display", image: "/products/new-bar-pendant.jpg", description: "A cartographic interpretation of the prime meridian in gold." },
];

const statusColor = (s: string) => {
  if (s === "Acquired") return { bg: "rgba(201,168,76,0.2)", text: "#c9a84c", border: "rgba(201,168,76,0.5)" };
  if (s === "On Display") return { bg: "rgba(74,124,89,0.2)", text: "#6bc47d", border: "rgba(74,124,89,0.5)" };
  return { bg: "rgba(254,249,233,0.08)", text: "rgba(254,249,233,0.7)", border: "rgba(254,249,233,0.2)" };
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function ArchiveCard({ item, delay }: { item: ArchiveItem; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const sc = statusColor(item.status);
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        aspectRatio: "3/4",
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.12)"}`,
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s, border-color 0.3s`,
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        onContextMenu={e => e.preventDefault()}
        draggable={false}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          userSelect: "none", pointerEvents: "none",
        }}
      />
      {/* Transparent copy-protection overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }} onContextMenu={e => e.preventDefault()} />

      {/* Gradient overlay (always visible at bottom) */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
        background: "linear-gradient(to top, rgba(13,12,7,0.95) 0%, rgba(13,12,7,0.4) 50%, transparent 100%)",
        zIndex: 2,
      }} />

      {/* Content overlay */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px",
        zIndex: 3, display: "flex", flexDirection: "column", gap: 8,
        transform: hovered ? "translateY(0)" : "translateY(12px)",
        opacity: hovered ? 1 : 0.7,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3 style={{
            fontFamily: "'Noto Serif', Georgia, serif", fontSize: "clamp(16px, 1.5vw, 20px)",
            color: "#fef9e9", fontWeight: 400, margin: 0, lineHeight: 1.2,
          }}>{item.title}</h3>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "3px 8px", whiteSpace: "nowrap",
            background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
            fontFamily: "'Manrope', sans-serif",
          }}>{item.status}</span>
        </div>

        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: 11, color: "rgba(254,249,233,0.5)",
          margin: 0, letterSpacing: "0.08em",
        }}>{item.materials}</p>

        {/* Description - only visible on hover */}
        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: 11, color: "rgba(254,249,233,0.4)",
          margin: 0, lineHeight: 1.5,
          maxHeight: hovered ? 60 : 0, overflow: "hidden",
          opacity: hovered ? 1 : 0,
          transition: "max-height 0.5s ease, opacity 0.4s ease 0.1s",
        }}>{item.description}</p>
      </div>
    </div>
  );
}

export const ArchivePage = (): JSX.Element => {
  const [items, setItems] = useState<ArchiveItem[]>(FALLBACK);
  const heroVis = useInView(0.1);
  const quoteVis = useInView(0.3);
  const ctaVis = useInView(0.3);

  useEffect(() => {
    (async () => {
      try {
        const { supabase } = await import("../lib/supabase");
        const { data, error } = await supabase
          .from("archive_items")
          .select("*")
          .order("sort_order", { ascending: true });
        if (!error && data && data.length > 0) {
          setItems(data as ArchiveItem[]);
        }
      } catch {
        // fallback already set
      }
    })();
  }, []);

  // Group by year descending
  const years = Array.from(new Set(items.map(i => i.year))).sort((a, b) => Number(b) - Number(a));

  return (
    <div style={{ minHeight: "100vh", background: "#13120a", color: "#fef9e9" }}>
      <style>{`
        @keyframes archFadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes archFadeLine { from { width: 0; } to { width: 120px; } }
        @keyframes archPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
      `}</style>

      {/* Navbar (with forced dark background override via wrapper) */}
      <div style={{ position: "relative", zIndex: 50 }}>
        <NavbarSection />
      </div>

      {/* ═══════════════════════════════════════════════════════════
           HERO
         ═══════════════════════════════════════════════════════════ */}
      <section
        ref={heroVis.ref}
        style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "120px 24px 80px", position: "relative",
        }}
      >
        {/* Subtle radial glow */}
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <span style={{
          fontFamily: "'Manrope', sans-serif", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.5em", textTransform: "uppercase",
          color: "rgba(201,168,76,0.5)", marginBottom: 32,
          opacity: heroVis.visible ? 1 : 0, transform: heroVis.visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.2s",
        }}>
          Mani D'Oro
        </span>

        <h1 style={{
          fontFamily: "'Noto Serif', Georgia, serif",
          fontSize: "clamp(48px, 10vw, 120px)", fontWeight: 400,
          letterSpacing: "-0.02em", lineHeight: 0.9,
          color: "#fef9e9", margin: "0 0 20px",
          opacity: heroVis.visible ? 1 : 0, transform: heroVis.visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s ease 0.4s",
        }}>
          The Archive
        </h1>

        <p style={{
          fontFamily: "'Noto Serif', Georgia, serif", fontStyle: "italic",
          fontSize: "clamp(14px, 2vw, 18px)", color: "rgba(254,249,233,0.4)",
          margin: "0 0 40px", letterSpacing: "0.15em",
          opacity: heroVis.visible ? 1 : 0,
          transition: "all 0.8s ease 0.7s",
        }}>
          2022 — Present
        </p>

        {/* Gold line */}
        <div style={{
          width: heroVis.visible ? 120 : 0, height: 1,
          background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
          margin: "0 auto 40px",
          transition: "width 1s ease 0.9s",
        }} />

        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: 13, lineHeight: 1.8,
          color: "rgba(254,249,233,0.35)", maxWidth: 520, margin: "0 auto",
          letterSpacing: "0.03em",
          opacity: heroVis.visible ? 1 : 0,
          transition: "all 0.8s ease 1.1s",
        }}>
          A curated chronicle of singular works that have passed through the atelier.
          Each piece — whether residing in a private collection, acquired by a patron,
          or held in our permanent exhibition — represents a chapter in the story of hand-forged gold.
        </p>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "archPulse 2.5s ease-in-out infinite",
        }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,168,76,0.4)" }}>Scroll</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1">
            <path d="M6 1v14M1 11l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           ARCHIVE GRID — grouped by year
         ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "40px 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
        {years.map((year, yi) => {
          const yearItems = items.filter(i => i.year === year);
          return (
            <div key={year} style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 0,
              marginBottom: yi < years.length - 1 ? 80 : 0,
            }}>
              {/* Year header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 24, marginBottom: 32,
                paddingBottom: 16, borderBottom: "1px solid rgba(201,168,76,0.1)",
              }}>
                <span style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 400,
                  color: "rgba(201,168,76,0.15)", lineHeight: 1, letterSpacing: "-0.02em",
                }}>{year}</span>
                <div style={{
                  flex: 1, height: 1,
                  background: "linear-gradient(90deg, rgba(201,168,76,0.2), transparent)",
                }} />
                <span style={{
                  fontFamily: "'Manrope', sans-serif", fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(254,249,233,0.25)",
                }}>{yearItems.length} {yearItems.length === 1 ? "piece" : "pieces"}</span>
              </div>

              {/* Cards grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 16,
              }}>
                {yearItems.map((item, idx) => (
                  <ArchiveCard key={item.id} item={item} delay={idx * 0.1} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* ═══════════════════════════════════════════════════════════
           PULL QUOTE
         ═══════════════════════════════════════════════════════════ */}
      <section
        ref={quoteVis.ref}
        style={{
          padding: "80px 24px 100px", textAlign: "center", maxWidth: 800, margin: "0 auto",
          position: "relative",
        }}
      >
        <div style={{
          width: quoteVis.visible ? 60 : 0, height: 1,
          background: "#c9a84c", margin: "0 auto 48px",
          transition: "width 0.8s ease 0.2s",
        }} />

        <blockquote style={{
          fontFamily: "'Noto Serif', Georgia, serif", fontStyle: "italic",
          fontSize: "clamp(20px, 3.5vw, 32px)", color: "rgba(254,249,233,0.6)",
          lineHeight: 1.5, margin: "0 0 32px", fontWeight: 400,
          letterSpacing: "-0.01em",
          opacity: quoteVis.visible ? 1 : 0, transform: quoteVis.visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s ease 0.4s",
        }}>
          "Every piece that leaves this atelier carries a fragment of the maker's soul
          — a fingerprint of fire, a whisper of the anvil."
        </blockquote>

        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(201,168,76,0.4)", margin: 0,
          opacity: quoteVis.visible ? 1 : 0,
          transition: "all 0.6s ease 0.8s",
        }}>
          — Alessandra Oro, Creative Director
        </p>

        <div style={{
          width: quoteVis.visible ? 60 : 0, height: 1,
          background: "#c9a84c", margin: "48px auto 0",
          transition: "width 0.8s ease 1s",
        }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════
           CTA
         ═══════════════════════════════════════════════════════════ */}
      <section
        ref={ctaVis.ref}
        style={{
          padding: "60px 24px 120px", textAlign: "center",
        }}
      >
        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: 12,
          color: "rgba(254,249,233,0.3)", letterSpacing: "0.15em",
          textTransform: "uppercase", marginBottom: 20,
          opacity: ctaVis.visible ? 1 : 0,
          transition: "all 0.6s ease 0.2s",
        }}>
          Inspired by our legacy?
        </p>

        <a
          href="/bespoke"
          style={{
            display: "inline-block", padding: "16px 48px",
            border: "1px solid rgba(201,168,76,0.5)", background: "transparent",
            color: "#c9a84c", textDecoration: "none",
            fontFamily: "'Manrope', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.25em", textTransform: "uppercase",
            transition: "all 0.3s",
            opacity: ctaVis.visible ? 1 : 0,
            transform: ctaVis.visible ? "translateY(0)" : "translateY(15px)",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#c9a84c"; e.currentTarget.style.color = "#13120a"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c9a84c"; }}
        >
          Commission a Piece
        </a>
      </section>

      <FooterSection />
    </div>
  );
};
