import { useState, useEffect, useRef } from "react";
import { uploadImage } from "@/lib/storage";
import { supabase } from "@/lib/supabase";

// ─── TYPES ─────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  category: string;
  price: string | number;
  description: string;
  image: string;
  is_new: boolean;
  gallery?: string[];
}

interface SiteSetting {
  key: string;
  value: string;
}

// ─── CONSTANTS ──────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "manidoro2025";
const CATEGORIES = ["Rings", "Necklaces", "Pendants", "Bracelets", "Cuffs & Bangles", "Earrings", "Sets"];

// ─── TOAST ──────────────────────────────────────────────────────────────────
function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div style={{
      position: "fixed", bottom: 32, right: 32, zIndex: 9999,
      background: type === "success" ? "#1d1c12" : "#7f1d1d",
      color: "#fef9e9", padding: "14px 22px",
      border: `1px solid ${type === "success" ? "#c9a84c" : "#ef4444"}`,
      fontFamily: "'Manrope', sans-serif", fontSize: 13,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", gap: 10,
      animation: "slideUp 0.3s ease",
    }}>
      <span style={{ fontSize: 16 }}>{type === "success" ? "✓" : "✕"}</span>
      {msg}
    </div>
  );
}

// ─── IMAGE UPLOADER ──────────────────────────────────────────────────────────
function ImageUploader({
  label, current, onUploaded, multiple = false
}: {
  label: string;
  current?: string | string[];
  onUploaded: (urls: string | string[]) => void;
  multiple?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>(
    multiple ? (current as string[] || []) : (current ? [current as string] : [])
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadImage(file);
        urls.push(url);
      }
      if (multiple) {
        const next = [...previews, ...urls];
        setPreviews(next);
        onUploaded(next);
      } else {
        setPreviews([urls[0]]);
        onUploaded(urls[0]);
      }
    } catch (e: any) {
      alert("Upload failed: " + e.message);
    }
    setUploading(false);
  };

  const removeImg = (idx: number) => {
    const next = previews.filter((_, i) => i !== idx);
    setPreviews(next);
    if (multiple) onUploaded(next);
    else onUploaded("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(254,249,233,0.5)", fontFamily: "'Manrope', sans-serif" }}>
        {label}
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {previews.map((p, i) => (
          <div key={i} style={{ position: "relative", width: 90, height: 90, border: "1px solid rgba(201,168,76,0.3)", overflow: "hidden" }}>
            <img src={p} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <button onClick={() => removeImg(i)} style={{ position: "absolute", top: 3, right: 3, background: "#7f1d1d", border: "none", color: "#fff", width: 18, height: 18, cursor: "pointer", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
        ))}
        {(multiple || previews.length === 0) && (
          <div
            onClick={() => inputRef.current?.click()}
            style={{ width: 90, height: 90, border: "1.5px dashed rgba(201,168,76,0.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: uploading ? "not-allowed" : "pointer", color: "rgba(201,168,76,0.6)", fontSize: 11, fontFamily: "'Manrope', sans-serif", gap: 4 }}
          >
            {uploading ? <span style={{ fontSize: 18 }}>⏳</span> : <span style={{ fontSize: 22 }}>+</span>}
            <span>{uploading ? "Uploading…" : "Add"}</span>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple={multiple} style={{ display: "none" }} onChange={e => handleFiles(e.target.files)} />
    </div>
  );
}

// ─── PRODUCT FORM MODAL ──────────────────────────────────────────────────────
function ProductModal({
  product, onClose, onSaved
}: {
  product?: Product | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || CATEGORIES[0],
    price: product?.price?.toString().replace(/[₹$,]/g, "") || "",
    description: product?.description || "",
    image: product?.image || "",
    gallery: product?.gallery || [],
    is_new: product?.is_new ?? true,
  });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image) {
      alert("Please fill Name, Price and upload a Thumbnail.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        category: form.category,
        price: parseFloat(form.price.replace(/[^0-9.]/g, "")),
        description: form.description,
        image: form.image,
        gallery: form.gallery,
        is_new: form.is_new,
        is_active: true,
      };

      if (isEdit && product) {
        const { error } = await supabase.from("products").update(payload).eq("id", product.id);
        if (error) throw error;
      } else {
        const id = form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        const { error } = await supabase.from("products").insert({ ...payload, id });
        if (error) throw error;
      }
      onSaved();
      onClose();
    } catch (e: any) {
      alert("Save failed: " + e.message);
    }
    setSaving(false);
  };

  const inp = (label: string, key: string, type = "text", full = false) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, gridColumn: full ? "1 / -1" : "auto" }}>
      <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(254,249,233,0.5)", fontFamily: "'Manrope', sans-serif" }}>{label}</label>
      {key === "description" ? (
        <textarea
          rows={3}
          value={(form as any)[key]}
          onChange={e => set(key, e.target.value)}
          style={{ background: "rgba(254,249,233,0.05)", border: "1px solid rgba(201,168,76,0.2)", color: "#fef9e9", padding: "10px 12px", fontFamily: "'Manrope', sans-serif", fontSize: 13, resize: "vertical", outline: "none" }}
        />
      ) : (
        <input
          type={type}
          value={(form as any)[key]}
          onChange={e => set(key, e.target.value)}
          style={{ background: "rgba(254,249,233,0.05)", border: "1px solid rgba(201,168,76,0.2)", color: "#fef9e9", padding: "10px 12px", fontFamily: "'Manrope', sans-serif", fontSize: 13, outline: "none" }}
        />
      )}
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#1a1908", border: "1px solid rgba(201,168,76,0.2)", width: "100%", maxWidth: 680, maxHeight: "90vh", overflowY: "auto", padding: 36 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: 22, color: "#fef9e9", fontWeight: 400, margin: 0 }}>
            {isEdit ? "Edit Product" : "New Product"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(254,249,233,0.4)", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>✕</button>
        </div>

        {/* Form Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {inp("Product Name", "name", "text", true)}

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(254,249,233,0.5)", fontFamily: "'Manrope', sans-serif" }}>Category</label>
            <select value={form.category} onChange={e => set("category", e.target.value)}
              style={{ background: "#1a1908", border: "1px solid rgba(201,168,76,0.2)", color: "#fef9e9", padding: "10px 12px", fontFamily: "'Manrope', sans-serif", fontSize: 13, outline: "none" }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {inp("Price (numbers only, e.g. 850)", "price")}
          {inp("Description", "description", "text", true)}

          <div style={{ gridColumn: "1 / -1", height: 1, background: "rgba(201,168,76,0.1)" }} />

          <div style={{ gridColumn: "1 / -1" }}>
            <ImageUploader
              label="Thumbnail Image (main card photo)"
              current={form.image}
              onUploaded={url => set("image", url as string)}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <ImageUploader
              label="Gallery Images (up to 5 extra photos)"
              current={form.gallery}
              multiple
              onUploaded={urls => set("gallery", urls as string[])}
            />
          </div>

          <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => set("is_new", !form.is_new)}
              style={{ width: 44, height: 24, borderRadius: 12, background: form.is_new ? "#c9a84c" : "rgba(254,249,233,0.1)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
              <span style={{ position: "absolute", top: 3, left: form.is_new ? 22 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
            </button>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, color: "#fef9e9" }}>Mark as "New"</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 24px", background: "none", border: "1px solid rgba(254,249,233,0.2)", color: "rgba(254,249,233,0.6)", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving}
            style={{ padding: "10px 28px", background: saving ? "rgba(201,168,76,0.4)" : "#c9a84c", border: "none", color: "#1d1c12", cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", transition: "background 0.2s" }}>
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCTS TAB ────────────────────────────────────────────────────────────
function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; product?: Product | null }>({ open: false });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [search, setSearch] = useState("");

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { showToast("Delete failed: " + error.message, "error"); return; }
    showToast("Product deleted.");
    setDeleteConfirm(null);
    load();
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      {modal.open && (
        <ProductModal
          product={modal.product}
          onClose={() => setModal({ open: false })}
          onSaved={() => { showToast(modal.product ? "Product updated!" : "Product created!"); load(); }}
        />
      )}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#1a1908", border: "1px solid rgba(201,168,76,0.2)", padding: 32, maxWidth: 400, textAlign: "center" }}>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: "#fef9e9", marginBottom: 20 }}>Are you sure you want to delete this product? This cannot be undone.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: "8px 20px", background: "none", border: "1px solid rgba(254,249,233,0.2)", color: "#fef9e9", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12 }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm!)} style={{ padding: "8px 20px", background: "#7f1d1d", border: "none", color: "#fff", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 16, flexWrap: "wrap" }}>
        <input
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ background: "rgba(254,249,233,0.05)", border: "1px solid rgba(201,168,76,0.2)", color: "#fef9e9", padding: "10px 16px", fontFamily: "'Manrope', sans-serif", fontSize: 13, outline: "none", width: 260 }}
        />
        <button
          onClick={() => setModal({ open: true, product: null })}
          style={{ padding: "10px 24px", background: "#c9a84c", border: "none", color: "#1d1c12", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          + Add Product
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "rgba(254,249,233,0.4)", fontFamily: "'Manrope', sans-serif" }}>Loading products…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "rgba(254,249,233,0.3)", fontFamily: "'Manrope', sans-serif" }}>No products found.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {filtered.map(p => (
            <div key={p.id} style={{ background: "rgba(254,249,233,0.03)", border: "1px solid rgba(201,168,76,0.15)", overflow: "hidden", transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)")}>
              <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#111" }}>
                <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <p style={{ fontFamily: "'Noto Serif', serif", fontSize: 14, color: "#fef9e9", margin: 0, fontWeight: 400 }}>{p.name}</p>
                  {p.is_new && <span style={{ fontSize: 9, fontWeight: 700, background: "#c9a84c", color: "#1d1c12", padding: "2px 6px", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>NEW</span>}
                </div>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, color: "rgba(254,249,233,0.4)", margin: "0 0 10px" }}>{p.category} · ₹{Number(p.price).toLocaleString("en-IN")}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setModal({ open: true, product: p })}
                    style={{ flex: 1, padding: "7px 0", background: "none", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Edit
                  </button>
                  <button onClick={() => setDeleteConfirm(p.id)}
                    style={{ padding: "7px 12px", background: "none", border: "1px solid rgba(239,68,68,0.3)", color: "rgba(239,68,68,0.7)", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 11 }}>
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SETTINGS TAB ────────────────────────────────────────────────────────────
function SettingsTab() {
  const [settings, setSettings] = useState<Record<string, string>>({
    contact_email: "",
    whatsapp: "",
    instagram: "",
    facebook: "",
    pinterest: "",
    tagline: "",
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    supabase.from("site_settings").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((r: SiteSetting) => { map[r.key] = r.value; });
        setSettings(s => ({ ...s, ...map }));
      }
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const rows = Object.entries(settings).map(([key, value]) => ({ key, value }));
      for (const row of rows) {
        const { error } = await supabase.from("site_settings").upsert(row, { onConflict: "key" });
        if (error) throw error;
      }
      showToast("Settings saved!");
    } catch (e: any) {
      showToast("Save failed: " + e.message, "error");
    }
    setSaving(false);
  };

  const fields = [
    { key: "contact_email", label: "Contact Email", placeholder: "hello@manidoro.com" },
    { key: "whatsapp", label: "WhatsApp Number", placeholder: "+91 98765 43210" },
    { key: "instagram", label: "Instagram URL", placeholder: "https://instagram.com/manidoro" },
    { key: "facebook", label: "Facebook URL", placeholder: "https://facebook.com/manidoro" },
    { key: "pinterest", label: "Pinterest URL", placeholder: "https://pinterest.com/manidoro" },
    { key: "tagline", label: "Store Tagline (shown in hero)", placeholder: "Discover raw elegance…" },
  ];

  return (
    <div style={{ maxWidth: 560 }}>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {fields.map(f => (
          <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(254,249,233,0.5)", fontFamily: "'Manrope', sans-serif" }}>{f.label}</label>
            <input
              value={settings[f.key] || ""}
              onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              style={{ background: "rgba(254,249,233,0.05)", border: "1px solid rgba(201,168,76,0.2)", color: "#fef9e9", padding: "11px 14px", fontFamily: "'Manrope', sans-serif", fontSize: 13, outline: "none" }}
            />
          </div>
        ))}
        <button onClick={save} disabled={saving}
          style={{ padding: "12px 32px", background: saving ? "rgba(201,168,76,0.4)" : "#c9a84c", border: "none", color: "#1d1c12", cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", alignSelf: "flex-start" }}>
          {saving ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}

// ─── MAIN ADMIN PAGE ──────────────────────────────────────────────────────────
export const AdminPage = (): JSX.Element => {
  const [authed, setAuthed] = useState(() => localStorage.getItem("admin_authed") === "1");
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "settings">("products");

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem("admin_authed", "1");
      setAuthed(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_authed");
    setAuthed(false);
  };

  // ── LOGIN SCREEN ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#13120a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Manrope', sans-serif" }}>
        <style>{`@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`}</style>
        <div style={{ width: "100%", maxWidth: 380, padding: "0 24px" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <img src="/logo.png" alt="Mani D'Oro" style={{ height: 64, marginBottom: 16 }} />
            <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", margin: 0 }}>Admin Panel</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: pwError ? "shake 0.3s ease" : "none" }}>
            <div>
              <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(254,249,233,0.4)", display: "block", marginBottom: 8 }}>Password</label>
              <input
                type="password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                onKeyDown={e => e.key === "Enter" && login()}
                style={{ width: "100%", background: "rgba(254,249,233,0.04)", border: `1px solid ${pwError ? "#ef4444" : "rgba(201,168,76,0.25)"}`, color: "#fef9e9", padding: "13px 16px", fontSize: 14, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                placeholder="Enter admin password"
              />
              {pwError && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 6 }}>Incorrect password.</p>}
            </div>
            <button
              onClick={login}
              style={{ padding: "13px", background: "#c9a84c", border: "none", color: "#1d1c12", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Enter Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ─────────────────────────────────────────────────────────────
  const tabs = [
    { id: "products", label: "Products", icon: "◈" },
    { id: "settings", label: "Site Settings", icon: "⚙" },
  ] as const;

  return (
    <div style={{ minHeight: "100vh", background: "#13120a", display: "flex", fontFamily: "'Manrope', sans-serif" }}>
      <style>{`@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

      {/* Sidebar */}
      <aside style={{ width: 240, background: "#0e0d07", borderRight: "1px solid rgba(201,168,76,0.12)", display: "flex", flexDirection: "column", padding: "32px 0", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "0 24px 32px", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
          <img src="/logo.png" alt="Mani D'Oro" style={{ height: 40 }} />
          <p style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,168,76,0.5)", margin: "8px 0 0" }}>Manager Dashboard</p>
        </div>

        <nav style={{ flex: 1, padding: "24px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: activeTab === t.id ? "rgba(201,168,76,0.1)" : "none", border: activeTab === t.id ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent", color: activeTab === t.id ? "#c9a84c" : "rgba(254,249,233,0.45)", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: activeTab === t.id ? 700 : 400, letterSpacing: "0.05em", transition: "all 0.15s" }}>
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "0 12px" }}>
          <button onClick={logout}
            style={{ width: "100%", padding: "10px 16px", background: "none", border: "1px solid rgba(239,68,68,0.2)", color: "rgba(239,68,68,0.5)", cursor: "pointer", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)"; e.currentTarget.style.color = "rgba(239,68,68,0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; e.currentTarget.style.color = "rgba(239,68,68,0.5)"; }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "40px 40px", overflowY: "auto" }}>
        <div style={{ marginBottom: 32, borderBottom: "1px solid rgba(201,168,76,0.1)", paddingBottom: 20 }}>
          <h1 style={{ fontFamily: "'Noto Serif', serif", fontSize: 28, color: "#fef9e9", fontWeight: 400, margin: "0 0 4px" }}>
            {activeTab === "products" ? "Products" : "Site Settings"}
          </h1>
          <p style={{ fontSize: 12, color: "rgba(254,249,233,0.35)", margin: 0, letterSpacing: "0.05em" }}>
            {activeTab === "products" ? "Add, edit, or remove products and their images" : "Update contact info and social links"}
          </p>
        </div>

        {activeTab === "products" && <ProductsTab />}
        {activeTab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
};
