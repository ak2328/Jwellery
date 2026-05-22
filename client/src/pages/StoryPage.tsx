import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";

/* ─── Intersection observer ──────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Reveal wrapper ─────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const { ref, visible } = useInView(0.08);
  const offsets: Record<string, string> = {
    up: "translateY(32px)",
    left: "translateX(-32px)",
    right: "translateX(32px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : offsets[direction],
        transition: `opacity 0.95s cubic-bezier(0.4,0,0.2,1) ${delay}s,
                     transform 0.95s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Gold rule ornament ─────────────────────────────────────── */
function Rule({ width = 48 }: { width?: number }) {
  return <div style={{ width, height: 1, background: "#c9a84c" }} />;
}

const BELIEFS = ["Not by age", "Not by occasion", "Not by rules"];

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export const StoryPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fef9e9", overflowX: "hidden" }}>
      <NavbarSection />

      {/* ══════════════════════════════════════════════════════════
          1. HERO — full-bleed, bottom-anchored copy
         ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 600,
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Parallax bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateY(${scrollY * 0.28}px)`,
            willChange: "transform",
          }}
        >
          <img
            src="/products/bracelet-unisex-1.jpg"
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "115%",
              objectFit: "cover",
              objectPosition: "center 30%",
              filter: "brightness(0.45)",
              display: "block",
            }}
          />
        </div>

        {/* Bottom veil */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(29,28,18,0.96) 0%, rgba(29,28,18,0.3) 50%, transparent 100%)",
          }}
        />

        {/* Breadcrumb */}
        <div
          style={{
            position: "absolute",
            top: 96,
            left: "clamp(24px, 5vw, 64px)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            opacity: heroIn ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          <span
            onClick={() => setLocation("/")}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(254,249,233,0.38)",
              cursor: "pointer",
            }}
          >
            Mani D&apos;Oro
          </span>
          <span style={{ color: "rgba(254,249,233,0.18)", fontSize: 10 }}>/</span>
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(254,249,233,0.38)",
            }}
          >
            Our Story
          </span>
        </div>

        {/* Copy */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(24px, 5vw, 64px) clamp(56px, 8vh, 96px)",
          }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "#c9a84c",
              margin: "0 0 24px",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "none" : "translateY(10px)",
              transition: "all 0.8s ease 0.4s",
            }}
          >
            Our Story
          </p>

          <h1
            style={{
              fontFamily: "'Noto Serif', Georgia, serif",
              fontSize: "clamp(52px, 9vw, 118px)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 0.94,
              letterSpacing: "-0.02em",
              color: "#fef9e9",
              margin: "0 0 44px",
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "none" : "translateY(28px)",
              transition: "all 1s ease 0.55s",
            }}
          >
            Effortless.
            <br />
            Expressive.
            <br />
            Every&nbsp;Day.
          </h1>

          <div
            style={{
              width: heroIn ? 64 : 0,
              height: 1,
              background: "#c9a84c",
              transition: "width 1s ease 1.1s",
              marginBottom: 28,
            }}
          />

          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(13px, 1.4vw, 15px)",
              lineHeight: 1.9,
              color: "rgba(254,249,233,0.55)",
              maxWidth: 460,
              margin: 0,
              opacity: heroIn ? 1 : 0,
              transition: "opacity 1s ease 1.15s",
            }}
          >
            Demi-fine jewellery designed to feel like a natural extension of who you are.
          </p>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            right: "clamp(24px, 4vw, 48px)",
            bottom: "clamp(36px, 5vh, 64px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            opacity: heroIn ? 0.4 : 0,
            transition: "opacity 1s ease 1.5s",
          }}
        >
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#fef9e9",
              writingMode: "vertical-rl",
            }}
          >
            Scroll
          </span>
          <div
            style={{ width: 1, height: 40, background: "linear-gradient(#c9a84c, transparent)" }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. THE IDEA — spacious text, cream background
         ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "clamp(96px, 14vh, 160px) clamp(24px, 5vw, 64px)",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#795900",
              margin: "0 0 36px",
            }}
          >
            The Idea
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Oversize editorial statement — the whole founding idea */}
          <p
            style={{
              fontFamily: "'Noto Serif', Georgia, serif",
              fontSize: "clamp(26px, 4.2vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.22,
              letterSpacing: "-0.01em",
              color: "#1d1c12",
              maxWidth: 880,
              margin: 0,
            }}
          >
            Mani D&apos;oro was born from the idea of creating Demi-fine jewellery that should feel
            like a{" "}
            <em style={{ fontStyle: "italic", color: "#795900" }}>
              natural extension of personal style
            </em>{" "}
            — effortless, expressive, and wearable every day.
          </p>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. ONE STRONG IMAGE — edge-to-edge, no clutter
         ══════════════════════════════════════════════════════════ */}
      <div style={{ overflow: "hidden" }}>
        <Reveal direction="none">
          <img
            src="/products/bracelet-unisex-4.jpg"
            alt="Mani D'Oro wearable jewellery"
            style={{
              width: "100%",
              height: "clamp(360px, 58vh, 680px)",
              objectFit: "cover",
              objectPosition: "center 45%",
              display: "block",
              filter: "brightness(0.88)",
              transition: "transform 3s cubic-bezier(0.4,0,0.2,1)",
            }}
            className="story-zoom"
          />
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════════════════════
          4. BELIEFS — dark, pure typography, no images
         ══════════════════════════════════════════════════════════ */}
      <section style={{ background: "#1d1c12" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px)",
          }}
        >
          {/* Top label */}
          <Reveal>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#c9a84c",
                margin: "0 0 48px",
              }}
            >
              What We Believe
            </p>
          </Reveal>

          {/* Split: headline left, body right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 7vw, 112px)",
              alignItems: "start",
              marginBottom: "clamp(64px, 10vh, 112px)",
            }}
            className="story-split"
          >
            <Reveal direction="left">
              <h2
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "clamp(30px, 4.2vw, 54px)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.15,
                  color: "#fef9e9",
                  margin: 0,
                }}
              >
                Style should{" "}
                <span style={{ color: "#c9a84c", fontStyle: "normal" }}>never</span>{" "}
                feel limited.
              </h2>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 15,
                  lineHeight: 2,
                  color: "rgba(254,249,233,0.55)",
                  margin: 0,
                  paddingTop: 6,
                }}
              >
                That's why our collections combine innovative design with skilled manufacturing
                — creating Demi-fine jewellery that feels distinctive, with modern aesthetics,
                versatile styling, and unisex pieces that anyone can make their own.
              </p>
            </Reveal>
          </div>

          {/* Three rules — full width, horizontal dividers */}
          <div>
            {BELIEFS.map((b, i) => (
              <Reveal key={b} delay={i * 0.08}>
                <div
                  style={{
                    borderTop: "1px solid rgba(201,168,76,0.15)",
                    borderBottom: i === BELIEFS.length - 1 ? "1px solid rgba(201,168,76,0.15)" : undefined,
                    padding: "clamp(20px, 3vh, 32px) 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Noto Serif', Georgia, serif",
                      fontSize: "clamp(22px, 3.2vw, 42px)",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "#fef9e9",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {b}
                  </span>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#c9a84c",
                      opacity: 0.6,
                      flexShrink: 0,
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. VISION — cream, asymmetric text columns
         ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "clamp(96px, 14vh, 160px) clamp(24px, 5vw, 64px)",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* Label */}
        <Reveal>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#795900",
              margin: "0 0 48px",
            }}
          >
            Our Vision
          </p>
        </Reveal>

        {/* Asymmetric 5 / 7 columns — heading left, body right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            gap: "clamp(40px, 7vw, 112px)",
            alignItems: "start",
          }}
          className="story-split"
        >
          <Reveal direction="left">
            <h2
              style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: "clamp(26px, 3.6vw, 46px)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "#1d1c12",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Designed for modern lifestyles and evolving identities.
            </h2>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div style={{ paddingTop: 6 }}>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 15,
                  lineHeight: 2,
                  color: "rgba(29,28,18,0.62)",
                  margin: "0 0 24px",
                }}
              >
                Our collections bring together contemporary silhouettes, versatile styling, and
                pieces that move seamlessly across occasions.
              </p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 15,
                  lineHeight: 2,
                  color: "rgba(29,28,18,0.62)",
                  margin: 0,
                }}
              >
                Every piece reflects the balance between artistic design and expert making —
                combining fresh aesthetics with timeless sophistication.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. PULL QUOTE — full-bleed image, centred quote
         ══════════════════════════════════════════════════════════ */}
      <div style={{ overflow: "hidden" }}>
        <Reveal direction="none">
          <section
            style={{
              position: "relative",
              height: "clamp(380px, 58vh, 640px)",
            }}
          >
            <img
              src="/products/bracelet-unisex-2.jpg"
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 42%",
                filter: "brightness(0.38)",
                display: "block",
              }}
            />
            {/* Scrim */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(29,28,18,0.3) 0%, transparent 70%)",
              }}
            />

            {/* Quote */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 clamp(24px, 12vw, 220px)",
                textAlign: "center",
              }}
            >
              <Rule width={40} />
              <blockquote
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(20px, 3.2vw, 38px)",
                  fontWeight: 400,
                  lineHeight: 1.45,
                  color: "#fef9e9",
                  maxWidth: 800,
                  margin: "32px 0",
                }}
              >
                "Every piece reflects the balance between artistic design and expert making —
                combining fresh aesthetics with timeless sophistication."
              </blockquote>
              <Rule width={40} />
            </div>
          </section>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════════════════════
          7. CTA — dark forest, text only (no image to clutter)
         ══════════════════════════════════════════════════════════ */}
      <section style={{ background: "#232919" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px)",
          }}
        >
          {/* Two-column: heading + actions */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 7vw, 112px)",
              alignItems: "end",
            }}
            className="story-split"
          >
            <Reveal direction="left">
              <div>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "#c9a84c",
                    margin: "0 0 24px",
                  }}
                >
                  Discover the Collection
                </p>
                <h2
                  style={{
                    fontFamily: "'Noto Serif', Georgia, serif",
                    fontSize: "clamp(26px, 3.8vw, 50px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    lineHeight: 1.15,
                    color: "#fef9e9",
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Wearable every day.
                  <br />
                  Made to move with you.
                </h2>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.9,
                    color: "rgba(254,249,233,0.5)",
                    margin: "0 0 16px",
                  }}
                >
                  Browse our current collection of demi-fine jewellery — designed for modern
                  lifestyles, made to be worn every day.
                </p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <button
                    onClick={() => setLocation("/collection")}
                    className="story-btn-gold"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      background: "#c9a84c",
                      color: "#1d1c12",
                      border: "none",
                      padding: "15px 30px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      transition: "background 0.3s ease",
                    }}
                  >
                    Explore Collection
                    <svg width="18" height="7" viewBox="0 0 18 7" fill="none">
                      <path d="M0 3.5H16M12 1L16 3.5L12 6" stroke="#1d1c12" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setLocation("/contact")}
                    className="story-btn-ghost"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      background: "transparent",
                      color: "rgba(254,249,233,0.55)",
                      border: "1px solid rgba(254,249,233,0.16)",
                      padding: "15px 30px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FooterSection />

      <style>{`
        /* ── responsive ── */
        @media (max-width: 768px) {
          .story-split {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }

        /* ── hover zoom on full-bleed images ── */
        .story-zoom:hover { transform: scale(1.03); }

        /* ── buttons ── */
        .story-btn-gold:hover  { background: #b8963e !important; }
        .story-btn-ghost:hover {
          background: rgba(254,249,233,0.06) !important;
          border-color: rgba(254,249,233,0.32) !important;
          color: #fef9e9 !important;
        }
      `}</style>
    </div>
  );
};
