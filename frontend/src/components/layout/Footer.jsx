import { Link } from "react-router-dom";
import { Phone, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { NAV_LINKS, SITE, waLink } from "@/data/site";
import { PROJECTS } from "@/data/projects";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[linear-gradient(180deg,#0a2a50_0%,#07182f_55%)] text-white" data-testid="site-footer">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <Logo dark imgClassName="h-12 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
            A real estate development, promotion, marketing and sales company
            focused on residential property opportunities across Hyderabad and
            its surrounding regions — guided by a buyer-first philosophy.
          </p>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            {SITE.tagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Company</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.concat([
              { label: "Buyer-First Approach", to: "/buyer-first" },
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Disclaimer", to: "/disclaimer" },
            ]).map((item) => (
              <li key={item.to + item.label}>
                <Link
                  to={item.to}
                  className="link-sweep text-sm text-white/70 transition-colors hover:text-gold"
                  data-testid={`footer-link-${item.to === "/" ? "home" : item.to.slice(1)}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Projects</h3>
          <ul className="mt-5 space-y-3">
            {PROJECTS.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/projects/${p.slug}`}
                  className="link-sweep text-sm text-white/70 transition-colors hover:text-gold"
                  data-testid={`footer-project-link-${p.slug}`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/compare"
                className="link-sweep text-sm font-semibold text-gold transition-colors hover:text-white"
                data-testid="footer-compare-link"
              >
                Compare Projects
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Talk to Us</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={SITE.phoneHref} data-testid="footer-phone-link" className="link-sweep inline-flex items-center gap-3 text-white/80 transition-colors hover:text-gold">
                <Phone size={16} className="shrink-0 text-gold" /> {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={waLink("Hi SV Developers, I'd like to know more about your projects.")}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp-link"
                className="link-sweep inline-flex items-center gap-3 text-white/80 transition-colors hover:text-gold"
              >
                <MessageCircle size={16} className="shrink-0 text-gold" /> WhatsApp Enquiry
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/70">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> {SITE.location}
            </li>
          </ul>
          <Link to="/contact" data-testid="footer-contact-cta" className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-gold transition-colors hover:text-white">
            Book a Site Visit <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[12px] leading-6 text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} SV Developers. Building Your Future.</p>
          <p className="max-w-xl">{SITE.experienceNote}</p>
        </div>
      </div>
    </footer>
  );
}
