import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";

interface PolicyPageProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
}

function PolicyLayout({ title, subtitle, lastUpdated, sections }: PolicyPageProps) {
  return (
    <div style={{ minHeight: "100vh", background: "#fef9e9" }}>
      <NavbarSection />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "140px 24px 100px" }}>
        <span style={{
          fontFamily: "'Manrope', sans-serif", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.4em", textTransform: "uppercase",
          color: "rgba(201,168,76,0.6)", display: "block", marginBottom: 16,
        }}>{subtitle}</span>

        <h1 style={{
          fontFamily: "'Noto Serif', Georgia, serif", fontSize: "clamp(32px, 6vw, 48px)",
          fontWeight: 400, color: "#1d1c12", margin: "0 0 16px", lineHeight: 1.1,
        }}>{title}</h1>

        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: 11,
          color: "rgba(29,28,18,0.3)", letterSpacing: "0.1em", marginBottom: 48,
        }}>Last updated: {lastUpdated}</p>

        <div style={{ width: 60, height: 1, background: "#c9a84c", marginBottom: 48 }} />

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <h2 style={{
              fontFamily: "'Noto Serif', Georgia, serif", fontSize: 20,
              fontWeight: 400, color: "#1d1c12", margin: "0 0 14px",
            }}>{s.heading}</h2>
            <p style={{
              fontFamily: "'Manrope', sans-serif", fontSize: 13, lineHeight: 1.9,
              color: "rgba(29,28,18,0.55)", margin: 0, whiteSpace: "pre-line",
            }}>{s.body}</p>
          </div>
        ))}
      </div>
      <FooterSection />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SHIPPING PAGE
// ═══════════════════════════════════════════════════════════════════════════
export const ShippingPage = (): JSX.Element => (
  <PolicyLayout
    title="Shipping"
    subtitle="Client Care"
    lastUpdated="January 2024"
    sections={[
      { heading: "Handcrafted to Order", body: "Every Mani D'Oro piece is handcrafted individually after your order is placed. Please allow 4–6 weeks for production. Bespoke commissions may require 8–12 weeks depending on complexity.\n\nYou will receive a personal update from our atelier when your piece enters the finishing stage." },
      { heading: "Worldwide Delivery", body: "We offer complimentary insured shipping worldwide via our trusted courier partners. Every package is dispatched with full insurance, real-time tracking, and requires a signature upon delivery.\n\nDomestic (India): 3–5 business days after dispatch\nEurope: 5–7 business days after dispatch\nRest of World: 7–10 business days after dispatch" },
      { heading: "Packaging", body: "Each piece arrives in a hand-stitched leather folio, accompanied by a certificate of authenticity, original design sketches, and care instructions. Our packaging is designed to be kept — it is part of the experience." },
      { heading: "Customs & Duties", body: "International orders may be subject to import duties and taxes, which are the responsibility of the buyer. We declare accurate values on all customs documentation. For assistance, please contact our client care team before placing your order." },
      { heading: "Questions?", body: "For any shipping enquiries, please reach out via our Contact page or email commissions@manidoro.it. We are here to ensure your piece arrives safely." },
    ]}
  />
);

// ═══════════════════════════════════════════════════════════════════════════
// RETURNS PAGE
// ═══════════════════════════════════════════════════════════════════════════
export const ReturnsPage = (): JSX.Element => (
  <PolicyLayout
    title="Returns & Exchanges"
    subtitle="Client Care"
    lastUpdated="January 2024"
    sections={[
      { heading: "Our Promise", body: "We stand behind the craftsmanship of every piece that leaves our atelier. If your Mani D'Oro piece does not meet the exacting standards you expect, we will work with you to make it right." },
      { heading: "Returns Policy", body: "Non-bespoke pieces may be returned within 14 days of delivery, provided they are in unworn condition and in their original packaging.\n\nBespoke and personalised commissions are final sale and cannot be returned, as each piece is crafted specifically for you." },
      { heading: "How to Initiate a Return", body: "1. Contact us at commissions@manidoro.it with your order number.\n2. Our team will provide a prepaid return label and instructions.\n3. Once we receive and inspect the piece, a full refund will be processed within 5 business days.\n\nPlease do not ship pieces back without first contacting us — we need to ensure proper insurance coverage for the return transit." },
      { heading: "Repairs & Resizing", body: "We offer complimentary resizing and maintenance for all Mani D'Oro pieces, for the lifetime of the piece. Contact us to arrange a service appointment. Pieces will be returned to you within 2–3 weeks." },
      { heading: "Damaged or Defective Items", body: "In the unlikely event that your piece arrives damaged, please contact us immediately with photographs. We will arrange a replacement or full refund at no additional cost to you." },
    ]}
  />
);

