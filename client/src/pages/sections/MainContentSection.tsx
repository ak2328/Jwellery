import { useLocation } from "wouter";
import { DEFAULT_PRODUCTS, BASE_CATEGORIES } from "@/lib/data/products";

export const MainContentSection = (): JSX.Element => {
  const [, setLocation] = useLocation();

  return (
    <main className="relative w-full bg-[#fef9e9]">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="w-full relative bg-[#0d0d07]">
        <style>{`
          @keyframes cinematicReveal {
            0%   { transform: scale(1.08); filter: blur(12px) contrast(1) brightness(0.4); }
            100% { transform: scale(1); filter: blur(0px) contrast(1.05) brightness(0.92); }
          }
          @keyframes fadeUpIn {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .hero-img-zoom {
            animation: cinematicReveal 2.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
          .fade-up-1 { animation: fadeUpIn 1s cubic-bezier(0.22,1,0.36,1) 0.8s both; }
          .fade-up-2 { animation: fadeUpIn 1s cubic-bezier(0.22,1,0.36,1) 1.0s both; }
          .fade-up-3 { animation: fadeUpIn 1s cubic-bezier(0.22,1,0.36,1) 1.2s both; }
        `}</style>

        <div className="relative w-full overflow-hidden" style={{ height: "95vh", minHeight: "700px" }}>
          
          {/* Single clean image, cinematic bloom entrance */}
          <img
            src="/website/gieh.PNG"
            alt="Mani D'Oro Jewelry"
            className="hero-img-zoom absolute inset-0 w-full h-full object-cover object-[50%_25%]"
          />
          
          {/* Very clean, soft gradient just to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a05] via-[#0a0a05]/5 to-transparent" />

          {/* Top Bar - Ultra Minimal */}
          <div className="fade-up-1 absolute top-10 left-0 right-0 flex justify-center z-10">
            <span style={{ fontFamily:"'Manrope',sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.4em", textTransform:"uppercase", color:"#c9a84c" }}>
              Mani D'Oro
            </span>
          </div>

          {/* Main Content - Centered, Clean, Breathable */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 text-center z-10">
            
            {/* The "Wear your story" quote as a delicate intro */}
            <p className="fade-up-1 text-[#c9a84c] mb-6" style={{ fontFamily: "'Noto Serif', Georgia, serif", fontStyle: "italic", fontSize: "clamp(18px, 1.8vw, 24px)" }}>
              Wear your story, every single day.
            </p>

            {/* Huge, elegant, clean headline */}
            <h1 className="fade-up-2 text-[#fef9e9] font-normal leading-[1.1] mb-8 tracking-[-0.02em]" 
                style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "clamp(50px, 8vw, 110px)" }}>
              Gold In <span style={{ color: "#c9a84c", fontStyle: "italic" }}>Every</span> Hand.
            </h1>

            {/* Clean body text */}
            <div className="fade-up-3 flex flex-col items-center gap-8 max-w-[500px]">
              <p className="text-[#fef9e9]/70 leading-relaxed text-sm sm:text-base" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400 }}>
                <strong className="text-[#fef9e9] font-medium tracking-wide">Jewellery For Every Version Of You.</strong><br/>
                <span className="mt-2 block">
                  Everyday pieces designed for workdays, weekends, celebrations, and everything in between.
                </span>
              </p>
              
              <a href="/collection" className="luxury-btn-gold" style={{ textDecoration: "none", padding: "14px 36px" }}>
                Explore Collection
              </a>
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
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            
            {/* Image Column */}
            <div className="relative group overflow-hidden rounded-tl-[40px] rounded-br-[40px]">
              <img
                src="/website/IMG_8761.PNG"
                alt="Craftsmanship Origins"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "brightness(0.85) contrast(1.1)", maxHeight: "600px" }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-tl-[40px] rounded-br-[40px] pointer-events-none" />
            </div>

            {/* Text Column */}
            <div className="flex flex-col items-start text-left">
              <span style={{
                fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700,
                letterSpacing: "0.4em", textTransform: "uppercase", color: "#c9a84c",
                display: "block", marginBottom: 24,
              }}>
                Our Origins
              </span>
              
              <h2 style={{
                fontFamily: "'Noto Serif', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 300, color: "#fef9e9", margin: "0 0 32px",
                lineHeight: 1.2, maxWidth: 600
              }}>
                Born from the idea of creating <br/>
                <span className="italic text-[#c9a84c] font-normal" style={{ fontSize: "1.1em", letterSpacing: "-0.02em" }}>Demi-fine jewellery</span> <br/>
                that feels like a natural extension of personal style.
              </h2>
              
              <div style={{
                width: 60, height: 1, background: "rgba(201,168,76,0.5)",
                marginBottom: 40,
              }} />
              
              <a href="/story" className="font-['Manrope',sans-serif] text-[11px] font-bold tracking-[0.2em] uppercase text-[#1a1c12] bg-[#c9a84c] border border-[#c9a84c] px-10 py-4 hover:bg-transparent hover:text-[#c9a84c] transition-colors" style={{ textDecoration: "none" }}>
                Discover Our Story
              </a>
            </div>
            
          </div>
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
