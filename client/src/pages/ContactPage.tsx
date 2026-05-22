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
            Get In Touch
          </span>
          <h1
            className="text-[clamp(40px,5vw,72px)] font-normal text-[#fef9e9] tracking-[-0.02em] leading-none"
            style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
          >
            Contact <span className="italic text-[#c9a84c]">Us</span>
          </h1>
          <p 
            className="text-sm md:text-base text-[#fef9e9]/60 max-w-[540px] leading-relaxed font-['Manrope',sans-serif] mt-2"
          >
            We invite you to reach out for a private consultation, bespoke inquiries, or to discuss our latest collections. Our concierge team is at your disposal for any assistance you may require.
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
                Because great jewellery deserves great conversations too.
              </h3>
              <p className="text-xs text-[#fef9e9]/50 leading-relaxed font-['Manrope',sans-serif]">
                Reach out to us anytime and our team will get back to you as soon as possible.
              </p>
              <p className="text-xs text-[#fef9e9]/80 font-bold font-['Manrope',sans-serif] mt-2">
                Working Hours: Monday – Saturday | 10 AM – 7 PM
              </p>
            </div>

            {/* Email Contact */}
            <a
              href="mailto:manidoro.official@gmail.com"
              className="group flex items-center gap-5 p-6 transition-all duration-500 border border-[#c9a84c]/10 bg-[#fef9e9]/[0.02] hover:bg-[#c9a84c]/[0.05] hover:border-[#c9a84c]/30"
              style={{ textDecoration: "none" }}
            >
              <div className="w-12 h-12 rounded-full border border-[#c9a84c]/20 flex items-center justify-center transition-all group-hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-[#c9a84c] uppercase font-['Manrope',sans-serif]">Email</span>
                <span className="text-sm font-normal text-[#fef9e9] mt-0.5">manidoro.official@gmail.com</span>
              </div>
            </a>

            {/* Social Links */}
            <div className="flex flex-col gap-4 pt-6">
              <h4 className="text-[10px] font-bold tracking-widest text-[#fef9e9]/40 uppercase font-['Manrope',sans-serif]">Follow Our Journey</h4>
              <div className="flex gap-4">
                <a href="https://instagram.com/manidoro" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-[#fef9e9]/10 hover:border-[#c9a84c] flex items-center justify-center text-[#fef9e9]/60 hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all rounded-full">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
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

      {/* Footer */}
      <FooterSection />
    </div>
  );
};