// ═══════════════════════════════════════════════════════════════════════════
// PRIVACY POLICY PAGE
// ═══════════════════════════════════════════════════════════════════════════
export const PrivacyPage = (): JSX.Element => (
  <PolicyLayout
    title="Privacy Policy"
    subtitle="Legal"
    lastUpdated="January 2024"
    sections={[
      { heading: "Introduction", body: "Mani D'Oro (\"we\", \"us\", \"our\") is committed to protecting the privacy of our clients and visitors. This policy explains how we collect, use, and safeguard your personal information when you visit our website or engage with our services." },
      { heading: "Information We Collect", body: "We may collect the following information:\n\n• Name and contact details (email, phone, address) when you place an order or submit an enquiry.\n• Payment information processed securely through our third-party payment providers.\n• Browsing data (cookies, IP address, pages visited) to improve your experience.\n• Commission preferences and design notes shared during the bespoke process." },
      { heading: "How We Use Your Information", body: "Your information is used exclusively to:\n\n• Fulfil and deliver your orders.\n• Communicate about your commissions and enquiries.\n• Send occasional updates about new collections (only with your consent).\n• Improve our website and services.\n\nWe never sell, rent, or share your personal information with third parties for marketing purposes." },
      { heading: "Data Security", body: "We implement industry-standard security measures to protect your data. Payment information is encrypted and processed through PCI-compliant providers. We retain your data only as long as necessary to fulfil the purposes outlined in this policy." },
      { heading: "Your Rights", body: "You have the right to:\n\n• Access, correct, or delete your personal data.\n• Withdraw consent for marketing communications at any time.\n• Request a copy of the data we hold about you.\n\nTo exercise any of these rights, please contact us at commissions@manidoro.it." },
      { heading: "Cookies", body: "Our website uses essential cookies to ensure functionality. We may also use analytics cookies to understand how visitors use our site. You can manage cookie preferences through your browser settings." },
    ]}
  />
);

// ═══════════════════════════════════════════════════════════════════════════
// TERMS OF SERVICE PAGE
// ═══════════════════════════════════════════════════════════════════════════
export const TermsPage = (): JSX.Element => (
  <PolicyLayout
    title="Terms of Service"
    subtitle="Legal"
    lastUpdated="January 2024"
    sections={[
      { heading: "Agreement", body: "By accessing and using the Mani D'Oro website, you agree to be bound by these terms of service. If you do not agree with any part of these terms, please do not use our website or services." },
      { heading: "Products & Pricing", body: "All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless otherwise stated. Prices are subject to change without prior notice. We reserve the right to correct any pricing errors.\n\nProduct images are representative; due to the handcrafted nature of our pieces, slight variations in colour, texture, and dimensions are inherent and are not considered defects." },
      { heading: "Orders & Payment", body: "An order is confirmed only when full payment is received and you receive a confirmation email from our team. We reserve the right to decline any order at our discretion.\n\nFor bespoke commissions, a 50% deposit is required to begin work, with the balance due before dispatch." },
      { heading: "Intellectual Property", body: "All content on this website — including designs, photographs, text, logos, and graphics — is the exclusive property of Mani D'Oro and is protected by copyright and intellectual property laws. Reproduction, distribution, or use of any content without prior written consent is strictly prohibited." },
      { heading: "Limitation of Liability", body: "Mani D'Oro shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products, except as required by applicable law.\n\nOur total liability shall not exceed the purchase price of the product in question." },
      { heading: "Governing Law", body: "These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Rajasthan." },
      { heading: "Contact", body: "For questions regarding these terms, please contact us at commissions@manidoro.it or through our Contact page." },
    ]}
  />
);
