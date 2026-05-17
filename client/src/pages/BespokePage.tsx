import { useState } from "react";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";

// Journey Steps Data
const JOURNEY_STEPS = [
  {
    number: "I",
    title: "The Dialogue & Vision",
    phase: "Consultation",
    description: "Your journey begins with a private conversation in our Milanese atelier or via video link. Together, we explore your memories, motifs, and desires, defining the soul of your future heirloom.",
    image: "/figmaAssets/jeweler-working-on-a-custom-piece.png"
  },
  {
    number: "II",
    title: "The Birth of Form",
    phase: "Sketching",
    description: "Alessandra Oro translates your words into delicate hand-drawn gouache sketches. These drawings capture the precise interplay of shadow, gold contour, and light before any metal is touched.",
    image: "/bespoke/sketch-design.png"
  },
  {
    number: "III",
    title: "Sourcing the Soul",
    phase: "Stone Selection",
    description: "We source ethically certified gemstones from around the world. Every diamond, sapphire, and emerald is personally selected by our gemologists for its raw character and unique fire.",
    image: "/bespoke/stones-editorial.png"
  },
  {
    number: "IV",
    title: "Alchemical Forging",
    phase: "Hand Forging",
    description: "Using ancient fire and hand-forged tools, our master goldsmiths melt and hammer solid 22k gold. Each mallet stroke imprints a singular, unrepeatable narrative into the metal.",
    image: "/bespoke/forging-gold.png"
  },
  {
    number: "V",
    title: "Patina of Time",
    phase: "Finishing",
    description: "The piece is meticulously polished using traditional fibers, achieving our signature whispered patina—a warm, muted finish that glows with quiet antiquity rather than harsh reflection.",
    image: "/bespoke/finishing-detail.png"
  },
  {
    number: "VI",
    title: "The Handoff",
    phase: "Delivery",
    description: "Presented in a custom hand-stitched leather dossier and linen case, your bespoke artifact is delivered alongside the original gouache drawings, officially registered in the Mani D’Oro archives.",
    image: "/figmaAssets2/bespoke-services.png"
  }
];

// Showcase Curated Pieces Data
const CURATED_PIECES = [
  {
    id: "bespoke-1",
    category: "The Aurelius Signature",
    title: "Aurelius Intaglio Signet",
    description: "Hand-carved solid 22k gold featuring client’s ancestral seal, set in an uneven, ancient-style mold.",
    stone: "Raw Colombian Emerald",
    metal: "22k Yellow Gold",
    image: "/figmaAssets/close-up-of-artisanal-gold-jewelry-on-a-person.png"
  },
  {
    id: "bespoke-2",
    category: "The Liquid Gold Study",
    title: "The Gilded Drift Choker",
    description: "A continuous flow of molten gold individually draped to follow the exact contours of the collector’s collarbone.",
    stone: "Cognac Brilliant-cut Diamonds",
    metal: "18k Red Gold & 22k Yellow Gold Blend",
    image: "/figmaAssets/the-aurelius-chain---detailed-gold-link-necklace.png"
  },
  {
    id: "bespoke-3",
    category: "Textured Orbits",
    title: "Molten Ripple Hoops",
    description: "Sculpted in a flame-forged gold texture, capturing light with organic movement and customized length.",
    stone: "Whisper-cut White Diamonds",
    metal: "24k Pure Gold Wash over 18k Silver Alloy",
    image: "/figmaAssets/molten-hoops---textured-gold-earrings.png"
  }
];

