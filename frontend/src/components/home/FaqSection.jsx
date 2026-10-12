import SectionHeading from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQS } from "@/data/faqs";

export default function FaqSection() {
  return (
    <section data-testid="faq-section" className="bg-gradient-to-b from-ice/50 via-white to-white py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Common Questions"
            title="Everything You'd Want to Ask."
            description="Straight answers about who we are, what we offer and how we work. For anything specific, our team is one call away."
          />
          <Reveal delay={0.15}>
            <div className="navy-panel mt-10 rounded-xl p-8">
              <p className="font-display text-lg font-bold text-white">
                Still have a question?
              </p>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Talk to our team — we'll give you a straight answer, not a sales pitch.
              </p>
              <a
                href="tel:+919347530281"
                data-testid="faq-call-link"
                className="mt-5 inline-flex text-[12px] font-bold uppercase tracking-[0.16em] text-gold transition-colors hover:text-white"
              >
                +91 93475 30281
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <FaqAccordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
