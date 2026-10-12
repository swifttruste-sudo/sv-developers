import { motion } from "framer-motion";

export default function ImageReveal({ src, alt, className = "", delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`overflow-hidden ${className}`}
      data-testid="image-reveal"
    >
      <motion.div
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0)" },
          visible: { clipPath: "inset(0 0 0% 0)" },
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          variants={{
            hidden: { scale: 1.18 },
            visible: { scale: 1 },
          }}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
