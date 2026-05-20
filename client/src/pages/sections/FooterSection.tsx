const footerGroups = [
  {
    title: "Discovery",
    links: [
      { label: "Brand Story", href: "/story" },
      { label: "Our Process", href: "/story" },
      { label: "Journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "https://instagram.com/manidoro" },
      { label: "Pinterest", href: "https://pinterest.com/manidoro" },
    ],
  },
];

export const FooterSection = (): JSX.Element => {
  return (
    <footer id="contact" className="w-full" style={{ background: "#1a1c12" }}>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 pt-12 md:pt-16 pb-0">

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-10 md:pb-14"
          style={{ borderBottom: "1px solid rgba(254,249,233,0.07)" }}
        >
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <a
              href="/"
              style={{
                display: "block", width: "fit-content", textDecoration: "none",
                transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              <img
                src="/logo.png"
                alt="Mani D'Oro Medallion"
                style={{
                  width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover",
                  border: "1.5px solid rgba(168, 132, 44, 0.45)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                }}
              />
            </a>
            <span style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "18px", fontWeight: 400, letterSpacing: "0.01em", color: "#fef9e9" }}>
              Mani D&apos;Oro
            </span>
            <p style={{
              fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase", lineHeight: 1.8,
              color: "rgba(254,249,233,0.35)", maxWidth: "220px",
            }}>
              An atelier dedicated to the preservation of artisanal excellence.
            </p>
          </div>

          {/* Nav columns */}
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-5">
              <h3 style={{
                fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(254,249,233,0.9)", marginBottom: "4px",
              }}>{group.title}</h3>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{
                        fontFamily: "'Manrope', sans-serif", fontSize: "12px", fontWeight: 400,
                        letterSpacing: "0.05em", color: "rgba(254,249,233,0.45)",
                        textDecoration: "none", transition: "color 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "rgba(254,249,233,0.85)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(254,249,233,0.45)")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar — stacks on mobile, row on sm+ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6">
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(254,249,233,0.22)",
            }}
          >
            © 2024 Mani D&apos;Oro. Website by hqblocks.in
          </p>
          <div className="flex items-center gap-5 sm:gap-6">
            {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                data-testid={`link-footer-${label.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "10px",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(254,249,233,0.22)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(254,249,233,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(254,249,233,0.22)")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
