import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 320, damping: 30 });
  const ry = useSpring(y, { stiffness: 320, damping: 30 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target;
      setHovering(!!(t && t.closest && t.closest("a, button, input, textarea, select, [role=tab]")));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        style={{ x, y }}
        data-testid="cursor-dot"
        className="pointer-events-none fixed left-0 top-0 z-[80] -ml-1 -mt-1 h-2 w-2 rounded-full bg-gold"
      />
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ duration: 0.2 }}
        data-testid="cursor-ring"
        className="pointer-events-none fixed left-0 top-0 z-[80] -ml-4 -mt-4 h-8 w-8 rounded-full border border-gold"
      />
    </>
  );
}
