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
  long_description?: string;
  image: string;
  is_new: boolean;
  gallery?: string[];
  details_bullets?: string[];
  materials_bullets?: string[];
  sourcing_bullets?: string[];
  shipping_note?: string;

}

interface SiteSetting {
  key: string;
  value: string;
}

// ─── CONSTANTS ──────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "manidoro2025";
const BASE_CATEGORIES = ["Earrings", "Pendants", "Bracelets", "Rings", "Anklets"];

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

// ─── BULLET LIST EDITOR ──────────────────────────────────────────────────────
function BulletEditor({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const L = { fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(254,249,233,0.5)", fontFamily: "'Manrope', sans-serif", marginBottom: 8, display: "block" };
  const I = { background: "rgba(254,249,233,0.05)", border: "1px solid rgba(201,168,76,0.15)", color: "#fef9e9", padding: "8px 10px", fontFamily: "'Manrope', sans-serif", fontSize: 12, outline: "none", flex: 1 };
  const rows = value.length > 0 ? value : ["", "", "", ""];
  const update = (i: number, v: string) => { const n = [...rows]; n[i] = v; onChange(n.filter((_,j) => j < rows.length)); };
  const add = () => onChange([...rows, ""]);
  const remove = (i: number) => onChange(rows.filter((_, j) => j !== i));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={L}>{label}</label>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ color: "rgba(201,168,76,0.4)", fontSize: 11, width: 14, flexShrink: 0 }}>•</span>
          <input value={r} onChange={e => update(i, e.target.value)} placeholder={`Point ${i + 1}…`} style={I} />
          {rows.length > 1 && <button onClick={() => remove(i)} style={{ background: "none", border: "none", color: "rgba(239,68,68,0.5)", cursor: "pointer", fontSize: 14, padding: "0 4px" }}>✕</button>}
        </div>
      ))}
      <button onClick={add} style={{ alignSelf: "flex-start", background: "none", border: "1px dashed rgba(201,168,76,0.3)", color: "rgba(201,168,76,0.5)", cursor: "pointer", fontSize: 11, padding: "4px 10px", fontFamily: "'Manrope', sans-serif" }}>+ Add bullet</button>
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
  // Load custom categories from localStorage (same source as public site)
  const storedExtra = (() => { try { const s = localStorage.getItem("mdoro_extra_categories"); return s ? JSON.parse(s) as {value:string;label:string}[] : []; } catch { return []; } })();
  const allCats = [...BASE_CATEGORIES.map(c => c), ...storedExtra.map((e: {value:string}) => e.value)];

  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || BASE_CATEGORIES[0],
    price: product?.price?.toString().replace(/[₹$,]/g, "") || "",
    description: product?.description || "",
    long_description: product?.long_description || "",
    image: product?.image || "",
    gallery: product?.gallery || [],
    is_new: product?.is_new ?? true,
    details_bullets: product?.details_bullets || ["", "", "", ""],
    materials_bullets: product?.materials_bullets || ["", "", "", ""],
    sourcing_bullets: product?.sourcing_bullets || ["", "", "", ""],
    shipping_note: product?.shipping_note || "",
  });
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState<"basic" | "content" | "tabs" | "images">("basic");

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
        long_description: form.long_description,
        image: form.image,
        gallery: form.gallery,
        is_new: form.is_new,
        is_active: true,
        details_bullets: form.details_bullets.filter(b => b.trim()),
        materials_bullets: form.materials_bullets.filter(b => b.trim()),
        sourcing_bullets: form.sourcing_bullets.filter(b => b.trim()),
        shipping_note: form.shipping_note,
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

  const fieldStyle = { background: "rgba(254,249,233,0.05)", border: "1px solid rgba(201,168,76,0.2)", color: "#fef9e9", padding: "10px 12px", fontFamily: "'Manrope', sans-serif", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" as const };
  const labelStyle = { fontSize: 11, fontWeight: 700 as const, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(254,249,233,0.5)", fontFamily: "'Manrope', sans-serif", display: "block", marginBottom: 6 };
  const sectionBtnStyle = (active: boolean) => ({ padding: "7px 14px", background: active ? "rgba(201,168,76,0.15)" : "none", border: active ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(254,249,233,0.1)", color: active ? "#c9a84c" : "rgba(254,249,233,0.4)", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 11, fontWeight: active ? 700 as const : 400 as const, letterSpacing: "0.1em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const });

  const sections = [
    { id: "basic", label: "Basic Info" },
    { id: "content", label: "Descriptions" },
    { id: "tabs", label: "Tab Bullets" },
    { id: "images", label: "Images" },
  ] as const;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#1a1908", border: "1px solid rgba(201,168,76,0.25)", width: "100%", maxWidth: 740, maxHeight: "92vh", display: "flex", flexDirection: "column" }}>
        
        {/* Modal Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 28px", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
          <div>
            <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, color: "#fef9e9", fontWeight: 400, margin: "0 0 2px" }}>
              {isEdit ? `Editing: ${product?.name}` : "New Product"}
            </h2>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, color: "rgba(254,249,233,0.35)", margin: 0 }}>Fill in all sections to build the complete product page</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(254,249,233,0.4)", cursor: "pointer", fontSize: 22, lineHeight: 1, padding: 4 }}>✕</button>
        </div>

        {/* Section Tabs */}
        <div style={{ display: "flex", gap: 6, padding: "14px 28px", borderBottom: "1px solid rgba(201,168,76,0.08)", overflowX: "auto", flexShrink: 0 }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setSection(s.id)} style={sectionBtnStyle(section === s.id)}>{s.label}</button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div style={{ overflowY: "auto", padding: "24px 28px", flex: 1 }}>

          {/* ── BASIC INFO ── */}
          {section === "basic" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Product Name</label>
                <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Mani Link Chain" style={fieldStyle} />
              </div>

              <div>
                <label style={labelStyle}>Category</label>
                <select value={form.category} onChange={e => set("category", e.target.value)}
                  style={{ ...fieldStyle, background: "#1a1908" }}>
                  {allCats.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Price (numbers only, e.g. 12400)</label>
                <input value={form.price} onChange={e => set("price", e.target.value)} placeholder="e.g. 12400" style={fieldStyle} />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Shipping Note (below Add to Cart)</label>
                <input value={form.shipping_note} onChange={e => set("shipping_note", e.target.value)}
                  placeholder="e.g. Handcrafted to order · 4–6 weeks · Free worldwide shipping"
                  style={fieldStyle} />
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, color: "rgba(254,249,233,0.3)", margin: "6px 0 0" }}>Leave blank for default text.</p>
              </div>

              <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}>
                <button onClick={() => set("is_new", !form.is_new)}
                  style={{ width: 44, height: 24, borderRadius: 12, background: form.is_new ? "#c9a84c" : "rgba(254,249,233,0.1)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                  <span style={{ position: "absolute", top: 3, left: form.is_new ? 22 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
                </button>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, color: "#fef9e9" }}>Show "NEW" badge on this product</span>
              </div>
            </div>
          )}

          {/* ── DESCRIPTIONS ── */}
          {section === "content" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", padding: 14, borderLeft: "3px solid rgba(201,168,76,0.5)" }}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, color: "rgba(254,249,233,0.5)", margin: 0 }}>
                  <strong style={{ color: "#c9a84c" }}>Short Description</strong> — shown in bold italic under the product name (also shown on Collection cards).
                  <br /><strong style={{ color: "#c9a84c" }}>Long Description</strong> — shown in smaller text below it, describing the craftsmanship.
                </p>
              </div>
              <div>
                <label style={labelStyle}>Short Description (italic headline)</label>
                <textarea rows={2} value={form.description} onChange={e => set("description", e.target.value)}
                  placeholder="e.g. Each link forged individually, carrying the mark of its maker."
                  style={{ ...fieldStyle, resize: "vertical" }} />
              </div>
              <div>
                <label style={labelStyle}>Long Description (craftsmanship paragraph)</label>
                <textarea rows={4} value={form.long_description} onChange={e => set("long_description", e.target.value)}
                  placeholder="e.g. Crafted entirely by hand under the direct oversight of Creative Director…"
                  style={{ ...fieldStyle, resize: "vertical" }} />
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, color: "rgba(254,249,233,0.3)", margin: "6px 0 0" }}>Leave blank to use the default brand paragraph.</p>
              </div>
            </div>
          )}

          {/* ── TAB BULLETS ── */}
          {section === "tabs" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", padding: 14, borderLeft: "3px solid rgba(201,168,76,0.5)" }}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, color: "rgba(254,249,233,0.5)", margin: 0 }}>
                  These are the 3 tab sections on the product page — <strong style={{ color: "#c9a84c" }}>Details Legacy</strong>, <strong style={{ color: "#c9a84c" }}>Spec Materials</strong>, and <strong style={{ color: "#c9a84c" }}>Ethical Sourcing</strong>. Enter one bullet point per line. Leave blank to use the default brand text.
                </p>
              </div>
              <BulletEditor label="Details Legacy tab bullets" value={form.details_bullets} onChange={v => set("details_bullets", v)} />
              <div style={{ height: 1, background: "rgba(201,168,76,0.08)" }} />
              <BulletEditor label="Spec Materials tab bullets" value={form.materials_bullets} onChange={v => set("materials_bullets", v)} />
              <div style={{ height: 1, background: "rgba(201,168,76,0.08)" }} />
              <BulletEditor label="Ethical Sourcing tab bullets" value={form.sourcing_bullets} onChange={v => set("sourcing_bullets", v)} />
            </div>
          )}


          {/* ── IMAGES ── */}
          {section === "images" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", padding: 14, borderLeft: "3px solid rgba(201,168,76,0.5)" }}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, color: "rgba(254,249,233,0.5)", margin: 0 }}>
                  <strong style={{ color: "#c9a84c" }}>Thumbnail</strong> — the main card image shown on the Collection page. <strong style={{ color: "#c9a84c" }}>Gallery</strong> — additional photos shown in the product page carousel (first gallery photo is the default big view).
                </p>
              </div>
              <ImageUploader label="Thumbnail Image (collection card)" current={form.image} onUploaded={url => set("image", url as string)} />
              <div style={{ height: 1, background: "rgba(201,168,76,0.08)" }} />
              <ImageUploader label="Gallery Photos (up to 5 — first one shown big on page load)" current={form.gallery} multiple onUploaded={urls => set("gallery", urls as string[])} />
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div style={{ display: "flex", gap: 12, padding: "18px 28px", borderTop: "1px solid rgba(201,168,76,0.1)", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {sections.map((s, i) => (
              <div key={s.id} style={{ width: 28, height: 3, background: section === s.id ? "#c9a84c" : "rgba(254,249,233,0.1)", transition: "background 0.2s" }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ padding: "10px 22px", background: "none", border: "1px solid rgba(254,249,233,0.2)", color: "rgba(254,249,233,0.6)", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Cancel</button>
            <button onClick={handleSave} disabled={saving}
              style={{ padding: "10px 26px", background: saving ? "rgba(201,168,76,0.4)" : "#c9a84c", border: "none", color: "#1d1c12", cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "background 0.2s" }}>
              {saving ? "Saving…" : isEdit ? "Save All Changes" : "Create Product"}
            </button>
          </div>
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

// ─── CATEGORIES TAB ──────────────────────────────────────────────────────────
function CategoriesTab() {
  const [categories, setCategories] = useState<{ id?: string; name: string; sort_order: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Persist to both Supabase and localStorage so public site stays in sync
  const syncLocalStorage = (cats: { name: string }[]) => {
    const extra = cats
      .filter(c => !BASE_CATEGORIES.includes(c.name))
      .map(c => ({ value: c.name, label: c.name }));
    localStorage.setItem("mdoro_extra_categories", JSON.stringify(extra));
  };

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) {
        setCategories(data);
        syncLocalStorage(data);
      } else {
        // Supabase may not have the table yet — fall back to base categories
        const base = BASE_CATEGORIES.map((name, i) => ({ name, sort_order: i }));
        setCategories(base);
      }
    } catch {
      const base = BASE_CATEGORIES.map((name, i) => ({ name, sort_order: i }));
      setCategories(base);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setAdding(true);
    try {
      const sort_order = categories.length;
      const { error } = await supabase.from("categories").insert({ name: trimmed, sort_order });
      if (error) throw error;
      showToast(`"${trimmed}" added!`);
      setNewName("");
      await load();
    } catch (e: any) {
      // Table may not exist yet — save locally only
      const updated = [...categories, { name: trimmed, sort_order: categories.length }];
      setCategories(updated);
      syncLocalStorage(updated);
      setNewName("");
      showToast(`"${trimmed}" added (local only — categories table not found in Supabase).`, "error");
    }
    setAdding(false);
  };

  const handleDelete = async (name: string) => {
    if (BASE_CATEGORIES.includes(name)) {
      showToast("Default categories cannot be deleted.", "error");
      return;
    }
    try {
      await supabase.from("categories").delete().eq("name", name);
    } catch {}
    const updated = categories.filter(c => c.name !== name);
    setCategories(updated);
    syncLocalStorage(updated);
    showToast(`"${name}" removed.`);
  };

  const move = async (idx: number, dir: -1 | 1) => {
    const next = [...categories];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    const reordered = next.map((c, i) => ({ ...c, sort_order: i }));
    setCategories(reordered);
    syncLocalStorage(reordered);
    // persist new order to Supabase
    for (const c of reordered) {
      if (c.id) await supabase.from("categories").update({ sort_order: c.sort_order }).eq("id", c.id);
    }
  };

  const labelS = { fontSize: 11, fontWeight: 700 as const, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(254,249,233,0.5)", fontFamily: "'Manrope', sans-serif" };

  return (
    <div style={{ maxWidth: 540 }}>
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* Info banner */}
      <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", padding: 14, borderLeft: "3px solid rgba(201,168,76,0.5)", marginBottom: 28 }}>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, color: "rgba(254,249,233,0.5)", margin: 0 }}>
          Categories appear in the <strong style={{ color: "#c9a84c" }}>Collection page filter bar</strong> and the product form's category dropdown. The 5 base categories cannot be deleted. Drag ↑↓ to reorder.
        </p>
      </div>

      {loading ? (
        <div style={{ color: "rgba(254,249,233,0.35)", fontFamily: "'Manrope', sans-serif", padding: "40px 0" }}>Loading…</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 28, border: "1px solid rgba(201,168,76,0.15)" }}>
          {categories.map((cat, idx) => {
            const isBase = BASE_CATEGORIES.includes(cat.name);
            return (
              <div key={cat.name} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "13px 16px",
                borderBottom: idx < categories.length - 1 ? "1px solid rgba(201,168,76,0.08)" : "none",
                background: isBase ? "rgba(201,168,76,0.04)" : "transparent",
              }}>
                {/* Reorder arrows */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <button onClick={() => move(idx, -1)} disabled={idx === 0}
                    style={{ background: "none", border: "none", color: idx === 0 ? "rgba(254,249,233,0.12)" : "rgba(254,249,233,0.4)", cursor: idx === 0 ? "default" : "pointer", fontSize: 10, lineHeight: 1, padding: 0 }}>▲</button>
                  <button onClick={() => move(idx, 1)} disabled={idx === categories.length - 1}
                    style={{ background: "none", border: "none", color: idx === categories.length - 1 ? "rgba(254,249,233,0.12)" : "rgba(254,249,233,0.4)", cursor: idx === categories.length - 1 ? "default" : "pointer", fontSize: 10, lineHeight: 1, padding: 0 }}>▼</button>
                </div>

                {/* Name */}
                <span style={{ flex: 1, fontFamily: "'Manrope', sans-serif", fontSize: 13, color: "#fef9e9", letterSpacing: "0.03em" }}>
                  {cat.name}
                </span>

                {/* Badge */}
                {isBase && (
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", background: "rgba(201,168,76,0.1)", padding: "2px 7px" }}>Default</span>
                )}

                {/* Delete */}
                {!isBase && (
                  <button onClick={() => handleDelete(cat.name)}
                    style={{ background: "none", border: "1px solid rgba(239,68,68,0.25)", color: "rgba(239,68,68,0.6)", cursor: "pointer", fontSize: 11, padding: "4px 10px", fontFamily: "'Manrope', sans-serif" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(239,68,68,0.6)"; e.currentTarget.style.color = "rgba(239,68,68,0.9)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)"; e.currentTarget.style.color = "rgba(239,68,68,0.6)"; }}
                  >Remove</button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add new category */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label style={labelS}>Add New Category</label>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            placeholder="e.g. Necklaces"
            style={{ flex: 1, background: "rgba(254,249,233,0.05)", border: "1px solid rgba(201,168,76,0.2)", color: "#fef9e9", padding: "11px 14px", fontFamily: "'Manrope', sans-serif", fontSize: 13, outline: "none" }}
          />
          <button onClick={handleAdd} disabled={adding || !newName.trim()}
            style={{ padding: "11px 24px", background: adding || !newName.trim() ? "rgba(201,168,76,0.3)" : "#c9a84c", border: "none", color: "#1d1c12", cursor: adding || !newName.trim() ? "not-allowed" : "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {adding ? "Adding…" : "Add Category"}
          </button>
        </div>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, color: "rgba(254,249,233,0.3)", margin: 0 }}>New categories are saved to Supabase and appear immediately on the storefront filter bar.</p>
      </div>
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

// ─── ARCHIVE MODAL ──────────────────────────────────────────────────────────
interface ArchiveItem {
  id: string;
  title: string;
  year: string;
  materials: string;
  status: string;
  image: string;
  description: string;
  sort_order: number;
}

const ARCHIVE_STATUSES = ["Acquired", "Private Collection", "On Display"];

function ArchiveModal({ item, onClose, onSaved }: { item?: ArchiveItem | null; onClose: () => void; onSaved: () => void }) {
  const isEdit = !!item;
  const [form, setForm] = useState({
    title: item?.title || "",
    year: item?.year || new Date().getFullYear().toString(),
    materials: item?.materials || "",
    status: item?.status || "Private Collection",
    image: item?.image || "",
    description: item?.description || "",
    sort_order: item?.sort_order ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));
  const fS = { background: "rgba(254,249,233,0.05)", border: "1px solid rgba(201,168,76,0.2)", color: "#fef9e9", padding: "10px 12px", fontFamily: "'Manrope', sans-serif", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" as const };
  const lS = { fontSize: 11, fontWeight: 700 as const, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(254,249,233,0.5)", fontFamily: "'Manrope', sans-serif", display: "block", marginBottom: 6 };

  const handleSave = async () => {
    if (!form.title || !form.year) { alert("Please fill Title and Year."); return; }
    setSaving(true);
    try {
      const payload = { title: form.title, year: form.year, materials: form.materials, status: form.status, image: form.image, description: form.description, sort_order: form.sort_order };
      if (isEdit && item) {
        const { error } = await supabase.from("archive_items").update(payload).eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("archive_items").insert(payload);
        if (error) throw error;
      }
      onSaved();
      onClose();
    } catch (e: any) { alert("Save failed: " + e.message); }
    setSaving(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#1a1908", border: "1px solid rgba(201,168,76,0.25)", width: "100%", maxWidth: 580, maxHeight: "90vh", overflowY: "auto", padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, color: "#fef9e9", fontWeight: 400, margin: 0 }}>{isEdit ? "Edit Archive Item" : "New Archive Item"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(254,249,233,0.4)", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ gridColumn: "1 / -1" }}><label style={lS}>Title</label><input value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Solaris Torque" style={fS} /></div>
          <div><label style={lS}>Year</label><input value={form.year} onChange={e => set("year", e.target.value)} placeholder="2024" style={fS} /></div>
          <div><label style={lS}>Status</label><select value={form.status} onChange={e => set("status", e.target.value)} style={{ ...fS, background: "#1a1908" }}>{ARCHIVE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
          <div style={{ gridColumn: "1 / -1" }}><label style={lS}>Materials</label><input value={form.materials} onChange={e => set("materials", e.target.value)} placeholder="e.g. 22k Yellow Gold, Colombian Emerald" style={fS} /></div>
          <div style={{ gridColumn: "1 / -1" }}><label style={lS}>Description</label><textarea rows={3} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Brief editorial description…" style={{ ...fS, resize: "vertical" }} /></div>
          <div><label style={lS}>Sort Order (lower = first)</label><input type="number" value={form.sort_order} onChange={e => set("sort_order", parseInt(e.target.value) || 0)} style={fS} /></div>
          <div style={{ gridColumn: "1 / -1" }}><ImageUploader label="Image" current={form.image} onUploaded={url => set("image", url as string)} /></div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 22px", background: "none", border: "1px solid rgba(254,249,233,0.2)", color: "rgba(254,249,233,0.6)", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={{ padding: "10px 26px", background: saving ? "rgba(201,168,76,0.4)" : "#c9a84c", border: "none", color: "#1d1c12", cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{saving ? "Saving…" : isEdit ? "Save Changes" : "Add to Archive"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── ARCHIVE TAB ──────────────────────────────────────────────────────────────
function ArchiveTab() {
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; item?: ArchiveItem | null }>({ open: false });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("archive_items").select("*").order("sort_order", { ascending: true });
    setItems((data || []) as ArchiveItem[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("archive_items").delete().eq("id", id);
    if (error) { showToast("Delete failed: " + error.message, "error"); return; }
    showToast("Archive item deleted."); setDeleteConfirm(null); load();
  };

  const stColor = (s: string) => {
    if (s === "Acquired") return { bg: "rgba(201,168,76,0.2)", c: "#c9a84c" };
    if (s === "On Display") return { bg: "rgba(74,124,89,0.2)", c: "#6bc47d" };
    return { bg: "rgba(254,249,233,0.08)", c: "rgba(254,249,233,0.6)" };
  };

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      {modal.open && <ArchiveModal item={modal.item} onClose={() => setModal({ open: false })} onSaved={() => { showToast(modal.item ? "Item updated!" : "Item added!"); load(); }} />}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#1a1908", border: "1px solid rgba(201,168,76,0.2)", padding: 32, maxWidth: 400, textAlign: "center" }}>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: "#fef9e9", marginBottom: 20 }}>Delete this archive item?</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: "8px 20px", background: "none", border: "1px solid rgba(254,249,233,0.2)", color: "#fef9e9", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12 }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm!)} style={{ padding: "8px 20px", background: "#7f1d1d", border: "none", color: "#fff", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 16, flexWrap: "wrap" }}>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12, color: "rgba(254,249,233,0.35)", margin: 0 }}>{items.length} archive items</p>
        <button onClick={() => setModal({ open: true, item: null })} style={{ padding: "10px 24px", background: "#c9a84c", border: "none", color: "#1d1c12", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>+ Add Archive Item</button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "rgba(254,249,233,0.4)", fontFamily: "'Manrope', sans-serif" }}>Loading…</div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "rgba(254,249,233,0.3)", fontFamily: "'Manrope', sans-serif" }}>No archive items yet. Add your first piece above.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {items.map(item => {
            const sc = stColor(item.status);
            return (
              <div key={item.id} style={{ background: "rgba(254,249,233,0.03)", border: "1px solid rgba(201,168,76,0.15)", overflow: "hidden", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)")}>
                {item.image && <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#111" }}><img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>}
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <p style={{ fontFamily: "'Noto Serif', serif", fontSize: 14, color: "#fef9e9", margin: 0, fontWeight: 400 }}>{item.title}</p>
                    <span style={{ fontSize: 9, fontWeight: 700, background: sc.bg, color: sc.c, padding: "2px 6px", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{item.status}</span>
                  </div>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, color: "rgba(254,249,233,0.4)", margin: "0 0 10px" }}>{item.year} · {item.materials}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setModal({ open: true, item })} style={{ flex: 1, padding: "7px 0", background: "none", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Edit</button>
                    <button onClick={() => setDeleteConfirm(item.id)} style={{ padding: "7px 12px", background: "none", border: "1px solid rgba(239,68,68,0.3)", color: "rgba(239,68,68,0.7)", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 11 }}>✕</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── MAIN ADMIN PAGE ──────────────────────────────────────────────────────────
export const AdminPage = (): JSX.Element => {
  const [authed, setAuthed] = useState(() => localStorage.getItem("admin_authed") === "1");
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "archive" | "settings">("products");
  const [loginLoading, setLoginLoading] = useState(false);

  const login = async () => {
    // Try hardcoded password first (backward compatible)
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem("admin_authed", "1");
      setAuthed(true);
      return;
    }
    // Try Supabase Auth: treat input as email, use a second field or fixed password
    setLoginLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: pw.includes("@") ? pw : "",
        password: ADMIN_PASSWORD,
      });
      if (!authError && authData.user) {
        const { data: admin } = await supabase.from("admin_users").select("id").eq("email", authData.user.email).single();
        if (admin) {
          localStorage.setItem("admin_authed", "1");
          setAuthed(true);
          setLoginLoading(false);
          return;
        }
      }
    } catch {}
    setLoginLoading(false);
    setPwError(true);
    setTimeout(() => setPwError(false), 2000);
  };

  const logout = async () => {
    localStorage.removeItem("admin_authed");
    await supabase.auth.signOut().catch(() => {});
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
    { id: "products",   label: "Products",    icon: "◈" },
    { id: "categories", label: "Categories",   icon: "⊞" },
    { id: "archive",    label: "Archive",      icon: "◎" },
    { id: "settings",   label: "Site Settings", icon: "⚙" },
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
            {activeTab === "products" ? "Products" : activeTab === "categories" ? "Categories" : activeTab === "archive" ? "The Archive" : "Site Settings"}
          </h1>
          <p style={{ fontSize: 12, color: "rgba(254,249,233,0.35)", margin: 0, letterSpacing: "0.05em" }}>
            {activeTab === "products" ? "Add, edit, or remove products and their images" : activeTab === "categories" ? "Manage the category list shown on the storefront filter bar" : activeTab === "archive" ? "Manage past and exhibited pieces" : "Update contact info and social links"}
          </p>
        </div>

        {activeTab === "products"   && <ProductsTab />}
        {activeTab === "categories" && <CategoriesTab />}
        {activeTab === "archive"    && <ArchiveTab />}
        {activeTab === "settings"   && <SettingsTab />}
      </main>
    </div>
  );
};
