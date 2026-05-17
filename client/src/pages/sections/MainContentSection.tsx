const products = [
  {
    id: "aurelius-band",
    category: "Rings",
    name: "Aurelius Band",
    description: "Hand-hammered 22k gold with a whispered patina of antiquity.",
    price: "$980",
    image: "/figmaAssets2/product-aurelius-band.png",
  },
  {
    id: "mani-link-chain",
    category: "Necklaces",
    name: "Mani Link Chain",
    description: "Each link forged individually, carrying the mark of its maker.",
    price: "$1,240",
    image: "/figmaAssets2/product-mani-link-chain.png",
  },
  {
    id: "gilded-drift-cuff",
    category: "Bracelets",
    name: "Gilded Drift Cuff",
    description: "Molten gold shaped by hand — no two are exactly alike.",
    price: "$740",
    image: "/figmaAssets2/product-gilded-drift-cuff.png",
  },
];

const archiveItems = [
  { id: "archive-1", year: "Circa 2012", image: "/figmaAssets2/archive-1.png", offset: false },
  { id: "archive-2", year: "Circa 2015", image: "/figmaAssets2/archive-2.png", offset: true },
  { id: "archive-3", year: "Circa 2018", image: "/figmaAssets2/archive-3.png", offset: false },
  { id: "archive-4", year: "Circa 2021", image: "/figmaAssets2/archive-4.png", offset: true },
];

