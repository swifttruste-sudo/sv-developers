import { motion } from "framer-motion";
import { Reveal } from "@/components/common/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col ${alignCls} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <span className="mt-4 block max-w-3xl overflow-hidden pb-1">
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="block"
        >
          <motion.h2
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: 0,
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className={`font-display text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.6rem] ${
              dark ? "text-white" : "text-navy"
            }`}
            style={{ textWrap: "balance" }}
          >
            {title}
          </motion.h2>
        </motion.span>
      </span>
      {description && (
        <Reveal delay={0.12}>
          <p className={`mt-5 max-w-2xl text-[15px] leading-7 sm:text-base ${dark ? "text-white/70" : "text-steel"}`}>
            {description}
          </p>
        </Reveal>
      )}
    </Reveal>
  );
}
