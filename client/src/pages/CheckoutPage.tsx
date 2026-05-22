import { useState } from "react";
import { useLocation } from "wouter";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";

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
          <p style={{ fontSize: 14, color: "rgba(254,249,233,0.6)", letterSpacing: "0.03em" }}>Please sign in to continue checkout</p>
          <button onClick={() => setLocation("/login")} style={btnGold}>Sign In</button>
        </div>
      </Shell>
    );
  }

  // Empty cart
  if (items.length === 0 && !orderPlaced) {
    return (
      <Shell>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 20 }}>
          <p style={{ fontSize: 14, color: "rgba(254,249,233,0.6)" }}>Your cart is empty</p>
          <button onClick={() => setLocation("/collection")} style={btnGold}>Browse Collection</button>
        </div>
      </Shell>
    );
  }

  // Order success
  if (orderPlaced) {
    return (
      <Shell>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16, animation: "fadeUp 0.8s ease" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 28, color: "#c9a84c" }}>✓</span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 300, letterSpacing: "0.06em", marginTop: 8 }}>Order Confirmed</h2>
          <p style={{ color: "rgba(254,249,233,0.5)", fontSize: 13 }}>#{orderPlaced}</p>
          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.3)", margin: "8px 0" }} />
          <p style={{ fontSize: 12, color: "rgba(254,249,233,0.4)", maxWidth: 300, textAlign: "center", lineHeight: 1.6 }}>
            Thank you for your order. We'll notify you once it ships.
          </p>
          <button onClick={() => setLocation("/orders")} style={{ ...btnGold, marginTop: 8 }}>View My Orders</button>
        </div>
      </Shell>
    );
  }

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "48px 20px", animation: "fadeUp 0.7s ease" }}>
        <h1 style={{ fontSize: 20, fontWeight: 300, letterSpacing: "0.08em", marginBottom: 8 }}>Checkout</h1>
        <div style={{ width: 48, height: 1, background: "#c9a84c", marginBottom: 40 }} />

        {/* Order Summary */}
        <div style={{ marginBottom: 40, padding: 24, background: "rgba(254,249,233,0.02)", border: "1px solid rgba(201,168,76,0.15)" }}>
          <h3 style={sectionTitle}>Order Summary</h3>
          {items.map((item) => (
            <div key={item.id + (item.size || "")} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 10, color: "rgba(254,249,233,0.8)" }}>
              <span>{item.name} <span style={{ color: "rgba(254,249,233,0.4)" }}>× {item.quantity}</span></span>
              <span>{item.price}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(201,168,76,0.15)", marginTop: 16, paddingTop: 16, display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 600 }}>
            <span>Total</span>
            <span style={{ color: "#c9a84c" }}>₹{totalPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleOrder} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={sectionTitle}>Shipping Address</h3>
          <Field label="Full Name" value={form.full_name} onChange={set("full_name")} />
          <Field label="Phone" value={form.phone} onChange={set("phone")} type="tel" />
          <Field label="Address" value={form.address_line} onChange={set("address_line")} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="City" value={form.city} onChange={set("city")} />
            <Field label="State" value={form.state} onChange={set("state")} />
          </div>
          <Field label="Pincode" value={form.pincode} onChange={set("pincode")} />

          <h3 style={{ ...sectionTitle, marginTop: 12 }}>Payment Method</h3>
          <select value={form.payment_method} onChange={set("payment_method")} style={{ ...inputStyle, cursor: "pointer" }}>
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", padding: "10px 14px", fontSize: 12, color: "#fca5a5" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ ...btnGold, marginTop: 12, opacity: loading ? 0.6 : 1 }}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </Shell>
  );
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#13120a", color: "#fef9e9", fontFamily: "'Manrope', sans-serif" }}>
      <NavbarSection />
      {children}
      <FooterSection />
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(254,249,233,0.4)", marginBottom: 6 }}>{label}</label>
      <input type={type} value={value} onChange={onChange} required style={inputStyle} />
    </div>
  );
}

const sectionTitle: React.CSSProperties = {
  fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
  color: "rgba(254,249,233,0.4)", marginBottom: 16,
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 16px", background: "rgba(254,249,233,0.03)",
  border: "1px solid rgba(201,168,76,0.2)", color: "#fef9e9",
  fontSize: 14, fontFamily: "'Manrope', sans-serif", outline: "none",
};

const btnGold: React.CSSProperties = {
  padding: "16px 36px", background: "#c9a84c", color: "#13120a",
  border: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
  textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
};
