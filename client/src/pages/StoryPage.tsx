import { useState, useEffect, useRef } from "react";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";

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

function FadeSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView(0.12);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
    }}>{children}</div>
  );
}

const TIMELINE = [
  { year: "2018", title: "The Seed", text: "In a small workshop in Kishangarh, Rajasthan, a single gold ingot was hand-hammered into what would become the first Mani D'Oro signet ring — an object of obsession that sparked a decade-long pursuit of perfection." },
  { year: "2019", title: "The Fire", text: "Partnering with master goldsmiths from Milan's historic Quartiere degli Orafi, we fused Italian design sensibility with Indian metallurgical traditions. The result: a process that heats gold beyond 1,000°C to achieve our signature molten patina." },
  { year: "2020", title: "The Mark", text: "Mani D'Oro was officially registered as an atelier. Every piece now carries the MdO hallmark — a tiny hammered cipher that certifies its handmade origin and ensures complete traceability." },
  { year: "2022", title: "The Archive", text: "With over forty unique pieces completed, we established The Archive — a living catalogue of every creation, ensuring that the story of each work is preserved alongside its physical form." },
  { year: "2024", title: "The Horizon", text: "Today, Mani D'Oro serves a global clientele of collectors and connoisseurs. Every commission begins with a conversation, every piece ends with a legacy." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Consultation", desc: "Every piece begins with a deep conversation — understanding not just dimensions, but the story the wearer wants to carry." },
  { num: "02", title: "Sketching", desc: "Original gouache illustrations are hand-painted by our design atelier, translating emotion into form before metal is ever touched." },
  { num: "03", title: "Forging", desc: "Solid gold is heated beyond 1,000°C in our Kishangarh foundry, then shaped using hand tools unchanged for three centuries." },
  { num: "04", title: "Finishing", desc: "Each piece is polished, hallmarked, and archived. The final patina is achieved through a proprietary acid-wash that reveals the metal's inner warmth." },
  { num: "05", title: "Presentation", desc: "Delivered in a hand-stitched leather folio with provenance documentation, original sketches, and a certificate of authenticity." },
];

export const StoryPage = (): JSX.Element => {
  const heroVis = useInView(0.1);

  return (
    <div style={{ minHeight: "100vh", background: "#fef9e9" }}>
      <NavbarSection />

      {/* ═══ HERO ═══ */}
      <section ref={heroVis.ref} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "120px 24px 80px", position: "relative", overflow: "hidden",
      }}>
        {/* Subtle warm gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, #fef9e9 0%, #f5f0e4 50%, #fef9e9 100%)",
          zIndex: 0,
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
          <span style={{
            fontFamily: "'Manrope', sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)",
            display: "block", marginBottom: 28,
            opacity: heroVis.visible ? 1 : 0, transition: "opacity 0.8s ease 0.2s",
          }}>Est. 2018 · Kishangarh — Milano</span>

          <h1 style={{
            fontFamily: "'Noto Serif', Georgia, serif",
            fontSize: "clamp(42px, 9vw, 96px)", fontWeight: 400,
            letterSpacing: "-0.02em", lineHeight: 0.95,
            color: "#1d1c12", margin: "0 0 28px",
            opacity: heroVis.visible ? 1 : 0, transform: heroVis.visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s ease 0.3s",
          }}>Our Story</h1>

          <div style={{
            width: heroVis.visible ? 100 : 0, height: 1,
            background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
            margin: "0 auto 32px", transition: "width 1s ease 0.7s",
          }} />

          <p style={{
            fontFamily: "'Noto Serif', Georgia, serif", fontStyle: "italic",
            fontSize: "clamp(16px, 2.5vw, 22px)", color: "rgba(29,28,18,0.5)",
            lineHeight: 1.6, margin: 0,
            opacity: heroVis.visible ? 1 : 0, transition: "opacity 0.8s ease 1s",
          }}>
            Born of fire, shaped by hand, guided by heritage —<br />
            the story of gold told one piece at a time.
          </p>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{
                fontFamily: "'Noto Serif', Georgia, serif", fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 400, color: "#1d1c12", margin: "0 0 24px",
              }}>The Philosophy</h2>
              <p style={{
                fontFamily: "'Manrope', sans-serif", fontSize: 14, lineHeight: 2,
                color: "rgba(29,28,18,0.55)", maxWidth: 640, margin: "0 auto",
              }}>
                At Mani D'Oro, we believe luxury is not about perfection — it is about presence.
                Every microscopic variation in our hammered gold is a fingerprint of the artisan, a record
                of the moment of creation. We do not seek to erase these traces; we celebrate them.
                Our pieces are not manufactured — they are authored.
              </p>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section style={{ padding: "40px 24px 100px", background: "#1a1c12", color: "#fef9e9" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeSection>
            <h2 style={{
              fontFamily: "'Noto Serif', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 400, textAlign: "center", margin: "60px 0 60px", color: "#fef9e9",
            }}>A Timeline of Fire</h2>
          </FadeSection>

          <div style={{ position: "relative", paddingLeft: 40 }}>
            {/* Gold vertical line */}
            <div style={{
              position: "absolute", left: 14, top: 0, bottom: 0, width: 1,
              background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.4), transparent)",
            }} />

            {TIMELINE.map((t, i) => (
              <FadeSection key={t.year} delay={i * 0.1}>
                <div style={{
                  position: "relative", marginBottom: 56, paddingLeft: 24,
                }}>
                  {/* Dot */}
                  <div style={{
                    position: "absolute", left: -33, top: 6, width: 9, height: 9,
                    borderRadius: "50%", background: "#c9a84c",
                    boxShadow: "0 0 12px rgba(201,168,76,0.4)",
                  }} />
                  <span style={{
                    fontFamily: "'Manrope', sans-serif", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.3em", color: "rgba(201,168,76,0.6)",
                    display: "block", marginBottom: 8,
                  }}>{t.year}</span>
                  <h3 style={{
                    fontFamily: "'Noto Serif', Georgia, serif", fontSize: 22,
                    fontWeight: 400, color: "#fef9e9", margin: "0 0 12px",
                  }}>{t.title}</h3>
                  <p style={{
                    fontFamily: "'Manrope', sans-serif", fontSize: 13, lineHeight: 1.8,
                    color: "rgba(254,249,233,0.45)", margin: 0,
                  }}>{t.text}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OUR PROCESS ═══ */}
      <section style={{ padding: "100px 24px", maxWidth: 960, margin: "0 auto" }}>
        <FadeSection>
          <h2 style={{
            fontFamily: "'Noto Serif', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 400, textAlign: "center", color: "#1d1c12", margin: "0 0 16px",
          }}>Our Process</h2>
          <p style={{
            fontFamily: "'Manrope', sans-serif", fontSize: 12, textAlign: "center",
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(29,28,18,0.35)", margin: "0 0 60px",
          }}>From conversation to creation</p>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
          {PROCESS_STEPS.map((s, i) => (
            <FadeSection key={s.num} delay={i * 0.08}>
              <div style={{
                padding: 28, border: "1px solid rgba(29,28,18,0.08)",
                background: "rgba(245,240,228,0.5)",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,168,76,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(29,28,18,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span style={{
                  fontFamily: "'Noto Serif', Georgia, serif", fontSize: 32,
                  fontWeight: 400, color: "rgba(201,168,76,0.25)", display: "block",
                  marginBottom: 16, lineHeight: 1,
                }}>{s.num}</span>
                <h3 style={{
                  fontFamily: "'Noto Serif', Georgia, serif", fontSize: 18,
                  fontWeight: 400, color: "#1d1c12", margin: "0 0 10px",
                }}>{s.title}</h3>
                <p style={{
                  fontFamily: "'Manrope', sans-serif", fontSize: 12, lineHeight: 1.8,
                  color: "rgba(29,28,18,0.5)", margin: 0,
                }}>{s.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ═══ PULL QUOTE ═══ */}
      <FadeSection>
        <section style={{
          padding: "80px 24px", textAlign: "center",
          background: "linear-gradient(180deg, #fef9e9, #f5f0e4, #fef9e9)",
        }}>
          <div style={{
            width: 60, height: 1, background: "#c9a84c",
            margin: "0 auto 40px",
          }} />
          <blockquote style={{
            fontFamily: "'Noto Serif', Georgia, serif", fontStyle: "italic",
            fontSize: "clamp(18px, 3vw, 28px)", color: "rgba(29,28,18,0.55)",
            lineHeight: 1.5, maxWidth: 700, margin: "0 auto 24px", fontWeight: 400,
          }}>
            "We do not make jewellery for display cases.<br />
            We make it for lifetimes."
          </blockquote>
          <p style={{
            fontFamily: "'Manrope', sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(201,168,76,0.5)",
          }}>— Alessandra Oro, Founder</p>
          <div style={{
            width: 60, height: 1, background: "#c9a84c",
            margin: "40px auto 0",
          }} />
        </section>
      </FadeSection>

      <FooterSection />
    </div>
  );
};
