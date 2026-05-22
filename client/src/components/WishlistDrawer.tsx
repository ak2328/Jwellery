import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useWishlist, WishlistItem } from "@/lib/WishlistContext";
import { useCart } from "@/lib/CartContext";

/* ── Heart SVG ──────────────────────────────────────────────── */
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#c9a84c" : "none"} stroke={filled ? "#c9a84c" : "currentColor"} strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WishlistDrawer() {
  const { items, isOpen, closeWishlist, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [, setLocation] = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) closeWishlist(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeWishlist]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const moveToCart = (item: WishlistItem) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, category: item.category });
    removeItem(item.id);
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={closeWishlist}
        style={{
          position: "fixed", inset: 0, zIndex: 998,
          background: "rgba(29,28,18,0.45)",
          backdropFilter: "blur(4px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* ── Drawer panel ── */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
        style={{
          position: "fixed",
          top: 0, right: 0, bottom: 0,
          zIndex: 999,
          width: "min(420px, 100vw)",
          background: "#fef9e9",
          boxShadow: "-8px 0 48px rgba(29,28,18,0.18)",
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "24px 28px 20px",
          borderBottom: "1px solid rgba(29,28,18,0.08)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <p style={{
              fontFamily: "'Manrope', sans-serif", fontSize: 9, fontWeight: 700,
              letterSpacing: "0.3em", textTransform: "uppercase", color: "#795900", margin: 0,
            }}>Saved Pieces</p>
            <h2 style={{
              fontFamily: "'Noto Serif', Georgia, serif", fontSize: 20,
              fontWeight: 400, color: "#1d1c12", margin: 0,
            }}>
              Wishlist
              {items.length > 0 && (
                <span style={{
                  fontFamily: "'Manrope', sans-serif", fontSize: 11,
                  color: "#795900", marginLeft: 8,
                }}>({items.length})</span>
              )}
            </h2>
          </div>
          <button
            onClick={closeWishlist}
            aria-label="Close wishlist"
            style={{
              background: "none", border: "1px solid rgba(29,28,18,0.12)",
              color: "#1d1c12", cursor: "pointer", width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#1d1c12")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(29,28,18,0.12)")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 0 24px" }}>
          {items.length === 0 ? (
            /* Empty state */
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", height: "100%", gap: 20, padding: "60px 28px",
              textAlign: "center",
            }}>
              <div style={{
                width: 64, height: 64,
                border: "1px solid rgba(201,168,76,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(201,168,76,0.4)",
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div>
                <p style={{
                  fontFamily: "'Noto Serif', Georgia, serif", fontSize: 18,
                  fontStyle: "italic", color: "#1d1c12", margin: "0 0 8px",
                }}>Nothing saved yet</p>
                <p style={{
                  fontFamily: "'Manrope', sans-serif", fontSize: 12,
                  color: "rgba(29,28,18,0.45)", lineHeight: 1.7, margin: 0,
                }}>Browse the collection and tap the heart icon<br />to save pieces you love.</p>
              </div>
              <button
                onClick={() => { closeWishlist(); setLocation("/collection"); }}
                style={{
                  fontFamily: "'Manrope', sans-serif", fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  background: "#795900", color: "#fef9e9", border: "none",
                  padding: "13px 28px", cursor: "pointer", marginTop: 8,
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#634900")}
                onMouseLeave={e => (e.currentTarget.style.background = "#795900")}
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div>
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "88px 1fr",
                    gap: 16,
                    padding: "20px 28px",
                    borderBottom: idx < items.length - 1 ? "1px solid rgba(29,28,18,0.06)" : "none",
                    alignItems: "start",
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => { closeWishlist(); setLocation(`/product/${item.id}`); }}
                    style={{
                      aspectRatio: "4/5", overflow: "hidden",
                      border: "1px solid rgba(29,28,18,0.08)",
                      cursor: "pointer", flexShrink: 0,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s", }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 2 }}>
                    <p style={{
                      fontFamily: "'Manrope', sans-serif", fontSize: 9, fontWeight: 700,
                      letterSpacing: "0.22em", textTransform: "uppercase", color: "#795900", margin: 0,
                    }}>{item.category}</p>
                    <p
                      onClick={() => { closeWishlist(); setLocation(`/product/${item.id}`); }}
                      style={{
                        fontFamily: "'Noto Serif', Georgia, serif", fontSize: 15,
                        fontStyle: "italic", color: "#1d1c12", margin: 0, cursor: "pointer",
                        lineHeight: 1.3,
                      }}
                    >{item.name}</p>
                    <p style={{
                      fontFamily: "'Noto Serif', Georgia, serif", fontSize: 14,
                      color: "#795900", margin: 0, fontWeight: 400,
                    }}>{item.price}</p>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                      <button
                        onClick={() => moveToCart(item)}
                        style={{
                          flex: 1,
                          fontFamily: "'Manrope', sans-serif", fontSize: 9, fontWeight: 700,
                          letterSpacing: "0.18em", textTransform: "uppercase",
                          background: "#795900", color: "#fef9e9", border: "none",
                          padding: "9px 0", cursor: "pointer", transition: "background 0.2s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#634900")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#795900")}
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove from wishlist"
                        style={{
                          background: "none",
                          border: "1px solid rgba(29,28,18,0.12)",
                          color: "rgba(29,28,18,0.45)",
                          cursor: "pointer", padding: "9px 10px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#c9a84c"; e.currentTarget.style.color = "#c9a84c"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(29,28,18,0.12)"; e.currentTarget.style.color = "rgba(29,28,18,0.45)"; }}
                      >
                        <HeartIcon filled />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — only shown when items exist */}
        {items.length > 0 && (
          <div style={{
            padding: "18px 28px",
            borderTop: "1px solid rgba(29,28,18,0.08)",
            flexShrink: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}>
            <button
              onClick={clearWishlist}
              style={{
                fontFamily: "'Manrope', sans-serif", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                background: "none", color: "rgba(29,28,18,0.35)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1d1c12")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(29,28,18,0.35)")}
            >
              Clear All
            </button>
            <button
              onClick={() => { closeWishlist(); setLocation("/collection"); }}
              style={{
                fontFamily: "'Manrope', sans-serif", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                background: "none", color: "#795900",
                border: "1px solid rgba(121,89,0,0.3)",
                padding: "10px 20px", cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#795900"; e.currentTarget.style.background = "rgba(121,89,0,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(121,89,0,0.3)"; e.currentTarget.style.background = "none"; }}
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes wishlistBadgePop {
          0%   { transform: scale(0); }
          70%  { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}
