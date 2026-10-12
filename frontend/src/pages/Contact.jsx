import PageMeta from "@/components/common/PageMeta";
import PageHero from "@/components/common/PageHero";
import { FadePage, Reveal } from "@/components/common/Reveal";
import ContactForm from "@/components/ContactForm";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { SITE, waLink } from "@/data/site";

export default function Contact() {
  return (
    <FadePage>
      <PageMeta
        title="Contact Us"
        description="Talk to SV Developers — call +91 93475 30281, message us on WhatsApp or send an enquiry to book a site visit in Hyderabad."
      />
      <PageHero
        eyebrow="Contact Us"
        title="Let's Talk About Your Next Chapter."
        description="Share what you're looking for — we'll respond with clear, current information and, when you're ready, arrange a site visit."
        testid="contact-page-hero"
      />

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5">
              <a
                href={SITE.phoneHref}
                data-testid="contact-info-phone-card"
                className="group flex items-start gap-4 rounded-xl border border-navy/10 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-card"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ice text-navy transition-colors group-hover:bg-gold group-hover:text-midnight">
                  <Phone size={19} />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-steel">Call Us</span>
                  <span className="mt-1 block font-display text-lg font-bold text-navy">{SITE.phoneDisplay}</span>
                </span>
              </a>

              <a
                href={waLink("Hi SV Developers, I'd like to make an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-info-whatsapp-card"
                className="group flex items-start gap-4 rounded-xl border border-navy/10 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-card"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ice text-navy transition-colors group-hover:bg-gold group-hover:text-midnight">
                  <MessageCircle size={19} />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-steel">WhatsApp</span>
                  <span className="mt-1 block font-display text-lg font-bold text-navy">Chat with our team</span>
                </span>
              </a>

              <div
                data-testid="contact-info-location-card"
                className="flex items-start gap-4 rounded-xl border border-navy/10 bg-white p-6"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ice text-navy">
                  <MapPin size={19} />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-steel">Core Market</span>
                  <span className="mt-1 block font-display text-lg font-bold text-navy">{SITE.location}</span>
                </span>
              </div>

              <div className="navy-panel rounded-xl p-7">
                <h3 className="font-display text-lg font-bold text-white">What happens next?</h3>
                <ol className="mt-4 space-y-3.5 text-sm leading-6 text-white/70">
                  <li className="flex gap-3">
                    <span className="font-display font-bold text-gold">01</span> We review your requirement and respond personally.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-display font-bold text-gold">02</span> We shortlist projects that genuinely fit — with current status and documentation.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-display font-bold text-gold">03</span> When you're ready, we arrange a site visit at a convenient time.
                  </li>
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </FadePage>
  );
}
