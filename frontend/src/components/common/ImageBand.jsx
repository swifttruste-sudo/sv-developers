import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/common/Reveal";

export default function ImageBand({ image, eyebrow, title, caption, testid }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} data-testid={testid || "image-band"} className="relative overflow-hidden py-24 lg:py-32">
      <motion.img
        src={image}
        alt="Representative architectural visual"
        loading="lazy"
        style={{ y }}
        className="absolute left-0 top-[-12%] h-[124%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-midnight/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/85 via-midnight/50 to-transparent" />
      <div className="container-x relative z-10">
        <Reveal>
          {eyebrow && <p className="eyebrow !text-gold">{eyebrow}</p>}
          {title && (
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-[1.15] text-white sm:text-4xl">
              {title}
            </h2>
          )}
          {caption && <p className="mt-5 max-w-xl text-[15px] leading-8 text-white/70">{caption}</p>}
        </Reveal>
      </div>
    </section>
  );
}