export const MainContentSection = (): JSX.Element => {
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
                  Discover the raw elegance of hand-forged jewelry. Each piece is a testament to the artisan&apos;s touch and the gold&apos;s eternal spirit.
                </p>

                <div>
                  <a href="/collection" data-testid="button-explore-collection" className="luxury-btn-gold" style={{ textDecoration: "none" }}>
                    Explore Collection
                  </a>
                </div>
              </div>
            </div>

            {/* Image column */}
            <div className="col-span-5 relative overflow-hidden" style={{ minHeight: "280px" }}>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <article
                key={product.id}
                data-testid={`card-product-${product.id}`}
                className="product-card relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: "3/4" }}
              >
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
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
            ))}
          </div>

          {/* Product labels below grid — visible only on lg+ where there's room */}
          <div className="hidden lg:grid grid-cols-3 gap-5 mt-0">
            {products.map((product) => (
              <div key={`label-${product.id}`} className="pt-4 pb-1" style={{ borderTop: "1px solid rgba(29,28,18,0.09)" }}>
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#43664b] mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>{product.category}</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-normal italic text-[#1d1c12]" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>{product.name}</h3>
                  <span className="text-base font-normal text-[#795900]" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BESPOKE SERVICES ────────────────────────────────── */}
      <section id="bespoke" className="w-full py-0" style={{ background: "#fef9e9" }}>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          {/*
            Mobile:  stack — dark panel on top, image below
            Desktop: 2 equal columns side-by-side
          */}
          <div className="flex flex-col md:grid md:grid-cols-2 items-stretch">

            {/* Left: dark olive panel */}
            <div
              className="flex flex-col justify-center gap-6 md:gap-7 py-12 px-8 sm:px-10 md:px-14"
              style={{ background: "#2a2e1a" }}
            >
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  opacity: 0.9,
                }}
              >
                Bespoke Services
              </p>
              <h2
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "clamp(32px, 4.2vw, 58px)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  color: "#fef9e9",
                }}
              >
                Your Story,
                <br />
                Our Gold
              </h2>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.9,
                  color: "rgba(254,249,233,0.52)",
                  maxWidth: "360px",
                }}
              >
                Commission a singular piece that carries your history, your name, your soul. Our master goldsmiths transform your vision into heirloom-grade artistry.
              </p>
              <a
                href="/bespoke"
                data-testid="button-begin-commission"
                style={{
                  display: "inline-block",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#fef9e9",
                  border: "1px solid rgba(254,249,233,0.35)",
                  padding: "14px 28px",
                  width: "fit-content",
                  textDecoration: "none",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(254,249,233,0.07)"; e.currentTarget.style.borderColor = "rgba(254,249,233,0.65)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(254,249,233,0.35)"; }}
              >
                Explore Bespoke Services
              </a>
            </div>

            {/* Right: jeweler photo */}
            <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
              <img
                src="/figmaAssets/jeweler-working-on-a-custom-piece.png"
                alt="Bespoke jewelry creation"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, #2a2e1a 0%, transparent 25%)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER / QUOTE ─────────────────────────────────── */}
      <section id="story" className="w-full py-16 md:py-28" style={{ background: "#fef9e9" }}>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          {/*
            Mobile:  single column — quote first, portrait below
            Desktop: 2 columns — portrait left, quote right
          */}
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:gap-20 items-center">

            {/* Left: portrait with frame */}
            <div className="relative" style={{ padding: "16px" }}>
              {/* Outer frame border */}
              <div
                className="absolute inset-0"
                style={{ border: "1px solid rgba(29,28,18,0.18)" }}
              />
              {/* Inner frame border */}
              <div
                className="absolute"
                style={{ inset: "6px", border: "1px solid rgba(29,28,18,0.08)", pointerEvents: "none", zIndex: 2 }}
              />
              {/* Image */}
              <div className="relative overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(29,28,18,0.12)" }}>
                <img
                  src="/figmaAssets2/founder-portrait.png"
                  alt="Alessandra Oro — Founder"
                  className="w-full object-cover object-top"
                  style={{
                    height: "clamp(280px, 50vw, 580px)",
                    filter: "grayscale(100%) contrast(1.08) brightness(0.95)",
                    display: "block",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(29,28,18,0.2)] to-transparent" />
              </div>
            </div>

            {/* Right: quote */}
            <div className="flex flex-col gap-7 md:gap-9">
              {/* Large decorative " */}
              <span
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "72px",
                  fontWeight: 400,
                  lineHeight: 1,
                  color: "#795900",
                  opacity: 0.55,
                  letterSpacing: "-0.04em",
                  display: "block",
                  marginBottom: "-16px",
                }}
              >
                &ldquo;
              </span>

              <blockquote
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "clamp(18px, 2.4vw, 28px)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  color: "#1d1c12",
                  margin: 0,
                }}
              >
                True luxury isn&apos;t found in the machine&apos;s precision, but in the artisan&apos;s imperfection. We don&apos;t just forge gold; we forge legacy.
              </blockquote>

              <div
                className="pt-6 flex flex-col gap-1"
                style={{ borderTop: "1px solid rgba(121,89,0,0.25)" }}
              >
                <p
                  style={{
                    fontFamily: "'Noto Serif', Georgia, serif",
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#1d1c12",
                  }}
                >
                  Alessandra Oro
                </p>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#43664b",
                  }}
                >
                  Founder &amp; Creative Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ARCHIVE ─────────────────────────────────────── */}
      <section id="archive" className="w-full py-16 md:py-24" style={{ background: "#f5f0e4" }}>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="flex items-baseline justify-between mb-10 md:mb-14">
            <div className="flex flex-col gap-2">
              <h2
                className="font-normal text-[#1d1c12]"
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                }}
              >
                The Archive
              </h2>
              <p
                className="text-sm leading-relaxed text-[#5a6b4e] max-w-[480px]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                A curated collection of past masterpieces and historical iterations that define the Mani D&apos;Oro silhouette.
              </p>
            </div>
          </div>

          {/*
            Mobile:  2 columns, no stagger offsets
            Desktop: 4 columns, with stagger offsets restored
          */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 items-start">
            {archiveItems.map((item) => (
              <div
                key={item.id}
                data-testid={`card-archive-${item.id}`}
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  marginTop: item.offset ? "0px" : "0",
                  boxShadow: "0 2px 16px rgba(29,28,18,0.06)",
                }}
              >
                {/* On md+, restore the staggered offset via inline style override */}
                <style>{`
                  @media (min-width: 768px) {
                    [data-testid="card-archive-${item.id}"] {
                      margin-top: ${item.offset ? "80px" : "0px"};
                    }
                  }
                `}</style>
                <img
                  src={item.image}
                  alt={`Archive — ${item.year}`}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ height: "clamp(180px, 30vw, 375px)" }}
                />
                <div className="absolute inset-0 bg-[rgba(29,28,18,0)] group-hover:bg-[rgba(29,28,18,0.4)] transition-all duration-500 flex items-center justify-center">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#fef9e9] opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {item.year}
                  </span>
                </div>
                <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(127,118,99,0.25)" }}>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#7f7663]" style={{ fontFamily: "'Manrope', sans-serif" }}>{item.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-50" />
    </main>
  );
};
