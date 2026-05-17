import { useState } from "react";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";

export const ContactPage = (): JSX.Element => {
  const [form, setForm] = useState({ name: "", email: "", message: "", interest: "bespoke commission" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  const WHATSAPP_NUMBER = "919000000000"; // Updated for Kishangarh, Rajasthan context
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%27m%20interested%20in%20a%20Mani%20D%27Oro%20bespoke%20commission%20with%20your%20Atelier.`;

  return (
    <div className="w-full min-h-screen" style={{ background: "#151710" }}>
      {/* Navigation */}
      <NavbarSection />

      {/* ── LUXURY HERO SECTION ────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:py-36 overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bespoke/consultation-dark.png"
            alt="Mani D'Oro consultation atelier"
            className="w-full h-full object-cover object-center opacity-15"
            style={{ filter: "grayscale(100%) brightness(0.4)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#151710] via-transparent to-[#151710]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-8 text-center flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c9a84c] font-['Manrope',sans-serif]">
            Let's Begin a Dialogue
          </span>
          <h1
            className="text-[clamp(40px,5vw,72px)] font-normal text-[#fef9e9] tracking-[-0.02em] leading-none"
            style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
          >
            Connect With <span className="italic text-[#c9a84c]">Our Ateliers</span>
          </h1>
          <p 
            className="text-sm md:text-base text-[#fef9e9]/60 max-w-[540px] leading-relaxed font-['Manrope',sans-serif] mt-2"
          >
            Whether commissioning a singular heirloom, scheduling an atelier visit, or inquiring about our collection—we welcome your communication.
          </p>
        </div>
      </section>

      {/* ── TWO COLUMN EDITORIAL GRID ──────────────────────── */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-8 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: ATELIER CHANNELS & INFORMATION (col-span-5) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-10">
            
            {/* Introductory Statement */}
            <div className="flex flex-col gap-4">
              <h3 
                className="text-xl text-[#fef9e9] font-normal italic"
                style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
              >
                "The artisan's work is a silent conversation that spans lifetimes."
              </h3>
              <p className="text-xs text-[#fef9e9]/50 leading-relaxed font-['Manrope',sans-serif]">
                We operate from two distinct sanctums: our design office in Milano, and our master craftsmanship foundry in the historical stone-forging city of Kishangarh, Rajasthan.
              </p>
            </div>

            {/* WhatsApp Integration */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-whatsapp"
              className="group flex items-center gap-5 p-6 transition-all duration-500 border border-[#25d366]/20 bg-[#25d366]/[0.03] hover:bg-[#25d366]/[0.08] hover:border-[#25d366]/40"
              style={{ textDecoration: "none" }}
            >
              <div className="w-12 h-12 rounded-full bg-[#25d366]/20 flex items-center justify-center transition-all group-hover:scale-105">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-[#25d366] uppercase font-['Manrope',sans-serif]">Instant Liaison</span>
                <span className="text-sm font-normal text-[#fef9e9] mt-0.5">Chat Directly on WhatsApp</span>
                <span className="text-[11px] text-[#fef9e9]/40 font-['Manrope',sans-serif]">Live correspondence with master jewelers</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="2" className="ml-auto transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            {/* Atelier Locations Cards */}
            <div className="flex flex-col gap-6">
              
              {/* Milan Design Office */}
              <div className="p-6 border border-[#c9a84c]/10 bg-[#fef9e9]/[0.02] flex flex-col gap-4">
                <div className="flex justify-between items-baseline border-b border-[#fef9e9]/10 pb-3">
                  <h4 className="text-sm font-bold tracking-widest text-[#c9a84c] uppercase font-['Manrope',sans-serif]">Milano Atelier</h4>
                  <span className="text-[9px] tracking-widest text-[#fef9e9]/40 uppercase font-['Manrope',sans-serif]">Design &amp; Consultation</span>
                </div>
                <div className="flex flex-col gap-2 text-xs text-[#fef9e9]/70 font-['Manrope',sans-serif] leading-relaxed">
                  <p>📍 Via Montenapoleone 8, Milan, Italy</p>
                  <p>✉️ milano@manidoro.com</p>
                  <p>📞 +39 02 7600 0000</p>
                  <p>🕒 By Appointment Only (Mon - Sat)</p>
                </div>
              </div>

              {/* Kishangarh Heritage Studio */}
              <div className="p-6 border border-[#c9a84c]/20 bg-[#c9a84c]/[0.03] flex flex-col gap-4">
                <div className="flex justify-between items-baseline border-b border-[#c9a84c]/20 pb-3">
                  <h4 className="text-sm font-bold tracking-widest text-[#c9a84c] uppercase font-['Manrope',sans-serif]">Kishangarh Foundry</h4>
                  <span className="text-[9px] tracking-widest text-[#c9a84c] uppercase font-['Manrope',sans-serif]">Craft &amp; Forging</span>
                </div>
                <div className="flex flex-col gap-2 text-xs text-[#fef9e9]/70 font-['Manrope',sans-serif] leading-relaxed">
                  <p>📍 Madanganj Industrial Area, Kishangarh, Rajasthan, India</p>
                  <p>✉️ kishangarh@manidoro.com</p>
                  <p>📞 +91 1463 240000</p>
                  <p>🕒 Production Center &amp; Marble Showroom</p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: LUXURY COMMISSION FORM (col-span-7) */}
          <div className="col-span-1 lg:col-span-7 bg-[#fef9e9]/[0.02] border border-[#fef9e9]/10 p-8 md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-6 py-16 text-center animate-fade-in">
                <div className="w-16 h-16 border border-[#c9a84c]/60 rounded-full flex items-center justify-center bg-[#c9a84c]/5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-normal text-[#fef9e9] italic" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>
                    Dialogue Commenced
                  </h3>
                  <p className="text-xs text-[#fef9e9]/60 max-w-[340px] leading-relaxed font-['Manrope',sans-serif]">
                    Our concierge is reviewing your request. A specialist from Milano or Kishangarh will respond within 12 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 font-['Manrope',sans-serif] text-[9px] font-bold tracking-[0.2em] uppercase text-[#c9a84c] border border-[#c9a84c]/30 hover:border-[#c9a84c]/80 py-3 px-6 transition-all"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-normal text-[#fef9e9] tracking-tight" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>
                    Atelier Commission Form
                  </h2>
                  <p className="text-xs text-[#fef9e9]/50 font-['Manrope',sans-serif]">
                    Fill in your details to open correspondence. Our master goldsmiths and design concierges collaborate directly with you on every step.
                  </p>
                </div>

                {/* Nature of Enquiry Tabs */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[9px] font-bold tracking-widest text-[#c9a84c] uppercase font-['Manrope',sans-serif]">
                    Inquiry Directive
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["Bespoke Commission", "Milano Appointment", "Kishangarh Tour", "Press Directive"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, interest: opt.toLowerCase() }))}
                        className={`py-3 px-2 text-[10px] font-bold tracking-wider uppercase border transition-all text-center font-['Manrope',sans-serif] ${
                          form.interest === opt.toLowerCase()
                            ? "bg-[#c9a84c]/10 border-[#c9a84c] text-[#c9a84c]"
                            : "bg-[#fef9e9]/5 border-transparent text-[#fef9e9]/50 hover:border-[#fef9e9]/20 hover:text-[#fef9e9]/80"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name-input" className="text-[9px] font-bold tracking-widest text-[#c9a84c] uppercase font-['Manrope',sans-serif]">Your Name</label>
                    <input
                      id="name-input"
                      type="text"
                      placeholder="e.g. Jean Aurelius"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-[#fef9e9]/5 border border-[#fef9e9]/10 py-3.5 px-4 font-['Manrope',sans-serif] text-xs text-[#fef9e9] outline-none transition-all focus:border-[#c9a84c]/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email-input" className="text-[9px] font-bold tracking-widest text-[#c9a84c] uppercase font-['Manrope',sans-serif]">Electronic Mail</label>
                    <input
                      id="email-input"
                      type="email"
                      placeholder="e.g. collector@heirloom.com"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-[#fef9e9]/5 border border-[#fef9e9]/10 py-3.5 px-4 font-['Manrope',sans-serif] text-xs text-[#fef9e9] outline-none transition-all focus:border-[#c9a84c]/50"
                    />
                  </div>
                </div>

                {/* Message text area */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message-input" className="text-[9px] font-bold tracking-widest text-[#c9a84c] uppercase font-['Manrope',sans-serif]">The Narrative or Inquiry</label>
                  <textarea
                    id="message-input"
                    placeholder="Describe your design intent, reference motifs, or custom dimensions you desire..."
                    rows={5}
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-[#fef9e9]/5 border border-[#fef9e9]/10 py-3.5 px-4 font-['Manrope',sans-serif] text-xs text-[#fef9e9] leading-relaxed outline-none resize-none transition-all focus:border-[#c9a84c]/50"
                  />
                </div>

                {/* Submit button and privacy note */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t border-[#fef9e9]/10 mt-2">
                  <span className="text-[9px] font-light tracking-wider text-[#fef9e9]/30 uppercase font-['Manrope',sans-serif]">
                    // Secure, end-to-end luxury correspondence
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto font-['Manrope',sans-serif] text-[10px] font-bold tracking-[0.25em] uppercase text-[#151710] bg-[#c9a84c] hover:bg-[#b5953e] py-4 px-10 border-0 transition-colors cursor-pointer"
                  >
                    Initiate Connection
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* ── INTERACTIVE KISHANGARH MAP SECTION ──────────────── */}
      <section className="w-full bg-[#10110c] py-24 border-t border-[#c9a84c]/10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8 flex flex-col gap-10">
          
          {/* Map Header details */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#fef9e9]/10 pb-10">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a84c] font-['Manrope',sans-serif]">
                Heritage Location
              </span>
              <h2
                className="text-3xl md:text-4xl font-normal text-[#fef9e9]"
                style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
              >
                The Kishangarh Foundry, <br />
                <span className="italic text-[#c9a84c]">Rajasthan, India</span>
              </h2>
            </div>
            
            <p className="text-xs text-[#fef9e9]/50 max-w-[420px] leading-relaxed font-['Manrope',sans-serif]">
              Nestled in Rajasthan’s historical white-marble core, our forging foundry is surrounded by generations of master stone carvers, goldsmiths, and painters. All raw casting takes place here, infusing local architectural symmetry into every golden curve.
            </p>
          </div>

          {/* Styled Luxury Dark-Filter Google Map */}
          <div className="relative w-full aspect-[21/9] min-h-[300px] border border-[#c9a84c]/20 overflow-hidden bg-[#151710]">
            <iframe
              src="https://maps.google.com/maps?q=Kishangarh,Rajasthan,India&t=m&z=12&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              title="Kishangarh, Rajasthan, India Location Map"
              style={{
                border: 0,
                filter: "grayscale(1) invert(0.92) sepia(0.35) hue-rotate(22deg) brightness(0.85) contrast(1.15)"
              }}
              allowFullScreen={false}
              loading="lazy"
            />
            
            {/* Elegant compass ornament / overlay details on map */}
            <div className="absolute bottom-6 left-6 p-4 bg-[#10110c]/90 border border-[#c9a84c]/30 backdrop-blur-md hidden sm:flex flex-col gap-1.5 font-['Manrope',sans-serif]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-[#fef9e9] uppercase">Mani D'Oro Foundry</span>
              </div>
              <span className="text-[9px] text-[#fef9e9]/60 uppercase">Co-ordinates: 26.5724° N, 74.8638° E</span>
              <span className="text-[9px] text-[#c9a84c] uppercase">Rajasthan Heritage Guild #MT-400</span>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};
