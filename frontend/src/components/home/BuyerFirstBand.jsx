import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

const BAND_IMG =
  "https://images.unsplash.com/photo-1762811054947-605b20298615?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBsdXh1cnklMjB2aWxsYSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlJTIwZHVza3xlbnwwfHx8fDE3OTE4MDYwNDh8MA&ixlib=rb-4.1.0&q=85&auto=format&fit=crop&w=1800";

export default function BuyerFirstBand() {
  return (
    <section data-testid="buyer-first-band" className="relative overflow-hidden py-24 lg:py-32">
      <img
        src={BAND_IMG}
        alt="Illuminated residence at dusk — representative image"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-midnight/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/70 to-navy/50" />

      <div className="container-x relative z-10">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow !text-gold">Buyer-First Philosophy</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-[2.6rem]">
              Your Interests Come Before the Transaction.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-7 space-y-5 text-[15px] leading-8 text-white/75">
              <p>
                Property is a significant financial decision. Buyers deserve
                clear information, time to evaluate their options and an honest
                explanation of project details.
              </p>
              <p>
                At SV Developers, we emphasize transparency, responsible
                communication and informed decision-making. Our aim is to build
                trust that continues long after a property enquiry.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <blockquote className="mt-9 border-l-2 border-gold bg-white/5 px-6 py-5 backdrop-blur">
              <Quote size={18} className="text-gold" />
              <p className="mt-3 font-display text-lg font-semibold leading-8 text-white sm:text-xl">
                A Better-Informed Buyer Is the Foundation of a Better Real
                Estate Experience.
              </p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.3}>
            <Link to="/buyer-first" data-testid="buyer-first-band-cta" className="btn-ghost-light mt-9">
              Read Our Philosophy <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
