import { useCart } from "@/lib/CartContext";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(29,28,18,0.45)",
          backdropFilter: "blur(4px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Drawer panel */}
      <aside
        aria-label="Shopping Cart"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 201,
          width: "min(440px, 100vw)",
          background: "#fef9e9",
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "-8px 0 48px rgba(29,28,18,0.12)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "28px 28px 20px",
            borderBottom: "1px solid rgba(29,28,18,0.08)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span
              style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: "22px",
                fontWeight: 400,
                color: "#1d1c12",
                lineHeight: 1,
              }}
            >
              Your Atelier
            </span>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(29,28,18,0.4)",
              }}
            >
              {items.length === 0
                ? "No pieces selected"
                : `${items.reduce((s, i) => s + i.quantity, 0)} piece${items.reduce((s, i) => s + i.quantity, 0) > 1 ? "s" : ""} reserved`}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              background: "none",
              border: "1px solid rgba(29,28,18,0.12)",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1d1c12",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(29,28,18,0.05)";
              e.currentTarget.style.borderColor = "rgba(29,28,18,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.borderColor = "rgba(29,28,18,0.12)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 0" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "16px",
                padding: "40px 28px",
                textAlign: "center",
              }}
            >
              {/* Empty cart icon */}
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  border: "1px solid rgba(201,168,76,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <p
                  style={{
                    fontFamily: "'Noto Serif', Georgia, serif",
                    fontSize: "18px",
                    fontWeight: 400,
                    color: "#1d1c12",
                  }}
                >
                  Nothing reserved yet
                </p>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "12px",
                    color: "rgba(29,28,18,0.5)",
                    lineHeight: 1.6,
                  }}
                >
                  Explore our collection and reserve a handcrafted piece.
                </p>
              </div>
              <button
                onClick={closeCart}
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  background: "#795900",
                  color: "#fef9e9",
                  border: "none",
                  padding: "12px 28px",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  marginTop: "8px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#634900")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#795900")}
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {items.map((item, idx) => (
                <div
                  key={`${item.id}-${item.size}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "88px 1fr",
                    gap: "16px",
                    padding: "20px 28px",
                    borderBottom: idx < items.length - 1 ? "1px solid rgba(29,28,18,0.06)" : "none",
                    alignItems: "start",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      aspectRatio: "4/5",
                      overflow: "hidden",
                      border: "1px solid rgba(29,28,18,0.08)",
                      background: "#f8f3e4",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <p
                          style={{
                            fontFamily: "'Noto Serif', Georgia, serif",
                            fontSize: "15px",
                            fontWeight: 400,
                            color: "#1d1c12",
                            margin: 0,
                            lineHeight: 1.3,
                          }}
                        >
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "rgba(29,28,18,0.4)",
                            margin: "4px 0 0",
                          }}
                        >
                          {item.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        aria-label={`Remove ${item.name}`}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "rgba(29,28,18,0.3)",
                          padding: "2px",
                          transition: "color 0.2s",
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(29,28,18,0.3)")}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <line x1="1" y1="1" x2="11" y2="11" />
                          <line x1="11" y1="1" x2="1" y2="11" />
                        </svg>
                      </button>
                    </div>

                    <p
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "10px",
                        color: "rgba(29,28,18,0.5)",
                        margin: 0,
                      }}
                    >
                      Size: {item.size}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "6px",
                      }}
                    >
                      {/* Qty controls */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid rgba(29,28,18,0.12)",
                          gap: 0,
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          style={{
                            background: "none",
                            border: "none",
                            borderRight: "1px solid rgba(29,28,18,0.12)",
                            width: "28px",
                            height: "28px",
                            cursor: "pointer",
                            color: "#1d1c12",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.15s",
                            fontSize: "16px",
                            lineHeight: 1,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(29,28,18,0.05)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                        >
                          −
                        </button>
                        <span
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#1d1c12",
                            width: "32px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          style={{
                            background: "none",
                            border: "none",
                            borderLeft: "1px solid rgba(29,28,18,0.12)",
                            width: "28px",
                            height: "28px",
                            cursor: "pointer",
                            color: "#1d1c12",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.15s",
                            fontSize: "16px",
                            lineHeight: 1,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(29,28,18,0.05)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                        >
                          +
                        </button>
                      </div>

                      <span
                        style={{
                          fontFamily: "'Noto Serif', Georgia, serif",
                          fontSize: "16px",
                          fontWeight: 400,
                          color: "#795900",
                        }}
                      >
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — totals + checkout */}
        {items.length > 0 && (
          <div
            style={{
              borderTop: "1px solid rgba(29,28,18,0.08)",
              padding: "24px 28px 32px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              background: "#f8f3e4",
            }}
          >
            {/* Order note */}
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(29,28,18,0.4)",
                textAlign: "center",
              }}
            >
              Each piece is handcrafted to order — 4–6 weeks
            </p>

            {/* Subtotal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(29,28,18,0.5)",
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 400,
                  color: "#1d1c12",
                }}
              >
                ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                style={{
                  width: "100%",
                  background: "#795900",
                  color: "#fef9e9",
                  border: "none",
                  padding: "16px",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#634900")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#795900")}
              >
                Commission Request
              </button>
              <button
                onClick={clearCart}
                style={{
                  width: "100%",
                  background: "none",
                  color: "rgba(29,28,18,0.4)",
                  border: "1px solid rgba(29,28,18,0.12)",
                  padding: "12px",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(29,28,18,0.3)";
                  e.currentTarget.style.color = "rgba(29,28,18,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(29,28,18,0.12)";
                  e.currentTarget.style.color = "rgba(29,28,18,0.4)";
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
