import { useState, useEffect, useRef } from "react";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";

function useInView(threshold = 0.12) {
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

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}>{children}</div>
  );
}

interface JournalEntry {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
}

const ENTRIES: JournalEntry[] = [
  {
    id: "j1", title: "The Anatomy of a Hammered Patina",
    date: "March 2024", category: "Craft",
    excerpt: "Why every micro-dent in our gold tells a story that polished perfection never could. We explore the science behind our signature surface treatment — a process that transforms raw metal into living history.",
    image: "/products/new-bar-pendant.jpg", readTime: "6 min read",
  },
  {
    id: "j2", title: "Gold at 1,000°C: Inside the Kishangarh Foundry",
    date: "January 2024", category: "Atelier",
    excerpt: "A rare look inside the foundry where every Mani D'Oro piece begins its journey. The heat, the hands, the centuries-old techniques that modern machinery still cannot replicate.",
    image: "/products/new-bracelet.png", readTime: "8 min read",
  },
  {
    id: "j3", title: "Commissioning Your First Heirloom",
    date: "November 2023", category: "Guide",
    excerpt: "A collector's guide to the bespoke process — from the first conversation to the moment your piece arrives in its hand-stitched folio. What to expect, what to ask, and why patience is part of the luxury.",
    image: "/products/new-fish-pendant.png", readTime: "5 min read",
  },
  {
    id: "j4", title: "The Ethics of Precious: Our Sourcing Manifesto",
    date: "September 2023", category: "Values",
    excerpt: "How we trace every gram of gold from mine to market. Our partnerships with certified artisanal miners, fair-trade wages, and the recycled metal initiatives reshaping our industry.",
    image: "/products/new-bar-pendant.jpg", readTime: "7 min read",
  },
  {
    id: "j5", title: "Milano × Rajasthan: A Design Dialogue",
    date: "June 2023", category: "Design",
    excerpt: "Two cultures, one language of gold. How the geometric precision of Italian orfèvrerie merges with the fluid intuition of Indian metalwork to create something entirely new.",
    image: "/products/new-bracelet.png", readTime: "6 min read",
  },
  {
    id: "j6", title: "The Lost Art of the Gouache Sketch",
    date: "April 2023", category: "Craft",
    excerpt: "Before any gold is heated, our designs live as hand-painted watercolour illustrations. We revive a 19th-century jewellery tradition that most houses have abandoned to digital rendering.",
    image: "/products/new-fish-pendant.png", readTime: "4 min read",
  },
];

const CATEGORIES = ["All", "Craft", "Atelier", "Guide", "Values", "Design"];