// Materials Details
const CRAFT_ASSETS = [
  {
    title: "Goldsmithing Tools",
    subtitle: "Legacy Implements",
    description: "Anvils, fine files, and hand-forging tools that have been passed down through generations of Milanese masters.",
    image: "/figmaAssets/jeweler-working-on-a-custom-piece.png"
  },
  {
    title: "Gouache Archives",
    subtitle: "Drawn in Light",
    description: "Original render designs painted with watercolor and bodycolor on grey card—the traditional luxury standard.",
    image: "/bespoke/sketch-design.png"
  },
  {
    title: "Whispering Gold",
    subtitle: "22k Proprietary Alloy",
    description: "Melted at over 1,000°C, our custom blend possesses a warm, soft tone reminiscent of Etruscan treasures.",
    image: "/bespoke/forging-gold.png"
  },
  {
    title: "Uncut Treasures",
    subtitle: "Raw Gemstones",
    description: "We embrace stones with natural inclusions—called 'jardins'—which tell the story of their deep earth journey.",
    image: "/bespoke/stones-editorial.png"
  }
];

export const BespokePage = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full min-h-screen" style={{ background: "#F3EFE6" }}>
      {/* Navigation */}
      <NavbarSection />

      {/* Spacing for fixed navbar */}
      <div className="pt-20" />

      {/* ── 1. CINEMATIC HERO SECTION ───────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: "calc(100vh - 80px)", minHeight: "650px" }}>
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bespoke/hero-workshop.png"
            alt="Mani D'Oro artisan jewelry workshop"
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-[10000ms] hover:scale-105"
            style={{ filter: "brightness(0.5) contrast(1.1) sepia(10%)" }}
          />
          {/* Soft Editorial Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B18]/95 via-transparent to-[#1F1B18]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F1B18]/40 via-transparent to-[#1F1B18]/40" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-20 md:pb-28">
          <div className="mx-auto max-w-[1280px] w-full px-4 sm:px-8 flex flex-col items-start gap-6 md:gap-8 animate-fade-up">
            
            {/* Section Tag */}
            <span 
              className="text-xs font-bold tracking-[0.25em] uppercase text-[#A8842C]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              The Atelier Commission
            </span>

            {/* Headline */}
            <h1
              className="text-[clamp(44px,6.2vw,96px)] font-normal text-[#F3EFE6] leading-[1.05] tracking-[-0.03em] max-w-[950px]"
              style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
            >
              Crafted For One.<br />
              <span className="italic text-[#E8E0D2]">Meant For Generations.</span>
            </h1>

            {/* Paragraph */}
            <p
              className="text-base md:text-lg leading-relaxed text-[#E8E0D2]/80 max-w-[480px]"
              style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400 }}
            >
              Step into the inner sanctum of hand-forged jewelry. A bespoke commission is more than gold and stone—it is a private sanctuary where your memory becomes timeless sculpture.
            </p>

            {/* Action Button */}
            <div className="mt-4 flex flex-col sm:flex-row gap-5">
              <a 
                href="#consultation" 
                className="luxury-btn-gold" 
                style={{ textDecoration: "none", background: "#9C7A2B" }}
                onMouseEnter={e => e.currentTarget.style.background = "#A8842C"}
                onMouseLeave={e => e.currentTarget.style.background = "#9C7A2B"}
              >
                Begin Your Commission
              </a>
              <a 
                href="#journey" 
                className="inline-flex items-center justify-center font-['Manrope',sans-serif] text-[11px] font-bold tracking-[0.18em] uppercase text-[#F3EFE6] border border-[#F3EFE6]/30 hover:border-[#F3EFE6]/80 hover:bg-[#F3EFE6]/5 transition-all py-4 px-8"
                style={{ textDecoration: "none" }}
              >
                Our Process
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. BESPOKE PHILOSOPHY SECTION ─────────────────────── */}
      <section className="w-full py-28 md:py-36 bg-[#E8E0D2] overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left: luxury storytelling copy */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#9C7A2B]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Atelier Philosophy
              </span>
              
              <h2 
                className="text-[clamp(32px,3.8vw,56px)] font-normal text-[#2A241F] leading-[1.1] tracking-[-0.01em]"
                style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
              >
                The Beauty of the <br />
                <span className="italic text-[#9C7A2B]">Unrepeatable Mark</span>
              </h2>

              <p 
                className="text-base md:text-lg text-[#5E5146] leading-relaxed"
                style={{ fontFamily: "'Noto Serif', Georgia, serif", fontStyle: "italic" }}
              >
                “In an age of mechanical precision, we choose the heavy blow of the hammer. We choose the unpredictable path of fire. We choose to make jewelry that breathes with life.”
              </p>

              <div className="flex flex-col gap-6 text-sm text-[#5E5146] leading-relaxed font-['Manrope',sans-serif]">
                <p>
                  Every bespoke creation is designed around the concept of <strong>intentional imperfection</strong>. The subtle wave in a gold cuff, the uneven texture carved into a band, the unique deep inclusion in an unheated sapphire—these are not flaws. They are the signature marks of human hands, ensuring that no copy will ever exist in this world.
                </p>
                <p>
                  Our work is built on <strong>emotional craftsmanship</strong>. We do not manufacture; we commune. A commission takes weeks of slow devotion, forging an heirloom destined to be handed down for decades to come, carrying your story into the deep future.
                </p>
              </div>

              <div className="pt-4">
                <div className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#9C7A2B]">
                  <span>ESTABLISHED IN MILAN</span>
                  <div className="w-8 h-px bg-[#9C7A2B]" />
                  <span>22K ATELIER STANDARD</span>
                </div>
              </div>
            </div>

            {/* Right: framed artisan imagery */}
            <div className="lg:col-span-6">
              <div className="relative p-5">
                {/* Outer decorative borders to feel like a high-end magazine layout */}
                <div className="absolute inset-0 border border-[#9C7A2B]/20 pointer-events-none" />
                <div className="absolute" style={{ inset: "8px", border: "1px solid #9C7A2B/10", pointerEvents: "none" }} />
                
                {/* Main image */}
                <div className="relative overflow-hidden aspect-[4/5] bg-[#2B2118]">
                  <img
                    src="/figmaAssets2/bespoke-services.png"
                    alt="Master sketch of jewelry design"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                    style={{ filter: "contrast(1.02) sepia(5%) brightness(0.95)" }}
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2118]/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. CREATION JOURNEY TIMELINE ─────────────────────── */}
      <section id="journey" className="w-full py-28 md:py-36 bg-[#EFE7DA] border-t border-[#E8E0D2]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-4 mb-20">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#9C7A2B]" style={{ fontFamily: "'Manrope', sans-serif" }}>
              The Creation Journey
            </span>
            <h2 
              className="text-[clamp(32px,4vw,56px)] font-normal text-[#2A241F] tracking-[-0.01em]"
              style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
            >
              From Whisper to <span className="italic text-[#9C7A2B]">Heirloom</span>
            </h2>
            <div className="w-16 h-[1.5px] bg-[#9C7A2B]/40 mt-2" />
          </div>

          {/* Interactive Editorial Process Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Process Navigation (Left Column) */}
            <div className="lg:col-span-5 flex flex-col gap-0 border-l border-[#2A241F]/10 pl-6">
              {JOURNEY_STEPS.map((step, idx) => (
                <button
                  key={step.phase}
                  onClick={() => setActiveStep(idx)}
                  className="group flex flex-col items-start text-left py-6 relative outline-none transition-all duration-300"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  {/* Indicator line on active */}
                  {activeStep === idx && (
                    <div className="absolute left-[-25px] top-0 bottom-0 w-[2px] bg-[#9C7A2B]" />
                  )}

                  <div className="flex items-center gap-3">
                    <span 
                      className="text-xs font-bold tracking-widest text-[#9C7A2B]"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {step.number}
                    </span>
                    <span 
                      className="text-[10px] font-bold tracking-[0.25em] uppercase px-2 py-0.5"
                      style={{ 
                        fontFamily: "'Manrope', sans-serif", 
                        background: activeStep === idx ? "#9C7A2B" : "transparent",
                        color: activeStep === idx ? "#F3EFE6" : "#8A7D70",
                        transition: "all 0.3s"
                      }}
                    >
                      {step.phase}
                    </span>
                  </div>

                  <h3 
                    className="text-xl md:text-2xl mt-2 transition-all duration-300"
                    style={{ 
                      fontFamily: "'Noto Serif', Georgia, serif", 
                      color: activeStep === idx ? "#2A241F" : "#8A7D70",
                      fontWeight: activeStep === idx ? 400 : 300,
                      fontStyle: "italic"
                    }}
                  >
                    {step.title}
                  </h3>
                </button>
              ))}
            </div>

            {/* Step Detail Panel (Right Column) */}
            <div className="lg:col-span-7 bg-[#E8E0D2]/50 p-8 md:p-12 relative overflow-hidden transition-all duration-500">
              <div className="flex flex-col gap-8">
                
                {/* Step Image */}
                <div className="relative overflow-hidden aspect-[16/10] bg-[#2B2118]">
                  <img
                    src={JOURNEY_STEPS[activeStep].image}
                    alt={JOURNEY_STEPS[activeStep].title}
                    className="w-full h-full object-cover transition-all duration-[1500ms] hover:scale-105"
                    style={{ filter: "brightness(0.9) contrast(1.05) sepia(10%)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2118]/30 to-transparent pointer-events-none" />
                </div>

                {/* Step Copy */}
                <div className="flex flex-col gap-4">
                  <span className="text-[11px] font-bold tracking-[0.22em] text-[#9C7A2B] uppercase font-['Manrope',sans-serif]">
                    Phase {JOURNEY_STEPS[activeStep].number} — {JOURNEY_STEPS[activeStep].phase}
                  </span>
                  
                  <h4 
                    className="text-2xl md:text-3xl font-normal text-[#2A241F]"
                    style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
                  >
                    {JOURNEY_STEPS[activeStep].title}
                  </h4>

                  <p 
                    className="text-sm md:text-base text-[#5E5146] leading-relaxed"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {JOURNEY_STEPS[activeStep].description}
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. INTERACTIVE JEWELRY SHOWCASE ───────────────────── */}
      <section className="w-full py-28 md:py-36 bg-[#F3EFE6] border-t border-[#E8E0D2]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          
          {/* Section title */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#9C7A2B]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Curated Archives
              </span>
              <h2 
                className="text-[clamp(32px,3.8vw,56px)] font-normal text-[#2A241F] tracking-[-0.01em]"
                style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
              >
                Recent Bespoke <br />
                <span className="italic text-[#9C7A2B]">Commission Works</span>
              </h2>
            </div>
            
            <p 
              className="text-sm md:text-base text-[#5E5146] max-w-[360px] leading-relaxed"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Each piece shown here was commissioned by a private collector. These are not commercial items for purchase, but references for your own bespoke exploration.
            </p>
          </div>

          {/* Luxury Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CURATED_PIECES.map((piece) => (
              <article
                key={piece.id}
                className="product-card group relative overflow-hidden bg-[#2B2118]"
                style={{ aspectRatio: "3/4" }}
              >
                {/* Card Image */}
                <img
                  src={piece.image}
                  alt={piece.title}
                  className="w-full h-full object-cover"
                />

                {/* Permanent Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B18]/90 via-[#1F1B18]/20 to-[#1F1B18]/10 opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Info Overlay: Bottom slide-up */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10 transition-all duration-500">
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#A8842C] mb-2 font-['Manrope',sans-serif]">
                    {piece.category}
                  </span>

                  <h3 
                    className="text-2xl font-normal text-[#F3EFE6] leading-tight mb-2 group-hover:text-[#A8842C] transition-colors"
                    style={{ fontFamily: "'Noto Serif', Georgia, serif", fontStyle: "italic" }}
                  >
                    {piece.title}
                  </h3>

                  {/* Details revealed on hover */}
                  <div className="h-0 opacity-0 overflow-hidden transition-all duration-500 ease-out group-hover:h-auto group-hover:opacity-100 group-hover:mt-2">
                    <p className="text-xs leading-relaxed text-[#E8E0D2]/70 mb-4 font-['Manrope',sans-serif]">
                      {piece.description}
                    </p>

                    {/* Metadata stats */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#F3EFE6]/10 text-[9px] font-bold tracking-wider uppercase text-[#E8E0D2]/60 font-['Manrope',sans-serif]">
                      <div>
                        <span className="block text-[#A8842C]">Stone Selection</span>
                        <span className="block text-[#F3EFE6] mt-0.5 truncate">{piece.stone}</span>
                      </div>
                      <div>
                        <span className="block text-[#A8842C]">Alloy Spec</span>
                        <span className="block text-[#F3EFE6] mt-0.5 truncate">{piece.metal}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Subtle Luxury Golden Glow in Corners on Hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                     style={{ boxShadow: "inset 0 0 40px rgba(168, 132, 44, 0.15)" }} />
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. ARTISAN STORY SECTION ─────────────────────────── */}
      <section className="w-full py-28 md:py-36 bg-[#2B2118] text-[#F3EFE6] overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="p-4" style={{ border: "1px solid rgba(243,239,230,0.15)" }}>
                <div className="absolute inset-0 pointer-events-none" style={{ margin: "10px", border: "1px solid rgba(243,239,230,0.05)" }} />
                
                <div className="relative overflow-hidden aspect-[4/5] bg-[#1F1B18]">
                  <img
                    src="/figmaAssets2/founder-portrait.png"
                    alt="Alessandra Oro - Master Goldsmith"
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.9)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B18]/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#A8842C]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Behind the Hammer
              </span>

              <blockquote className="m-0 flex flex-col gap-6">
                <span className="text-6xl font-normal text-[#A8842C] opacity-40 leading-none h-4" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>
                  “
                </span>
                <p 
                  className="text-2xl md:text-3xl font-light italic text-[#F3EFE6] leading-relaxed"
                  style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
                >
                  My hands carry the weight of three generations of goldsmiths. When I melt gold at the furnace, I am not merely casting an object—I am molding a memory that will endure when we are all gone.
                </p>
              </blockquote>

              <div className="flex flex-col gap-6 text-sm text-[#E8E0D2]/80 leading-relaxed font-['Manrope',sans-serif] max-w-[580px]">
                <p>
                  Alessandra Oro established her private workshop in Milan to preserve the traditional techniques of high-carat gold-forging. Her process eschews computer-aided design entirely, relying on the alignment of eye, hand, and flame.
                </p>
                <p>
                  Every bespoke design is finalized under her personal supervision. She hand-forges each center bezel, hand-carves the wax matrices, and registers the final hallmark inside the heirloom ring.
                </p>
              </div>

              {/* Signature / Title */}
              <div className="pt-6 border-t border-[#F3EFE6]/10 flex flex-col gap-1">
                <p 
                  className="text-2xl text-[#A8842C] font-light"
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif", fontStyle: "italic" }}
                >
                  Alessandra Oro
                </p>
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#E8E0D2]/50 uppercase font-['Manrope',sans-serif]">
                  Creative Director &amp; Master Goldsmith
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 6. MATERIALS & CRAFTSMANSHIP ─────────────────────── */}
      <section className="w-full py-28 md:py-36 bg-[#E8E0D2] overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          
          {/* Header */}
          <div className="flex flex-col gap-4 mb-20 max-w-[650px]">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#9C7A2B]" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Atelier Resources
            </span>
            <h2 
              className="text-[clamp(32px,3.8vw,56px)] font-normal text-[#2A241F] leading-tight tracking-[-0.01em]"
              style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
            >
              Material Integrity &amp; <br />
              <span className="italic text-[#9C7A2B]">Artisanal Implements</span>
            </h2>
            <p className="text-sm md:text-base text-[#5E5146] leading-relaxed mt-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Our workshop is a living library of ancient goldsmithing techniques. Explore the core pillars of our physical craft—each raw material and tool selected for its physical weight and historical resonance.
            </p>
          </div>

          {/* Layered Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CRAFT_ASSETS.map((asset, idx) => (
              <div 
                key={asset.title}
                className="bg-[#EFE7DA] p-6 relative flex flex-col gap-6 justify-between border border-[#9C7A2B]/10 hover:border-[#9C7A2B]/40 transition-all duration-500 hover:-translate-y-1"
                style={{ minHeight: "380px" }}
              >
                {/* Index Card Numbering */}
                <div className="flex justify-between items-baseline border-b border-[#2A241F]/10 pb-4">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#9C7A2B] uppercase font-['Manrope',sans-serif]">
                    {asset.subtitle}
                  </span>
                  <span className="text-xs text-[#8A7D70] font-light">
                    0{idx + 1} // MT-SPEC
                  </span>
                </div>

                {/* Thumbnail Image */}
                <div className="relative overflow-hidden aspect-[16/10] bg-[#2B2118] my-2">
                  <img
                    src={asset.image}
                    alt={asset.title}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.95) contrast(1.02) sepia(5%)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2118]/10 to-transparent" />
                </div>

                {/* Core Copy */}
                <div className="flex flex-col gap-2">
                  <h3 
                    className="text-lg md:text-xl font-normal text-[#2A241F]"
                    style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
                  >
                    {asset.title}
                  </h3>
                  <p 
                    className="text-xs leading-relaxed text-[#5E5146]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {asset.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. BESPOKE CONSULTATION CTA ──────────────────────── */}
      <section id="consultation" className="relative w-full overflow-hidden" style={{ minHeight: "550px" }}>
        
        {/* Dark Background Photo with Cinematic Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bespoke/consultation-dark.png"
            alt="Mani D'Oro private consultation atelier"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.3) contrast(1.1) sepia(12%)" }}
          />
          {/* Heavy Gradients to lock colors */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2B2118]/90 via-[#1F1B18]/95 to-[#1F1B18]" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full py-28 md:py-36 flex flex-col justify-center items-center text-center px-8 text-[#F3EFE6]">
          <div className="max-w-[700px] w-full flex flex-col items-center gap-6">
            
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A8842C] font-['Manrope',sans-serif]">
              Initiate Commission
            </span>

            <h2 
              className="text-[clamp(32px,4.5vw,64px)] font-normal text-[#F3EFE6] leading-tight tracking-[-0.01em]"
              style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
            >
              Begin Your Story <br />
              <span className="italic text-[#A8842C]">With Mani D’Oro</span>
            </h2>

            <div className="w-12 h-px bg-[#A8842C]/40 my-2" />

            <p 
              className="text-sm md:text-base leading-relaxed text-[#E8E0D2]/80 max-w-[500px]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              The path to a handcrafted masterpiece begins with a single query. Reach out to our atelier team to schedule your initial private consultation, in-person or remote.
            </p>

            <div className="mt-6">
              <a 
                href="/contact" 
                className="luxury-btn-gold" 
                style={{ textDecoration: "none", background: "#9C7A2B" }}
                onMouseEnter={e => e.currentTarget.style.background = "#A8842C"}
                onMouseLeave={e => e.currentTarget.style.background = "#9C7A2B"}
              >
                Schedule Private Consultation
              </a>
            </div>

            <p className="text-[10px] tracking-widest text-[#E8E0D2]/40 uppercase mt-4 font-['Manrope',sans-serif]">
              Milano — Via della Spiga 12 // commissions@manidoro.it
            </p>

          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};
