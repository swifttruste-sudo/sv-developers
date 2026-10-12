import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE } from "@/data/site";

const HERO_IMG =
  "https://images.unsplash.com/photo-1640877268187-2fa6b2ed7a5f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwyfHxhZXJpYWwlMjB2aWV3JTIwbHV4dXJ5JTIwcmVzaWRlbnRpYWwlMjBjb21tdW5pdHklMjB2aWxsYXMlMjBncmVlbmVyeXxlbnwwfHx8fDE3OTE4MDYwNDh8MA&ixlib=rb-4.1.0&q=85&auto=format&fit=crop&w=1920";

const rise = (delay) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section data-testid="hero-section" className="relative flex min-h-[92vh] items-center overflow-hidden bg-midnight">
      <motion.img
        src={HERO_IMG}
        alt="Aerial view of a landscaped residential community — representative image"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-navy/75 to-navy/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-midnight/40" />

      <div className="container-x relative z-10 pb-24 pt-36 sm:pt-40">
        <div className="max-w-3xl">
          <motion.p {...rise(0.15)} className="eyebrow !text-gold">
            Real Estate Development | Hyderabad, India
          </motion.p>

          <motion.h1
            {...rise(0.3)}
            className="mt-6 font-display text-[2.6rem] font-bold leading-[1.08] text-white sm:text-6xl lg:text-[4.2rem]"
          >
            The Right Property.
            <br />
            A Future Built With{" "}
            <span className="relative inline-block text-gold">
              Confidence.
              <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-gold/50" />
            </span>
          </motion.h1>

          <motion.p {...rise(0.45)} className="mt-7 max-w-xl text-[15px] leading-8 text-white/75 sm:text-base">
            Discover residential plots, premium villas and thoughtfully selected
            property opportunities around Hyderabad. With 55 years of combined
            core-team experience, SV Developers brings a buyer-first approach to
            real estate.
          </motion.p>

          <motion.div {...rise(0.6)} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/projects" data-testid="hero-explore-projects-btn" className="btn-gold">
              Explore Our Projects <ArrowRight size={16} />
            </Link>
            <Link to="/contact" data-testid="hero-talk-to-team-btn" className="btn-ghost-light">
              Talk to Our Team
            </Link>
          </motion.div>

          <motion.div {...rise(0.75)} className="mt-14 flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold sm:text-xs">
              55 Years of Combined Core-Team Experience
            </p>
          </motion.div>
        </div>
      </div>

      <motion.a
        href={SITE.phoneHref}
        data-testid="hero-phone-fab"
        aria-label={`Call ${SITE.phoneDisplay}`}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 right-6 z-10 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur transition-all duration-300 hover:border-gold hover:text-gold lg:right-10"
      >
        <Phone size={15} className="text-gold" />
        <span className="hidden sm:inline">{SITE.phoneDisplay}</span>
        <span className="sm:hidden">Call</span>
      </motion.a>
    </section>
  );
}
