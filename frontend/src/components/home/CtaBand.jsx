import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/common/Reveal";
import Magnetic from "@/components/common/Magnetic";
import { SITE, waLink } from "@/data/site";

export default function CtaBand() {
  return (
    <section data-testid="cta-band" className="navy-panel relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-gold/15 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-3 opacity-[0.07]"
      >
        <span className="h-16 w-10 bg-white" />
        <span className="h-24 w-10 bg-white" />
        <span className="h-32 w-10 bg-gold" />
        <span className="h-24 w-10 bg-white" />
        <span className="h-16 w-10 bg-white" />
      </div>
      <div className="container-x relative py-20 text-center lg:py-24">
        <Reveal>
          <p className="eyebrow justify-center !text-gold">Get Started</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold leading-[1.18] text-white sm:text-4xl">
            The Right Property. The Right Guidance. A Future Built With{" "}
            <span className="text-gold-gradient">Confidence.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/65">
            Tell us what you're looking for and we'll shortlist opportunities
            that fit — with clear information at every step.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <Link to="/contact" data-testid="cta-band-book-visit-btn" className="btn-gold">
                <CalendarCheck size={16} /> Book a Site Visit
              </Link>
            </Magnetic>
            <Magnetic>
              <a href={SITE.phoneHref} data-testid="cta-band-call-btn" className="btn-ghost-light">
                <Phone size={16} /> {SITE.phoneDisplay}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={waLink("Hi SV Developers, I'd like to get started. Can we talk?")}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-band-whatsapp-btn"
                className="btn-ghost-light"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
