import { useLocation } from "wouter";
import { DEFAULT_PRODUCTS, BASE_CATEGORIES } from "@/lib/data/products";

export const MainContentSection = (): JSX.Element => {
  const [, setLocation] = useLocation();

  return (
    <main className="relative w-full bg-[#fef9e9]">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="w-full">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          {/*
            Mobile:  single column — text on top, image below
            Desktop: 12-col grid — text left (7), image right (5)
          */}
          <div className="flex flex-col md:grid md:grid-cols-12 min-h-[auto] md:min-h-[720px] bg-[#f5f0e4]">

            {/* Text column */}
            <div
              className="flex flex-col justify-center gap-7 md:gap-10 px-6 sm:px-10 md:px-14 py-14 md:py-20 col-span-7"
              style={{ borderRight: undefined }}
            >
              {/* Right border only visible on md+ */}
              <div
                className="flex flex-col justify-center gap-7 md:gap-10"
                style={{}}
              >
                <div className="flex flex-col leading-none">
                  <h1
                    className="font-normal text-[#1d1c12] tracking-[-0.04em]"
                    style={{
                      fontFamily: "'Noto Serif', Georgia, serif",
                      lineHeight: 1.0,
                      fontSize: "clamp(52px, 10vw, 112px)",
                    }}
                  >
                    Gold In
                  </h1>
                  <h1
                    className="font-normal text-[#795900] italic tracking-[-0.04em]"
                    style={{
                      fontFamily: "'Noto Serif', Georgia, serif",
                      lineHeight: 1.0,
                      fontSize: "clamp(52px, 10vw, 112px)",
                    }}
                  >
                    Every
                  </h1>
                  <h1
                    className="font-normal text-[#795900] italic tracking-[-0.04em]"
                    style={{
                      fontFamily: "'Noto Serif', Georgia, serif",
                      lineHeight: 1.0,
                      fontSize: "clamp(52px, 10vw, 112px)",
                    }}
                  >
                    Hand
                  </h1>
                </div>

                <p
                  className="text-base sm:text-lg leading-relaxed text-[#5a6b4e] max-w-[380px]"
                  style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400 }}
                >
                  Jewellery For Every Version Of You. Everyday pieces designed for workdays, weekends, celebrations, and everything in between.
                </p>

                <div>
                  <a href="/collection" data-testid="button-explore-collection" className="luxury-btn-gold" style={{ textDecoration: "none" }}>
                    Explore Collection
                  </a>
                </div>

                {/* Aesthetic image below text */}
                <div className="mt-8 overflow-hidden relative w-full h-[200px] md:h-[280px]">
                  <img
                    src="/figmaAssets/close-up-of-artisanal-gold-jewelry-on-a-person.png"
                    alt="Aesthetic Gold Detail"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: "brightness(0.9) contrast(1.1)", objectPosition: "center 30%" }}
                  />
                </div>
              </div>
            </div>

            {/* Image column */}
            <div className="col-span-5 relative overflow-hidden flex items-center justify-center" style={{ minHeight: "380px" }}>
              <img
                src="/figmaAssets2/hero-right.png"
                alt="Artisanal gold jewelry craftsmanship"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ filter: "grayscale(15%) contrast(1.05)" }}
              />

            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-40" />

      {/* ── SHOP BY CATEGORY ────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20 bg-[#fef9e9]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="flex items-baseline justify-between mb-10 md:mb-14">
            <h2
              className="font-normal text-[#1d1c12]"
              style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: "clamp(28px, 4vw, 48px)",
              }}
            >
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {BASE_CATEGORIES.map((cat) => {
              const catImages: Record<string, string> = {
                "Earrings": "/figmaAssets/molten-hoops---textured-gold-earrings.png",
                "Pendants": "/products/pendant-flower-pendant-cover.png",
                "Bracelets": "/figmaAssets2/product-gilded-drift-cuff.png",
                "Rings": "/figmaAssets2/product-aurelius-band.png",
                "Anklets": "/figmaAssets/the-aurelius-chain---detailed-gold-link-necklace.png",
              };
              return (
                <div
                  key={cat.value}
                  onClick={() => {
                    sessionStorage.setItem("mdoro_active_category", cat.value);
                    setLocation("/collection");
                  }}
                  className="relative overflow-hidden cursor-pointer group select-none aspect-square"
                >
                  <img
                    src={catImages[cat.value] || "/figmaAssets2/product-aurelius-band.png"}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1c12]/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-0 w-full text-center">
                    <span className="font-['Manrope',sans-serif] text-[11px] font-bold tracking-[0.2em] uppercase text-[#fef9e9]">
                      {cat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-40" />

      {/* ── NEW ARRIVALS ────────────────────────────────────── */}
      <section id="collection" className="w-full py-16 md:py-24 bg-[#fef9e9]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="flex items-baseline justify-between mb-10 md:mb-14">
            <h2
              className="font-normal text-[#1d1c12]"
              style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: "clamp(28px, 4vw, 48px)",
              }}
            >
              New Arrivals
            </h2>
            <a
              href="/collection"
              data-testid="link-view-all"
              className="font-['Manrope',sans-serif] text-[11px] font-bold tracking-[0.18em] uppercase text-[#795900] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#795900] after:origin-left after:transition-transform hover:after:scale-x-0 after:scale-x-100 pb-px"
              style={{ textDecoration: "none" }}
            >
              View All
            </a>
          </div>

          {/* Product grid: 1 col mobile → 2 col sm → 3 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
            {DEFAULT_PRODUCTS.filter(p => p.isNew).slice(0, 6).map((product) => (
              <div key={product.id} className="flex flex-col">
                <article
                  data-testid={`card-product-${product.id}`}
                  className="product-card relative overflow-hidden cursor-pointer select-none"
                  style={{ aspectRatio: "3/4" }}
                  onClick={() => setLocation(`/product/${product.id}`)}
                  onCopy={(e) => e.preventDefault()}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    className="w-full h-full object-cover select-none pointer-events-none" 
                  />
                  {/* Transparent Overlay for Copy Protection */}
                  <div className="absolute inset-0 z-0 select-none pointer-events-auto" onContextMenu={(e) => e.preventDefault()} />
                  {/* Watermark Logo */}
                  <div className="absolute top-4 right-4 w-10 opacity-[0.25] pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-0">
                    <img src="/logo.png" alt="Mani D'Oro" className="w-full h-auto drop-shadow-md" />
                  </div>
                  <div className="product-card-overlay" />
                  <div className="product-card-details">
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a84c] mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>{product.category}</p>
                    <h3 className="text-2xl font-normal italic text-[#fef9e9] mb-2 leading-snug" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>{product.name}</h3>
                    <p className="text-sm text-[#fef9e9]/70 mb-4 leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-normal text-[#c9a84c]" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>{product.price}</span>
                      <button data-testid={`button-view-${product.id}`} className="font-['Manrope',sans-serif] text-[10px] font-bold tracking-[0.2em] uppercase text-[#fef9e9] border border-[#fef9e9]/60 px-4 py-2 hover:bg-[#fef9e9]/10 transition-colors">View Piece</button>
                    </div>
                  </div>
                </article>

                {/* Product label below grid — visible only on lg+ where there's room */}
                <div 
                  className="hidden lg:block pt-4 pb-1 cursor-pointer mt-2" 
                  style={{ borderTop: "1px solid rgba(29,28,18,0.09)" }}
                  onClick={() => setLocation(`/product/${product.id}`)}
                >
                  <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#43664b] mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>{product.category}</p>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-normal italic text-[#1d1c12]" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>{product.name}</h3>
                    <span className="text-base font-normal text-[#795900]" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── BRAND STORY HOOK ─────────────────────────────────── */}
      <section className="w-full py-20 md:py-32" style={{ background: "#1a1c12" }}>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8 text-center flex flex-col items-center">
          <span style={{
            fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700,
            letterSpacing: "0.4em", textTransform: "uppercase", color: "#c9a84c",
            display: "block", marginBottom: 24,
          }}>
            Our Origins
          </span>
          <h2 style={{
            fontFamily: "'Noto Serif', Georgia, serif", fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 400, color: "#fef9e9", margin: "0 0 32px",
            lineHeight: 1.1, maxWidth: 800
          }}>
            Born from the idea of creating Demi-fine jewellery that feels like a natural extension of personal style.
          </h2>
          <div style={{
            width: 60, height: 1, background: "#c9a84c",
            margin: "0 auto 40px",
          }} />
          <a href="/story" className="font-['Manrope',sans-serif] text-[11px] font-bold tracking-[0.2em] uppercase text-[#fef9e9] border border-[#c9a84c] px-8 py-4 hover:bg-[#c9a84c] hover:text-[#1a1c12] transition-colors" style={{ textDecoration: "none" }}>
            Discover Our Story
          </a>
        </div>
      </section>

      {/* ── EVERYDAY STYLING ─────────────────────────────────────── */}
      <section className="w-full py-16 md:py-28" style={{ background: "#f5f0e4" }}>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            
            <div className="flex flex-col gap-6 order-2 md:order-1">
              <h2
                className="font-normal text-[#1d1c12]"
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "clamp(32px, 5vw, 56px)",
                  lineHeight: 1.1
                }}
              >
                Effortless Styling<br />
                <span className="italic text-[#c9a84c]">Everyday Wear</span>
              </h2>
              <p
                className="text-base sm:text-lg leading-relaxed text-[#5a6b4e] max-w-[480px]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Discover versatile, unisex pieces that adapt to your lifestyle. Demi-fine jewellery designed to be lived in, layered, and loved every single day.
              </p>
              <div className="mt-4">
                <a href="/collection" className="luxury-btn-gold" style={{ textDecoration: "none", display: "inline-block" }}>
                  Shop The Collection
                </a>
              </div>
            </div>

            <div className="order-1 md:order-2 relative group overflow-hidden">
              <img
                src="/products/new-bracelet.png"
                alt="Everyday Styling"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "brightness(0.95)", maxHeight: "600px", boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
              />
            </div>
            
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-50" />
    </main>
  );
};
