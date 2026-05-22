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
    title="Shipping & Delivery"
    subtitle="Client Care"
    lastUpdated="May 2024"
    sections={[
      { heading: "Order Processing", body: "Every Mani D'Oro piece is thoughtfully prepared. In-stock items are processed within 1-3 business days. Made-to-order and bespoke pieces may require 4-6 weeks for production.\n\nOnce your order is dispatched, you will receive an email with your tracking information." },
      { heading: "Domestic Shipping", body: "We offer secure, fully-insured delivery across India.\n• Standard Shipping: 3–5 business days (Complimentary)\n• Express Shipping: 1–2 business days (Calculated at checkout)\n\nAll deliveries require a signature upon receipt to ensure your jewellery reaches you safely." },
      { heading: "International Shipping", body: "We ship worldwide using premium courier partners.\n• Europe & UK: 5–7 business days\n• North America: 5–8 business days\n• Rest of World: 7–10 business days\n\nPlease note: International orders may be subject to customs duties and import taxes upon arrival. These charges are the responsibility of the customer." },
      { heading: "Packaging", body: "Your order will arrive in our signature unbranded outer box for security during transit. Inside, your jewellery will be beautifully presented in Mani D'Oro's elegant packaging, complete with a certificate of authenticity." },
      { heading: "Questions?", body: "If you have any questions regarding your shipment, or need to request a specific delivery date, please contact our client care team via the Contact page or email care@manidoro.com." },
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
    lastUpdated="May 2024"
    sections={[
      { heading: "Our Guarantee", body: "We stand behind the quality of our demi-fine jewellery. If you are not completely satisfied with your purchase, we are here to help make it right." },
      { heading: "Return Policy", body: "You may return unworn, undamaged items in their original packaging within 14 days of delivery for a full refund or exchange.\n\nPlease note: Custom-made, engraved, or bespoke pieces are final sale and cannot be returned or exchanged unless there is a manufacturing defect." },
      { heading: "How to Return", body: "1. Email care@manidoro.com with your order number to request a return.\n2. We will provide a secure return shipping label.\n3. Pack the jewellery securely in its original packaging.\n4. Hand it over to our courier partner.\n\nOnce we receive and inspect the item, your refund will be processed to your original payment method within 5-7 business days." },
      { heading: "Repairs & Warranty", body: "All Mani D'Oro pieces come with a 1-year warranty covering manufacturing defects. If your piece requires repair outside of warranty (e.g., accidental damage or normal wear and tear), we offer repair services at a reasonable cost. Please contact us to arrange an assessment." },
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
    lastUpdated="May 2024"
    sections={[
      { heading: "Simple Summary", body: "We respect your privacy. The information we collect is only used to process your orders, provide customer support, and, if you agree, share updates about our brand. We will never sell your personal data." },
      { heading: "Information We Collect", body: "When you purchase from us or create an account, we collect:\n• Your name, email, shipping and billing address, and phone number.\n• Secure payment information (processed via our encrypted payment partners).\n• Website browsing data (such as IP address and cookie data) to help improve our site." },
      { heading: "How Your Data is Used", body: "We use your details to:\n• Successfully deliver your jewellery and send tracking updates.\n• Respond to your questions or client care requests.\n• Send you marketing emails only if you have explicitly opted in.\n• Prevent fraud and ensure website security." },
      { heading: "Data Protection", body: "Your information is securely stored. We use industry-standard encryption (SSL) for all sensitive data transfers. We only share essential data with trusted third parties (like shipping companies and payment gateways) strictly for the purpose of fulfilling your order." },
      { heading: "Your Rights", body: "You have the right to request access to the personal data we hold about you. You can also ask us to correct or delete your data at any time. Simply email care@manidoro.com." },
      { heading: "Cookies", body: "Our website uses cookies to remember your cart, keep you logged in, and understand how you interact with our site so we can improve it. You can disable cookies in your browser settings, though some site features may not function properly." },
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
    lastUpdated="May 2024"
    sections={[
      { heading: "Overview", body: "Welcome to Mani D'Oro. By accessing our website or purchasing something from us, you engage in our \"Service\" and agree to be bound by the following simple and legally binding terms and conditions." },
      { heading: "Copyright & Intellectual Property", body: "All content on this website is the exclusive property of Mani D'Oro. This includes, but is not limited to: jewellery designs, product photography, logos, branding, text, website layout, and graphics.\n\nAll content is protected by international copyright laws. You may not reproduce, duplicate, copy, sell, or exploit any portion of the Service, designs, or website content without express written permission from us." },
      { heading: "Trademarks", body: "The 'Mani D'Oro' name, our logos, and any related brand marks or slogans are registered trademarks. They may not be used in connection with any product or service without our prior written consent, nor may they be used in any manner that is likely to cause confusion among customers." },
      { heading: "Products & Pricing", body: "We make every effort to display the colors and images of our products as accurately as possible. Because our items are crafted and finished by hand, slight variations are normal.\n\nPrices for our products are subject to change without notice. We reserve the right to modify or discontinue any product at any time." },
      { heading: "Accuracy of Information", body: "We are not responsible if information made available on this site is not fully accurate, complete, or current. The material on this site is provided for general information only." },
      { heading: "Limitation of Liability", body: "In no case shall Mani D'Oro, our directors, or employees be liable for any injury, loss, claim, or any direct, indirect, incidental, or consequential damages arising from your use of any of our services or products procured using the service, except as required by law." },
      { heading: "Governing Law", body: "These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes will be resolved in the appropriate courts." },
      { heading: "Contact", body: "If you have any questions regarding these Terms of Service, Copyright, or Trademarks, please contact our legal team at care@manidoro.com." },
    ]}
  />
);
