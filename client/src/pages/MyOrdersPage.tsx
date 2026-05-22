import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  payment_method: string;
  created_at: string;
  order_items: { product_name: string; quantity: number; unit_price: number }[];
}

const STATUS_MAP: Record<string, { color: string; label: string }> = {
  pending: { color: "rgba(254,249,233,0.5)", label: "Pending" },
  confirmed: { color: "#c9a84c", label: "Confirmed" },
  shipped: { color: "#60a5fa", label: "Shipped" },
  delivered: { color: "#4ade80", label: "Delivered" },
  cancelled: { color: "#f87171", label: "Cancelled" },
};

export const MyOrdersPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("orders")
      .select("*, order_items(product_name, quantity, unit_price)")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setOrders(data || []); setLoading(false); });
  }, [user]);

  if (!authLoading && !user) {
    return (
      <Shell>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 20 }}>
          <p style={{ fontSize: 14, color: "rgba(254,249,233,0.6)" }}>Please sign in to view your orders</p>
          <button onClick={() => setLocation("/login")} style={btnGold}>Sign In</button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 20px", animation: "fadeUp 0.7s ease" }}>
        <h1 style={{ fontSize: 20, fontWeight: 300, letterSpacing: "0.08em", marginBottom: 8 }}>My Orders</h1>
        <div style={{ width: 48, height: 1, background: "#c9a84c", marginBottom: 40 }} />

        {loading ? (
          <p style={{ color: "rgba(254,249,233,0.4)", fontSize: 13 }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 16, opacity: 0.3 }}>✦</div>
            <p style={{ color: "rgba(254,249,233,0.5)", fontSize: 14, marginBottom: 24 }}>No orders yet</p>
            <button onClick={() => setLocation("/collection")} style={btnGold}>Explore Collection</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {orders.map((order) => {
              const st = STATUS_MAP[order.status] || STATUS_MAP.pending;
              return (
                <div key={order.id} style={{ padding: 24, background: "rgba(254,249,233,0.02)", border: "1px solid rgba(201,168,76,0.12)", transition: "border-color 0.3s" }}>
                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>#{order.order_number}</span>
                      <div style={{ fontSize: 11, color: "rgba(254,249,233,0.4)", marginTop: 4 }}>
                        {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        {" • "}{order.payment_method}
                      </div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: st.color, padding: "4px 10px", border: `1px solid ${st.color}33` }}>
                      {st.label}
                    </span>
                  </div>

                  {/* Items */}
                  {order.order_items.map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, color: "rgba(254,249,233,0.7)" }}>
                      <span>{item.product_name} <span style={{ color: "rgba(254,249,233,0.35)" }}>× {item.quantity}</span></span>
                      <span>₹{(item.unit_price * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}

                  {/* Total */}
                  <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", marginTop: 14, paddingTop: 14, display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 600 }}>
                    <span>Total</span>
                    <span style={{ color: "#c9a84c" }}>₹{Number(order.total).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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

const btnGold: React.CSSProperties = {
  padding: "16px 36px", background: "#c9a84c", color: "#13120a",
  border: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
  textTransform: "uppercase", cursor: "pointer",
};
