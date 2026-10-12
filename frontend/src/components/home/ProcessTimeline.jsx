import { motion } from "framer-motion";
import { Reveal } from "@/components/common/Reveal";
import { PROCESS_STEPS } from "@/data/home";

export default function ProcessTimeline() {
  return (
    <section data-testid="process-section" className="navy-panel relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="container-x relative">
        <div className="flex flex-col items-start gap-4">
          <p className="eyebrow !text-gold">Our Process</p>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-[2.6rem]">
            A Clearer Path to Your Next Property.
          </h2>
        </div>

        <div className="relative mt-16">
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-7 hidden h-px w-full origin-left bg-gradient-to-r from-gold via-gold/50 to-white/10 lg:block"
          />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.12} className="relative">
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <span className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-midnight font-display text-base font-bold text-gold">
                    {step.number}
                  </span>
                  <div className="lg:mt-2">
                    <h3 className="font-display text-[15px] font-bold text-white sm:text-base">{step.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-6 text-white/60">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
