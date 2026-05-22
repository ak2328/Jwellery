import { useState } from "react";
import { useLocation } from "wouter";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export const CheckoutPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "", phone: "", address_line: "", city: "", state: "", pincode: "", payment_method: "COD",
  });

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value });

  // Not logged in
  if (!user) {
    return (
      <Shell>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 20 }}>
          <div style={glassCard}>
            <p style={{ fontSize: 14, color: "rgba(254,249,233,0.6)", letterSpacing: "0.03em", marginBottom: 20 }}>Please sign in to continue checkout</p>
            <button onClick={() => setLocation("/login")} style={btnGold}>Sign In</button>
          </div>
        </div>
      </Shell>
    );
  }

  // Empty cart
  if (items.length === 0 && !orderPlaced) {
    return (
      <Shell>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 20 }}>
          <div style={{ ...glassCard, textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "rgba(254,249,233,0.6)", marginBottom: 20 }}>Your cart is empty</p>
            <button onClick={() => setLocation("/collection")} style={btnGold}>Browse Collection</button>
          </div>
        </div>
      </Shell>
    );
  }

  // Order success
  if (orderPlaced) {
    return (
      <Shell>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", animation: "fadeUp 0.8s ease" }}>
          <div style={{ ...glassCard, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 28, color: "#c9a84c" }}>✓</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 300, letterSpacing: "0.06em", marginTop: 8 }}>Order Confirmed</h2>
            <p style={{ color: "rgba(254,249,233,0.5)", fontSize: 13 }}>#{orderPlaced}</p>
            <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.3)", margin: "8px 0" }} />
            <p style={{ fontSize: 12, color: "rgba(254,249,233,0.4)", maxWidth: 300, textAlign: "center", lineHeight: 1.6 }}>
              Thank you for your order. We'll notify you once it ships.
            </p>
            <button onClick={() => setLocation("/orders")} style={{ ...btnGold, marginTop: 16 }}>View My Orders</button>
          </div>
        </div>
      </Shell>
    );
  }

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.state) { setError("Please select a state."); return; }
    setError(""); setLoading(true);
    try {
      const { data: addr, error: addrErr } = await supabase.from("addresses").insert({
        customer_id: user.id, ...form,
      }).select().single();
      if (addrErr) throw new Error(addrErr.message);

      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      const { data: order, error: orderErr } = await supabase.from("orders").insert({
        order_number: orderNumber, customer_id: user.id, address_id: addr.id,
        subtotal: totalPrice, total: totalPrice, payment_method: form.payment_method,
        status: "pending", payment_status: "pending",
      }).select().single();
      if (orderErr) throw new Error(orderErr.message);

      await supabase.from("order_items").insert(
        items.map((item) => ({
          order_id: order.id, product_id: item.id, product_name: item.name,
          quantity: item.quantity, unit_price: parseFloat(item.price.replace(/[^0-9.]/g, "")),
          size: item.size || null,
        }))
      );
      clearCart();
      setOrderPlaced(orderNumber);
    } catch (err: any) {
      setError(err.message || "Failed to place order");
    }
    setLoading(false);
  };

  return (
    <Shell>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "120px 20px 80px", animation: "fadeUp 0.7s ease" }}>
        
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "0.08em", marginBottom: 12, fontFamily: "'Noto Serif', Georgia, serif" }}>Secure Checkout</h1>
          <div style={{ width: 48, height: 1, background: "#c9a84c", margin: "0 auto" }} />
        </div>

        {/* Using a grid to put Form on left and Summary on right for desktop */}
        <div style={{ display: "grid", gap: "32px", alignItems: "start" }} className="grid-cols-1 md:grid-cols-[1.5fr_1fr]">
          
          {/* LEFT: Form */}
          <div style={{ ...glassCard, padding: "40px 32px" }}>
            <form onSubmit={handleOrder} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h3 style={sectionTitle}>Shipping Address</h3>
              
              <Field label="Full Name" value={form.full_name} onChange={set("full_name")} />
              <Field label="Phone Number" value={form.phone} onChange={set("phone")} type="tel" />
              <Field label="Street Address" value={form.address_line} onChange={set("address_line")} />
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="City" value={form.city} onChange={set("city")} />
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(254,249,233,0.6)", marginBottom: 8 }}>State</label>
                  <select value={form.state} onChange={set("state")} required style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}>
                    <option value="" disabled style={{ background: "#1a1a1a", color: "rgba(255,255,255,0.4)" }}>Select State</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state} style={{ background: "#1a1a1a" }}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <Field label="Pincode" value={form.pincode} onChange={set("pincode")} />

              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "8px 0" }} />

              <h3 style={sectionTitle}>Payment Method</h3>
              <div>
                <select value={form.payment_method} onChange={set("payment_method")} style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}>
                  <option value="COD" style={{ background: "#1a1a1a" }}>Cash on Delivery</option>
                  <option value="UPI" style={{ background: "#1a1a1a" }}>UPI</option>
                  <option value="Bank Transfer" style={{ background: "#1a1a1a" }}>Bank Transfer</option>
                </select>
              </div>

              {error && (
                <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", padding: "12px 16px", borderRadius: 8, fontSize: 13, color: "#fca5a5" }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} style={{ ...btnGold, marginTop: 16, opacity: loading ? 0.6 : 1, width: "100%", padding: "18px" }}>
                {loading ? "Placing Order..." : "Confirm & Place Order"}
              </button>
            </form>
          </div>

          {/* RIGHT: Order Summary */}
          <div style={{ ...glassCard, padding: "32px 24px", height: "max-content", position: "sticky", top: "100px" }}>
            <h3 style={sectionTitle}>Order Summary</h3>
            {items.map((item) => (
              <div key={item.id + (item.size || "")} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 16, color: "rgba(254,249,233,0.8)" }}>
                <span>{item.name} <span style={{ color: "rgba(254,249,233,0.4)" }}>× {item.quantity}</span></span>
                <span>{item.price}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(201,168,76,0.15)", marginTop: 16, paddingTop: 16, display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 600 }}>
              <span>Total</span>
              <span style={{ color: "#c9a84c" }}>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
          </div>

        </div>
      </div>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        input:focus, select:focus { border-color: rgba(201,168,76,0.6) !important; outline: none; }
        input::placeholder { color: rgba(254,249,233,0.2); }
      `}</style>
    </Shell>
  );
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "radial-gradient(circle at 50% 0%, #2a2512 0%, #13120a 50%)", 
      color: "#fef9e9", 
      fontFamily: "'Manrope', sans-serif" 
    }}>
      <NavbarSection />
      {children}
      <FooterSection />
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(254,249,233,0.6)", marginBottom: 8 }}>{label}</label>
      <input type={type} value={value} onChange={onChange} required style={inputStyle} />
    </div>
  );
}

const glassCard: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.02)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "20px",
  boxShadow: "0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
};

const sectionTitle: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
  color: "rgba(254,249,233,0.5)", marginBottom: 16,
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "16px", 
  background: "rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(201, 168, 76, 0.2)", 
  borderRadius: "8px",
  color: "#fef9e9",
  fontSize: 14, fontFamily: "'Manrope', sans-serif", outline: "none",
  transition: "all 0.3s ease",
};

const btnGold: React.CSSProperties = {
  padding: "16px 36px", background: "#c9a84c", color: "#13120a",
  border: "none", borderRadius: "8px", fontSize: 12, fontWeight: 800, letterSpacing: "0.15em",
  textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
};
