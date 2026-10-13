import { motion } from "framer-motion";
import { TRUST_ITEMS } from "@/data/home";
import { Reveal } from "@/components/common/Reveal";

function Letters({ text, offset }) {
  return (
    <span aria-label={text} className="font-display text-xl font-bold tracking-[0.06em] text-navy sm:text-2xl">
      {text.split("").map((ch, j) => (
        <motion.span
          key={j}
          aria-hidden
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: offset + j * 0.035, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function TrustStrip() {
  return (
    <section data-testid="trust-strip" className="bg-gradient-to-b from-white via-white to-ice/70 border-b border-navy/10">
      <div className="container-x">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item, i) => (
            <Reveal
              key={item.value}
              delay={i * 0.08}
              className={`flex flex-col items-center gap-2 px-4 py-10 text-center lg:py-12 ${
                i > 0 ? "border-l border-gold/25" : ""
              } ${i >= 2 ? "max-lg:border-t max-lg:border-gold/25" : ""} ${
                i === 2 ? "max-lg:border-l-0" : ""
              }`}
            >
              <Letters text={item.value} offset={i * 0.12} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-steel">
                {item.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
