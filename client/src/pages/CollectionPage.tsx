import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";

// Static defaults for failover
const DEFAULT_PRODUCTS = [
  {
    id: "aurelius-band",
    category: "Rings",
    name: "Aurelius Band",
    description: "Hand-hammered 22k gold with a whispered patina of antiquity.",
    price: "$980",
    image: "/figmaAssets2/product-aurelius-band.png",
    isNew: true,
      },
  {
    id: "mani-link-chain",
    category: "Necklaces",
    name: "Mani Link Chain",
    description: "Each link forged individually, carrying the mark of its maker.",
    price: "$1,240",
    image: "/figmaAssets2/product-mani-link-chain.png",
    isNew: true,
      },
  {
    id: "gilded-drift-cuff",
    category: "Cuffs & Bangles",
    name: "Gilded Drift Cuff",
    description: "Molten gold shaped by hand � no two are exactly alike.",
    price: "$740",
    image: "/figmaAssets2/product-gilded-drift-cuff.png",
    isNew: true,
      },
  {
    id: "unisex-gold-bracelet",
    category: "Bracelets",
    name: "Unisex Gold Bracelet",
    description: "A timeless unisex statement, meticulously balanced with heavy solid gold links.",
    price: "$1,420",
    image: "/products/bracelet-unisex-1.jpg",
    isNew: true,
    gallery: [
          "/products/bracelet-unisex-1.jpg",
          "/products/bracelet-unisex-2.jpg",
          "/products/bracelet-unisex-3.jpg",
          "/products/bracelet-unisex-4.jpg"
        ]
      },
  {
    id: "bar-pendant",
    category: "Pendants",
    name: "Bar Pendant",
    description: "A sleek, architectural vertical gold bar with subtle hand-struck facets.",
    price: "$850",
    image: "/products/pendant-bar-pendant-cover.jpg",
    isNew: true,
    gallery: [
          "/products/pendant-bar-pendant-1.jpg",
          "/products/pendant-bar-pendant-2.jpg",
          "/products/pendant-bar-pendant-3.jpg",
          "/products/pendant-bar-pendant-4.jpg"
        ]
      },
  {
    id: "bird-pendant",
    category: "Pendants",
    name: "Bird Pendant",
    description: "A delicate avian silhouette poised in solid gold, capturing the grace of flight.",
    price: "$890",
    image: "/products/pendant-bird-pendant-cover.png",
    isNew: true,
    gallery: [
          "/products/pendant-bird-pendant-1.jpg",
          "/products/pendant-bird-pendant-2.jpg",
          "/products/pendant-bird-pendant-3.jpg",
          "/products/pendant-bird-pendant-4.jpg"
        ]
      },
  {
    id: "boat-pendant",
    category: "Pendants",
    name: "Boat Pendant",
    description: "A maritime heritage motif sculpted with flowing curves and satin reflections.",
    price: "$940",
    image: "/products/pendant-boat-pendant-cover.png",
    isNew: true,
    gallery: [
          "/products/pendant-boat-pendant-1.jpg",
          "/products/pendant-boat-pendant-2.jpg",
          "/products/pendant-boat-pendant-3.jpg",
          "/products/pendant-boat-pendant-4.jpg"
        ]
      },
  {
    id: "butterfly-pendant",
    category: "Pendants",
    name: "Butterfly Pendant",
    description: "Intricately openworked butterfly wings reflecting pure light with every movement.",
    price: "$920",
    image: "/products/pendant-butterfly-pendant-cover.png",
    isNew: true,
    gallery: [
          "/products/pendant-butterfly-pendant-1.jpg",
          "/products/pendant-butterfly-pendant-2.jpg",
          "/products/pendant-butterfly-pendant-3.jpg",
          "/products/pendant-butterfly-pendant-4.jpg"
        ]
      },
  {
    id: "fish-pendant",
    category: "Pendants",
    name: "Fish Pendant",
    description: "A symbolic heritage fish motif, intricately carved with exquisite attention to detail.",
    price: "$920",
    image: "/products/pendant-fish-pendant-cover.jpg",
    isNew: true,
    gallery: [
          "/products/pendant-fish-pendant-1.jpg",
          "/products/pendant-fish-pendant-2.jpg",
          "/products/pendant-fish-pendant-3.jpg",
          "/products/pendant-fish-pendant-4.jpg"
        ]
      },
  {
    id: "flower-pendant",
    category: "Pendants",
    name: "Flower Pendant",
    description: "A blooming floral medallion detailed with hand-engraved petals in high-carat gold.",
    price: "$860",
    image: "/products/pendant-flower-pendant-cover.png",
    isNew: true,
    gallery: [
          "/products/pendant-flower-pendant-1.jpg",
          "/products/pendant-flower-pendant-2.jpg",
          "/products/pendant-flower-pendant-3.jpg",
          "/products/pendant-flower-pendant-4.jpg"
        ]
      },
  {
    id: "leaf-pendant",
    category: "Pendants",
    name: "Leaf Pendant",
    description: "Natural botanical elegance preserved in solid gold with lifelike vein texturing.",
    price: "$840",
    image: "/products/pendant-leaf-pendant-cover.png",
    isNew: true,
    gallery: [
          "/products/pendant-leaf-pendant-1.jpg",
          "/products/pendant-leaf-pendant-2.jpg",
          "/products/pendant-leaf-pendant-3.jpg",
          "/products/pendant-leaf-pendant-4.jpg"
        ]
      },
  {
    id: "moon-pendant",
    category: "Pendants",
    name: "Moon Pendant",
    description: "A celestial crescent cast with a gentle, dreamlike hammered patina.",
    price: "$960",
    image: "/products/pendant-moon-pendant-cover.png",
    isNew: true,
    gallery: [
          "/products/pendant-moon-pendant-1.jpg",
          "/products/pendant-moon-pendant-2.jpg",
          "/products/pendant-moon-pendant-3.jpg",
          "/products/pendant-moon-pendant-4.jpg"
        ]
      },
  {
    id: "pendant-set",
    category: "Pendants",
    name: "Pendant Set",
    description: "A magnificent matching ensemble of handcrafted pendants for layered elegance.",
    price: "$1,450",
    image: "/products/pendant-pendant-set-cover.jpg",
    isNew: true,
    gallery: [
          "/products/pendant-pendant-set-1.jpg",
          "/products/pendant-pendant-set-2.jpg",
          "/products/pendant-pendant-set-3.jpg",
          "/products/pendant-pendant-set-4.jpg"
        ]
      },
  {
    id: "plus-pendant",
    category: "Pendants",
    name: "Plus Pendant",
    description: "A modern geometric cross accent radiating bold symmetry and timeless style.",
    price: "$780",
    image: "/products/pendant-plus-pendant-cover.png",
    isNew: true,
    gallery: [
          "/products/pendant-plus-pendant-1.jpg",
          "/products/pendant-plus-pendant-2.jpg",
          "/products/pendant-plus-pendant-3.jpg",
          "/products/pendant-plus-pendant-4.jpg"
        ]
      },
  {
    id: "snake-pendant",
    category: "Pendants",
    name: "Snake Pendant",
    description: "A serpentine masterpiece coiling with mesmerizing texture and serpentine allure.",
    price: "$1,120",
    image: "/products/pendant-snake-pendant-cover.png",
    isNew: true,
    gallery: [
          "/products/pendant-snake-pendant-1.jpg",
          "/products/pendant-snake-pendant-2.jpg",
          "/products/pendant-snake-pendant-3.jpg",
          "/products/pendant-snake-pendant-4.jpg"
        ]
      },
  {
    id: "spiral-pendant",
    category: "Pendants",
    name: "Spiral Pendant",
    description: "An infinite golden spiral symbolizing continuous motion and artisanal harmony.",
    price: "$880",
    image: "/products/pendant-spiral-pendant-cover.png",
    isNew: true,
    gallery: [
          "/products/pendant-spiral-pendant-1.jpg",
          "/products/pendant-spiral-pendant-2.jpg",
          "/products/pendant-spiral-pendant-3.jpg",
          "/products/pendant-spiral-pendant-4.jpg"
        ]
      },
  {
    id: "star-pendant",
    category: "Pendants",
    name: "Star Pendant",
    description: "A brilliant celestial starburst capturing warm internal glows from every angle.",
    price: "$910",
    image: "/products/pendant-star-pendant-cover.png",
    isNew: true,
    gallery: [
          "/products/pendant-star-pendant-1.jpg",
          "/products/pendant-star-pendant-2.jpg",
          "/products/pendant-star-pendant-3.jpg",
          "/products/pendant-star-pendant-4.jpg"
        ]
      },
  {
    id: "tiger-pendant",
    category: "Pendants",
    name: "Tiger Pendant",
    description: "A fierce and majestic tiger crest, masterfully struck with bold Milanese heritage.",
    price: "$1,280",
    image: "/products/pendant-tiger-pendant-cover.png",
    isNew: true,
    gallery: [
          "/products/pendant-tiger-pendant-1.jpg",
          "/products/pendant-tiger-pendant-2.jpg",
          "/products/pendant-tiger-pendant-3.jpg",
          "/products/pendant-tiger-pendant-4.jpg"
        ]
      },
  {
    id: "aurelius-chain",
    category: "Necklaces",
    name: "The Aurelius Chain",
    description: "A heritage link necklace cast in 18k gold-plated silver alloy.",
    price: "$1,240",
    image: "/figmaAssets/the-aurelius-chain---detailed-gold-link-necklace.png",
    isNew: false,
      },
  {
    id: "molten-hoops",
    category: "Rings",
    name: "Molten Hoops",
    description: "Textured gold earrings sculpted to capture light in motion.",
    price: "$890",
    image: "/figmaAssets/molten-hoops---textured-gold-earrings.png",
    isNew: false,
      },
  {
    id: "oro-signet",
    category: "Rings",
    name: "Oro Signet Ring",
    description: "A bold signet with hand-engraved heritage motifs in solid gold.",
    price: "$1,080",
    image: "/figmaAssets/close-up-of-artisanal-gold-jewelry-on-a-person.png",
    isNew: false,
      },
];