export const JournalPage = (): JSX.Element => {
  const heroVis = useInView(0.1);
  const [activeCat, setActiveCat] = useState("All");

  const filtered = activeCat === "All" ? ENTRIES : ENTRIES.filter(e => e.category === activeCat);

  return (
    <div style={{ minHeight: "100vh", background: "#fef9e9" }}>
      <NavbarSection />

      {/* ═══ HERO ═══ */}
      <section ref={heroVis.ref} style={{
        padding: "160px 24px 80px", textAlign: "center",
        background: "linear-gradient(180deg, #f5f0e4, #fef9e9)",
      }}>
        <span style={{
          fontFamily: "'Manrope', sans-serif", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.5em", textTransform: "uppercase",
          color: "rgba(201,168,76,0.6)", display: "block", marginBottom: 24,
          opacity: heroVis.visible ? 1 : 0, transition: "opacity 0.8s ease 0.2s",
        }}>Reflections from the Atelier</span>

        <h1 style={{
          fontFamily: "'Noto Serif', Georgia, serif",
          fontSize: "clamp(42px, 9vw, 88px)", fontWeight: 400,
          letterSpacing: "-0.02em", lineHeight: 0.95,
          color: "#1d1c12", margin: "0 0 24px",
          opacity: heroVis.visible ? 1 : 0, transform: heroVis.visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s ease 0.3s",
        }}>Journal</h1>

        <div style={{
          width: heroVis.visible ? 80 : 0, height: 1,
          background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
          margin: "0 auto 28px", transition: "width 1s ease 0.6s",
        }} />

        <p style={{
          fontFamily: "'Noto Serif', Georgia, serif", fontStyle: "italic",
          fontSize: "clamp(14px, 2vw, 18px)", color: "rgba(29,28,18,0.45)",
          maxWidth: 500, margin: "0 auto",
          opacity: heroVis.visible ? 1 : 0, transition: "opacity 0.8s ease 0.9s",
        }}>
          Writings on craft, heritage, and the quiet art of working with gold.
        </p>
      </section>

      {/* ═══ CATEGORY FILTER ═══ */}
      <section style={{ padding: "0 24px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap",
          borderBottom: "1px solid rgba(29,28,18,0.08)", paddingBottom: 20,
        }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{
              padding: "8px 18px", fontFamily: "'Manrope', sans-serif",
              fontSize: 11, fontWeight: activeCat === c ? 700 : 400,
              letterSpacing: "0.12em", textTransform: "uppercase",
              background: activeCat === c ? "rgba(201,168,76,0.12)" : "transparent",
              border: activeCat === c ? "1px solid rgba(201,168,76,0.4)" : "1px solid transparent",
              color: activeCat === c ? "#795900" : "rgba(29,28,18,0.4)",
              cursor: "pointer", transition: "all 0.2s",
            }}>{c}</button>
          ))}
        </div>
      </section>

      {/* ═══ ARTICLES GRID ═══ */}
      <section style={{ padding: "0 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 28,
        }}>
          {filtered.map((entry, i) => (
            <FadeSection key={entry.id} delay={i * 0.08}>
              <article style={{
                border: "1px solid rgba(29,28,18,0.08)", overflow: "hidden",
                background: "#fef9e9", transition: "border-color 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(29,28,18,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(29,28,18,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ aspectRatio: "16/10", overflow: "hidden", background: "#f5f0e4" }}>
                  <img src={entry.image} alt={entry.title}
                    onContextMenu={e => e.preventDefault()} draggable={false}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "22px 24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{
                      fontFamily: "'Manrope', sans-serif", fontSize: 9, fontWeight: 700,
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      color: "#c9a84c", background: "rgba(201,168,76,0.1)",
                      padding: "3px 8px",
                    }}>{entry.category}</span>
                    <span style={{
                      fontFamily: "'Manrope', sans-serif", fontSize: 10,
                      color: "rgba(29,28,18,0.3)", letterSpacing: "0.05em",
                    }}>{entry.date}</span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Noto Serif', Georgia, serif", fontSize: 18,
                    fontWeight: 400, color: "#1d1c12", margin: "0 0 10px", lineHeight: 1.3,
                  }}>{entry.title}</h3>
                  <p style={{
                    fontFamily: "'Manrope', sans-serif", fontSize: 12, lineHeight: 1.7,
                    color: "rgba(29,28,18,0.45)", margin: "0 0 16px",
                  }}>{entry.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      fontFamily: "'Manrope', sans-serif", fontSize: 10,
                      color: "rgba(29,28,18,0.3)", letterSpacing: "0.1em",
                    }}>{entry.readTime}</span>
                    <span style={{
                      fontFamily: "'Manrope', sans-serif", fontSize: 10, fontWeight: 700,
                      letterSpacing: "0.15em", textTransform: "uppercase",
                      color: "#795900", transition: "letter-spacing 0.3s",
                    }}>Read →</span>
                  </div>
                </div>
              </article>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ═══ SUBSCRIBE CTA ═══ */}
      <FadeSection>
        <section style={{
          padding: "72px 24px", textAlign: "center",
          background: "#1a1c12",
        }}>
          <h2 style={{
            fontFamily: "'Noto Serif', Georgia, serif", fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 400, color: "#fef9e9", margin: "0 0 12px",
          }}>Stay Informed</h2>
          <p style={{
            fontFamily: "'Manrope', sans-serif", fontSize: 12, color: "rgba(254,249,233,0.4)",
            maxWidth: 400, margin: "0 auto 28px", letterSpacing: "0.05em",
          }}>
            New writings on craft, collection announcements, and invitations to private viewings.
          </p>
          <div style={{ display: "flex", gap: 0, maxWidth: 420, margin: "0 auto" }}>
            <input placeholder="Your email address" style={{
              flex: 1, padding: "13px 16px",
              background: "rgba(254,249,233,0.06)", border: "1px solid rgba(201,168,76,0.25)",
              borderRight: "none", color: "#fef9e9",
              fontFamily: "'Manrope', sans-serif", fontSize: 12, outline: "none",
            }} />
            <button style={{
              padding: "13px 24px", background: "#c9a84c", border: "none",
              color: "#1d1c12", fontFamily: "'Manrope', sans-serif", fontSize: 11,
              fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
              cursor: "pointer", whiteSpace: "nowrap", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >Subscribe</button>
          </div>
        </section>
      </FadeSection>

      <FooterSection />
    </div>
  );
};
