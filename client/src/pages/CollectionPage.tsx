import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";
import { useWishlist } from "@/lib/WishlistContext";
import { DEFAULT_PRODUCTS, BASE_CATEGORIES, PRESET_IMAGES, SORT_OPTIONS, parsePrice } from '@/lib/data/products';
export const CollectionPage = (): JSX.Element => {
  const [location, setLocation] = useLocation();
  const { toggle: wishToggle, isWishlisted } = useWishlist();
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState(() => {
    const saved = sessionStorage.getItem("mdoro_active_category");
    return saved || "All";
  });

  useEffect(() => {
    sessionStorage.setItem("mdoro_active_category", activeCategory);
  }, [activeCategory]);
  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);

  // ── Category state (persisted to localStorage) ──
  const [extraCategories, setExtraCategories] = useState<{ value: string; label: string }[]>(() => {
    try {
      const saved = localStorage.getItem("mdoro_extra_categories");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // All categories = base + user-added, prefixed by "All"
  const allCategories = [
    { value: "All", label: "All" },
    ...BASE_CATEGORIES,
    ...extraCategories,
  ];

  // ── Add-product drawer state ──
  const [modalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState(BASE_CATEGORIES[0].value);
  const [formPrice, setFormPrice] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState(PRESET_IMAGES[0].url);
  const [customImageActive, setCustomImageActive] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ── New-category inline input state ──
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");

  const handleAddCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;
    const entry = { value: trimmed, label: trimmed };
    const updated = [...extraCategories, entry];
    setExtraCategories(updated);
    localStorage.setItem("mdoro_extra_categories", JSON.stringify(updated));
    setFormCategory(trimmed);
    setNewCategoryInput("");
    setAddingCategory(false);
  };

  // Sync state with Supabase on load
  const loadProducts = async () => {
    try {
      const { supabase } = await import("../lib/supabase");
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name)")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        // Merge: use Supabase data but prefer local images from DEFAULT_PRODUCTS
        const merged = data.map((p: any) => {
          const nameLC = (p.name || "").toLowerCase();
          const match = DEFAULT_PRODUCTS.find((dp) => dp.name.toLowerCase() === nameLC || dp.id === p.id);
          if (match) {
            // Use Supabase metadata but local image
            return { ...match, price: `₹${Number(p.price).toLocaleString("en-IN")}`, isNew: p.is_new, description: p.description || match.description };
          }
          // Supabase-only product: check if image URL is valid (starts with http or exists locally)
          const hasValidImage = p.image && (p.image.startsWith("http") || p.image.startsWith("/products/new-") || p.image.startsWith("/figma"));
          if (!hasValidImage) return null;
          return {
            id: p.id,
            category: p.categories?.name || p.category || "Pendants",
            name: p.name,
            description: p.description,
            price: `₹${Number(p.price).toLocaleString("en-IN")}`,
            image: p.image,
            isNew: p.is_new,
          };
        }).filter((product): product is (typeof DEFAULT_PRODUCTS)[number] => Boolean(product));
        // If we got valid products, use them; otherwise keep defaults
        if (merged.length > 0) setProducts(merged);
      }
    } catch (err) {
      console.error("Failed fetching from Supabase, using defaults.", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Filter & Sort Logic
  let filtered = products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  if (sort === "new") filtered = [...filtered].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));

  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Featured";

  // Add Product Submit
  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice || !formDescription) return;

    setSubmitting(true);
    const imageToUse = customImageActive ? customImageUrl : formImage;
    const cleanId = formName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      const { supabase } = await import("../lib/supabase");
      const priceNum = parseFloat(formPrice.replace(/[^0-9.]/g, "")) || 0;
      const { error } = await supabase.from("products").insert({
        name: formName,
        description: formDescription,
        price: priceNum,
        image: imageToUse,
        is_new: true,
        is_active: true,
      });

      if (!error) {
        await loadProducts();
        setFormName("");
        setFormDescription("");
        setCustomImageUrl("");
        setCustomImageActive(false);
        setModalOpen(false);
      } else {
        alert("Failed to submit product. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting creation details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen" style={{ background: "#fef9e9" }}>
      <NavbarSection />

      <div style={{ paddingTop: "80px" }}>

        {/* ── SELECTED ARTIFACTS HERO ─────────────────────────── */}
        <section
          className="w-full"
          style={{ background: "#fef9e9", borderBottom: "1px solid rgba(29,28,18,0.09)" }}
        >
          <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
            {/* Breadcrumb row */}
            <div
              className="flex items-center gap-2 pt-10 pb-8"
              style={{ borderBottom: "1px solid rgba(29,28,18,0.07)" }}
            >
              <span
                onClick={() => setLocation("/")}
                style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1d1c12", opacity: 0.35, textDecoration: "none", cursor: "pointer" }}
              >
                Mani D&apos;Oro
              </span>
              <span style={{ color: "#1d1c12", opacity: 0.2, fontSize: "11px" }}>/</span>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1d1c12", opacity: 0.35 }}>
                Collections
              </span>
            </div>

            {/* Split hero row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-12 pb-14 items-end">
              {/* Left: heading */}
              <div>
                <h1
                  className="leading-none tracking-[-0.02em]"
                  style={{
                    fontFamily: "'Noto Serif', Georgia, serif",
                    fontSize: "clamp(44px,6.5vw,88px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#1d1c12",
                  }}
                >
                  Curated
                  <br />
                  Collection
                </h1>
              </div>

              {/* Right: description */}
              <div className="flex flex-col gap-5 pb-2 pl-0 md:pl-8 border-l-0 md:border-l border-[#1d1c12]/10">
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    color: "#1d1c12",
                    opacity: 0.65,
                  }}
                >
                  A curated collection of contemporary demi-fine jewellery designed for everyday styling, effortless layering, and modern self-expression.
                </p>
                
                <div className="flex justify-between items-center">
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#795900",
                    }}
                  >
                    {filtered.length} objects available
                  </p>
                  

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTERS + SORT BAR ─────────────────────────────── */}
        <section
          className="w-full sticky top-[80px] z-40"
          style={{ background: "rgba(254,249,233,0.97)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(29,28,18,0.08)" }}
        >
          <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 sm:py-0 sm:h-14 gap-4 sm:gap-0">

              {/* Category filters */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-0">
                {allCategories.map((cat) => (
                  <button
                    key={cat.value}
                    data-testid={`filter-${cat.value.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setActiveCategory(cat.value)}
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: activeCategory === cat.value ? "#1d1c12" : "rgba(29,28,18,0.45)",
                      border: "none",
                      background: "none",
                      padding: "10px 16px",
                      borderBottom: activeCategory === cat.value ? "2px solid #795900" : "2px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sort selector */}
              <div className="relative self-end sm:self-auto">
                <button
                  data-testid="button-sort-trigger"
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-3"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#1d1c12",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Sort By: <span style={{ color: "#795900" }}>{sortLabel}</span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    style={{
                      transform: sortOpen ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path d="M1 1L5 5L9 1" stroke="#1d1c12" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>

                {sortOpen && (
                  <div
                    className="absolute right-0 top-9 w-48 py-2 z-50"
                    style={{ background: "#fef9e9", boxShadow: "0 8px 32px rgba(29,28,18,0.12)", border: "1px solid rgba(29,28,18,0.08)" }}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        data-testid={`sort-${opt.value}`}
                        onClick={() => { setSort(opt.value); setSortOpen(false); }}
                        className="w-full text-left px-5 py-2.5 hover:bg-[#f5f0e4] transition-colors"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "10px",
                          fontWeight: opt.value === sort ? 700 : 400,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: opt.value === sort ? "#795900" : "#1d1c12",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* ── PRODUCT GRID ───────────────────────────────────── */}
        <section className="w-full py-14">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-8">

            {filtered.length === 0 ? (
              <div className="py-32 flex flex-col items-center gap-4">
                <p style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "24px", fontStyle: "italic", color: "#1d1c12", opacity: 0.35 }}>
                  No pieces in this category yet.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
                  {filtered.map((product) => (
                    <article
                      key={product.id}
                      data-testid={`card-product-${product.id}`}
                      onClick={() => setLocation(`/product/${product.id}`)}
                      onCopy={(e) => e.preventDefault()}
                      className="product-card relative overflow-hidden cursor-pointer group select-none"
                      style={{ aspectRatio: "3/4" }}
                    >
                      {product.isNew && (
                        <div
                          className="absolute top-4 left-4 z-10 px-3 py-1 text-[9px] font-bold tracking-widest uppercase text-[#fef9e9]"
                          style={{ background: "#795900" }}
                        >
                          New
                        </div>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none pointer-events-none"
                      />
                      {/* Transparent Overlay for Copy Protection */}
                      <div className="absolute inset-0 z-0 select-none pointer-events-auto" onContextMenu={(e) => e.preventDefault()} />
                      {/* Watermark Logo */}
                      <div className="absolute top-4 right-4 w-12 opacity-[0.25] pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-0 filter contrast-125 brightness-75">
                        <img src="/logo.png" alt="Mani D'Oro" className="w-full h-auto drop-shadow-md" />
                      </div>

                      {/* Wishlist heart button */}
                      <button
                        aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                        onClick={(e) => {
                          e.stopPropagation();
                          wishToggle({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category });
                        }}
                        style={{
                          position: "absolute", top: 12, right: 12, zIndex: 20,
                          width: 36, height: 36,
                          background: "rgba(254,249,233,0.88)",
                          border: "1px solid rgba(201,168,76,0.25)",
                          borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer",
                          backdropFilter: "blur(4px)",
                          transition: "background 0.2s, transform 0.2s, border-color 0.2s",
                          boxShadow: "0 2px 8px rgba(29,28,18,0.12)",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(254,249,233,1)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(254,249,233,0.88)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"; }}
                        onMouseDown={e => { e.currentTarget.style.transform = "scale(0.88)"; }}
                        onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24"
                          fill={isWishlisted(product.id) ? "#c9a84c" : "none"}
                          stroke={isWishlisted(product.id) ? "#c9a84c" : "rgba(29,28,18,0.55)"}
                          strokeWidth="1.5"
                          style={{ transition: "fill 0.25s, stroke 0.25s" }}
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <div className="product-card-overlay" />
                      <div className="product-card-details">
                        <p
                          className="mb-2"
                          style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c" }}
                        >
                          {product.category}
                        </p>
                        <h3
                          className="mb-2 leading-snug"
                          style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "22px", fontStyle: "italic", fontWeight: 400, color: "#fef9e9" }}
                        >
                          {product.name}
                        </h3>
                        <p
                          className="mb-5 leading-relaxed"
                          style={{ fontFamily: "'Manrope', sans-serif", fontSize: "13px", color: "rgba(254,249,233,0.65)" }}
                        >
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "18px", color: "#c9a84c" }}>
                            {product.price}
                          </span>
                          <button
                            data-testid={`button-view-${product.id}`}
                            onClick={(e) => { e.stopPropagation(); setLocation(`/product/${product.id}`); }}
                            style={{
                              fontFamily: "'Manrope', sans-serif",
                              fontSize: "10px",
                              fontWeight: 700,
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: "#fef9e9",
                              border: "1px solid rgba(254,249,233,0.45)",
                              padding: "8px 16px",
                              background: "none",
                              cursor: "pointer",
                            }}
                          >
                            View Piece
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

              </>
            )}

          </div>
        </section>


      </div>

      {/* ── REGISTER DYNAMIC CREATION DRAWER / MODAL ───────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end" style={{ background: "rgba(21, 23, 16, 0.6)", backdropFilter: "blur(6px)" }}>
          
          {/* Modal Background click to close */}
          <div className="absolute inset-0" onClick={() => setModalOpen(false)} />

          {/* Drawer content (Right side slide-out layout) */}
          <div className="relative w-full max-w-[550px] h-full bg-[#fef9e9] shadow-2xl p-8 md:p-10 flex flex-col justify-between overflow-y-auto animate-slide-left border-l border-[#c9a84c]/20">
            <div className="flex flex-col gap-6">
              
              {/* Drawer header */}
              <div className="flex justify-between items-start border-b border-[#1d1c12]/10 pb-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold tracking-[0.25em] text-[#795900] uppercase font-['Manrope',sans-serif]">Register creation</span>
                  <h3 className="text-2xl font-normal text-[#1d1c12]" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>Forge New Artifact</h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 border border-[#1d1c12]/20 hover:border-[#1d1c12] text-[#1d1c12] bg-transparent cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Form elements */}
              <form onSubmit={handleAddProductSubmit} className="flex flex-col gap-5">
                
                {/* Product Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="prod-name" className="text-[9px] font-bold tracking-widest text-[#795900] uppercase font-['Manrope',sans-serif]">Creation Name</label>
                  <input
                    id="prod-name"
                    type="text"
                    required
                    placeholder="e.g. Aurelius Medallion"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="w-full bg-[#f8f3e4] border border-[#1d1c12]/15 py-3 px-4 font-['Manrope',sans-serif] text-xs text-[#1d1c12] outline-none focus:border-[#795900]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Category select */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="prod-cat" className="text-[9px] font-bold tracking-widest text-[#795900] uppercase font-['Manrope',sans-serif]">Category</label>

                    {addingCategory ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          autoFocus
                          placeholder="New category name"
                          value={newCategoryInput}
                          onChange={e => setNewCategoryInput(e.target.value)}
                          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); } if (e.key === "Escape") setAddingCategory(false); }}
                          className="flex-1 bg-[#f8f3e4] border border-[#795900]/50 py-2.5 px-3 font-['Manrope',sans-serif] text-xs text-[#1d1c12] outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddCategory}
                          className="px-3 bg-[#795900] text-[#fef9e9] font-['Manrope',sans-serif] text-[10px] font-bold tracking-wider uppercase border-none cursor-pointer"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => setAddingCategory(false)}
                          className="px-3 bg-transparent border border-[#1d1c12]/20 text-[#1d1c12]/60 font-['Manrope',sans-serif] text-[10px] font-bold tracking-wider uppercase cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <select
                          id="prod-cat"
                          value={formCategory}
                          onChange={e => setFormCategory(e.target.value)}
                          className="flex-1 bg-[#f8f3e4] border border-[#1d1c12]/15 py-3 px-3 font-['Manrope',sans-serif] text-xs text-[#1d1c12] outline-none"
                        >
                          {[...BASE_CATEGORIES, ...extraCategories].map(c => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          title="Add new category"
                          onClick={() => setAddingCategory(true)}
                          className="px-3 bg-[#f8f3e4] border border-[#1d1c12]/15 text-[#795900] font-bold text-lg leading-none cursor-pointer hover:border-[#795900] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Price */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="prod-price" className="text-[9px] font-bold tracking-widest text-[#795900] uppercase font-['Manrope',sans-serif]">Estimate Price (USD)</label>
                    <input
                      id="prod-price"
                      type="text"
                      required
                      placeholder="e.g. $1,400"
                      value={formPrice}
                      onChange={e => setFormPrice(e.target.value)}
                      className="w-full bg-[#f8f3e4] border border-[#1d1c12]/15 py-3 px-4 font-['Manrope',sans-serif] text-xs text-[#1d1c12] outline-none focus:border-[#795900]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="prod-desc" className="text-[9px] font-bold tracking-widest text-[#795900] uppercase font-['Manrope',sans-serif]">Artisanal Narrative description</label>
                  <textarea
                    id="prod-desc"
                    required
                    placeholder="Recount the gold forging technique, specific cuts, and story of this artifact..."
                    rows={4}
                    value={formDescription}
                    onChange={e => setFormDescription(e.target.value)}
                    className="w-full bg-[#f8f3e4] border border-[#1d1c12]/15 py-3 px-4 font-['Manrope',sans-serif] text-xs text-[#1d1c12] leading-relaxed outline-none resize-none focus:border-[#795900]"
                  />
                </div>

                {/* Custom or Preset Image selection */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold tracking-widest text-[#795900] uppercase font-['Manrope',sans-serif]">creation Portrait</span>
                    
                    {/* Toggle button */}
                    <button
                      type="button"
                      onClick={() => setCustomImageActive(!customImageActive)}
                      className="text-[9px] font-bold tracking-widest uppercase text-[#795900] underline bg-transparent border-none cursor-pointer"
                    >
                      {customImageActive ? "Use Preset Imagery" : "Specify Custom Image URL"}
                    </button>
                  </div>

                  {customImageActive ? (
                    <input
                      type="text"
                      required
                      placeholder="e.g. https://domain.com/image.jpg"
                      value={customImageUrl}
                      onChange={e => setCustomImageUrl(e.target.value)}
                      className="w-full bg-[#f8f3e4] border border-[#1d1c12]/15 py-3 px-4 font-['Manrope',sans-serif] text-xs text-[#1d1c12] outline-none focus:border-[#795900]"
                    />
                  ) : (
                    <div className="flex flex-col gap-3 bg-[#f8f3e4] p-4 border border-[#1d1c12]/10">
                      <span className="text-[9px] font-bold tracking-wider uppercase text-[#1d1c12]/40 font-['Manrope',sans-serif]">Select Preset Studio Portrait:</span>
                      <div className="flex gap-2 flex-wrap">
                        {PRESET_IMAGES.map((img) => (
                          <button
                            key={img.label}
                            type="button"
                            onClick={() => setFormImage(img.url)}
                            className={`py-2 px-3 text-[10px] font-bold tracking-wider uppercase border transition-all ${
                              formImage === img.url
                                ? "bg-[#795900] text-[#fef9e9] border-[#795900]"
                                : "bg-[#fef9e9] text-[#1d1c12]/70 border-[#1d1c12]/15 hover:border-[#1d1c12]/40"
                            }`}
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#795900] hover:bg-[#634900] text-[#fef9e9] font-['Manrope',sans-serif] text-[11px] font-bold tracking-widest uppercase py-4 border-none transition-colors cursor-pointer"
                  >
                    {submitting ? "Forging Creation in Forge..." : "Forge Artifact into Catalog"}
                  </button>
                  <p className="text-[9px] text-[#1d1c12]/40 text-center uppercase font-['Manrope',sans-serif]">
                    Registered creations are held in temporary memory storage.
                  </p>
                </div>

              </form>

            </div>
          </div>

        </div>
      )}

      {/* Footer */}
      <FooterSection />
    </div>
  );
};