const CATEGORIES = [
  { value: "All", label: "All Creations" },
  { value: "Rings", label: "Rings" },
  { value: "Necklaces", label: "Necklaces" },
  { value: "Cuffs & Bangles", label: "Cuffs & Bangles" },
  { value: "Bracelets", label: "Bracelets" },
  { value: "Pendants", label: "Pendants" },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "new", label: "Newest Arrivals" },
];

// Preset images for convenient demo product uploads
const PRESET_IMAGES = [
  { label: "Classic Signet", url: "/figmaAssets/close-up-of-artisanal-gold-jewelry-on-a-person.png" },
  { label: "Heritage Chain", url: "/figmaAssets/the-aurelius-chain---detailed-gold-link-necklace.png" },
  { label: "Textured Hoops", url: "/figmaAssets/molten-hoops---textured-gold-earrings.png" },
  { label: "Liquid Cuff", url: "/figmaAssets2/product-gilded-drift-cuff.png" },
  { label: "Forged Band", url: "/figmaAssets2/product-aurelius-band.png" },
  { label: "Unisex Bracelet", url: "/products/bracelet-unisex-1.jpg" },
  { label: "Bar Pendant", url: "/products/pendant-bar-1.jpg" },
  { label: "Fish Pendant", url: "/products/pendant-fish-1.jpg" },
];

