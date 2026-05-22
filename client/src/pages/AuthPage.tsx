import { useState } from "react";
import { useLocation } from "wouter";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";
import { useAuth } from "@/lib/AuthContext";

function EyeIcon({ open }: { open: boolean }) {
  if (open) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
}

export const AuthPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { user, sendOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) { setLocation("/"); return <></>; }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) { setError("Enter a valid 10-digit mobile number"); return; }
    setError(""); setLoading(true);
    const { error: err } = await sendOtp(phone);
    if (err) setError(err);
    else setStep("otp");
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) { setError("Enter the 6-digit OTP"); return; }
    setError(""); setLoading(true);
    const { error: err } = await verifyOtp(phone, otp);
    if (err) setError(err);
    else setLocation("/");
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#13120a", color: "#fef9e9", fontFamily: "'Manrope', sans-serif" }}>
      <NavbarSection />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: "60px 20px" }}>
        <div style={{ width: "100%", maxWidth: 380, animation: "fadeUp 0.8s ease" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <img src="/logo.png" alt="Mani D'Oro" style={{ height: 56, marginBottom: 16 }} />
            <div style={{ width: 48, height: 1, background: "#c9a84c", margin: "0 auto 16px" }} />
            <h1 style={{ fontSize: 20, fontWeight: 300, letterSpacing: "0.08em", margin: 0 }}>
              {step === "phone" ? "Welcome" : "Verify OTP"}
            </h1>
            <p style={{ fontSize: 12, color: "rgba(254,249,233,0.4)", marginTop: 8, letterSpacing: "0.05em" }}>
              {step === "phone" ? "Enter your mobile number to continue" : `OTP sent to +91 ${phone}`}
            </p>
          </div>

          {step === "phone" ? (
            <form onSubmit={handleSendOtp} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Mobile Number</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(201,168,76,0.2)", background: "rgba(254,249,233,0.03)" }}>
                  <span style={{ padding: "14px 12px 14px 16px", fontSize: 14, color: "rgba(254,249,233,0.5)", borderRight: "1px solid rgba(201,168,76,0.15)" }}>+91</span>
                  <input
                    type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="9876543210" required maxLength={10}
                    style={{ ...inputStyle, border: "none", flex: 1 }}
                  />
                </div>
                <p style={{ fontSize: 11, color: "rgba(254,249,233,0.3)", marginTop: 6 }}>We'll send a 6-digit OTP to this number</p>
              </div>

              {error && <ErrorBox msg={error} />}

              <button type="submit" disabled={loading} style={{ ...btnGold, opacity: loading ? 0.6 : 1 }}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Enter 6-digit OTP</label>
                <input
                  type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="• • • • • •" required maxLength={6} autoFocus
                  style={{ ...inputStyle, textAlign: "center", fontSize: 20, letterSpacing: "0.5em" }}
                />
                <p style={{ fontSize: 11, color: "rgba(254,249,233,0.3)", marginTop: 6 }}>Check your SMS for the verification code</p>
              </div>

              {error && <ErrorBox msg={error} />}

              <button type="submit" disabled={loading} style={{ ...btnGold, opacity: loading ? 0.6 : 1 }}>
                {loading ? "Verifying..." : "Verify & Sign In"}
              </button>

              <button type="button" onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                style={{ background: "none", border: "none", color: "rgba(254,249,233,0.4)", fontSize: 12, cursor: "pointer", marginTop: 4 }}>
                ← Change number
              </button>
            </form>
          )}
        </div>
      </div>
      <FooterSection />
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", padding: "10px 14px", fontSize: 12, color: "#fca5a5", display: "flex", alignItems: "center", gap: 8 }}>
      <span>⚠</span> {msg}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
  textTransform: "uppercase", color: "rgba(254,249,233,0.4)", marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 16px", background: "rgba(254,249,233,0.03)",
  border: "1px solid rgba(201,168,76,0.2)", color: "#fef9e9",
  fontSize: 14, fontFamily: "'Manrope', sans-serif", outline: "none",
};

const btnGold: React.CSSProperties = {
  marginTop: 8, padding: "16px", background: "#c9a84c", color: "#13120a",
  border: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
  textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
};