function parsePrice(p: string) {
  return parseInt(p.replace(/[^0-9]/g, ""), 10) || 0;
}

export const CollectionPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);

  // Modal / Drawer state for adding custom product
  const [modalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Rings");
  const [formPrice, setFormPrice] = useState("$1,100");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState(PRESET_IMAGES[0].url);
  const [customImageActive, setCustomImageActive] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
        setProducts(data.map((p: any) => ({
          id: p.id,
          category: p.categories?.name || p.category || p.material || "Pendants",
          name: p.name,
          description: p.description,
          price: `₹${Number(p.price).toLocaleString("en-IN")}`,
          image: p.image,
          isNew: p.is_new,
        })));
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
                Mani D&apos;Oro Atelier
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
                  Selected
                  <br />
                  Artifacts
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
                  A curated assembly of permanent pieces, hand-forged in our Milanese studio and Rajasthan foundry. Each artifact is an intersection of ancient goldsmithing techniques and sharp, architectural silhouettes.
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
                  
                  {/* Luxury button to add creation */}
                  <button
                    onClick={() => setModalOpen(true)}
                    className="font-['Manrope',sans-serif] text-[10px] font-bold tracking-widest uppercase border border-[#795900]/30 hover:border-[#795900] text-[#795900] py-2.5 px-5 transition-all bg-transparent cursor-pointer"
                  >
                    + Register Custom creation
                  </button>
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
                {CATEGORIES.map((cat) => (
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
                      <div className="absolute top-4 right-4 w-12 opacity-[0.25] pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-0 mix-blend-multiply sm:mix-blend-normal filter contrast-125 brightness-75">
                        <img src="/logo.png" alt="Mani D'Oro" className="w-full h-auto drop-shadow-md" />
                      </div>
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

        {/* ── THE BESPOKE ALCHEMY ────────────────────────────── */}
        <section
          className="w-full"
          style={{ background: "#232919" }}
        >
          <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch" style={{ minHeight: "400px" }}>

              {/* Left: text content */}
              <div className="flex flex-col justify-center gap-7 py-16 pr-0 md:pr-16">
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#c9a84c",
                  }}
                >
                  Commission &amp; Alchemy
                </span>
                <h2
                  style={{
                    fontFamily: "'Noto Serif', Georgia, serif",
                    fontSize: "clamp(32px,3.8vw,52px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    lineHeight: 1.15,
                    color: "#fef9e9",
                  }}
                >
                  The Dialogue
                  <br />
                  With Alessandra Oro
                </h2>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "rgba(254,249,233,0.55)",
                  }}
                >
                  Mani D&apos;Oro offers a full bespoke commission service — every dimension, alloy, and motif tailored to your vision. A dialogue between artisan and collector, culminating in a piece that exists nowhere else in the world.
                </p>
                <button
                  onClick={() => setLocation("/bespoke")}
                  data-testid="link-book-consultation"
                  className="flex items-center gap-3 w-fit group border-0 bg-transparent cursor-pointer"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#c9a84c",
                    padding: 0,
                  }}
                >
                  Book a Consultation
                  <svg
                    width="24"
                    height="10"
                    viewBox="0 0 24 10"
                    fill="none"
                    style={{ transition: "transform 0.25s" }}
                    className="group-hover:translate-x-1"
                  >
                    <path d="M0 5H22M18 1L22 5L18 9" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Right: jeweler photo */}
              <div
                className="relative overflow-hidden min-h-[300px] md:min-h-[400px]"
              >
                <img
                  src="/figmaAssets/jeweler-working-on-a-custom-piece.png"
                  alt="Jeweler at work"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
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
                    <label htmlFor="prod-cat" className="text-[9px] font-bold tracking-widest text-[#795900] uppercase font-['Manrope',sans-serif]">Category Group</label>
                    <select
                      id="prod-cat"
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value)}
                      className="w-full bg-[#f8f3e4] border border-[#1d1c12]/15 py-3 px-3 font-['Manrope',sans-serif] text-xs text-[#1d1c12] outline-none"
                    >
                      <option value="Rings">Rings</option>
                      <option value="Necklaces">Necklaces</option>
                      <option value="Cuffs & Bangles">Cuffs &amp; Bangles</option>
                      <option value="Bracelets">Bracelets</option>
                      <option value="Pendants">Pendants</option>
                    </select>
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
