import { Link } from "react-router-dom";
import { animate, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

const ABOUT_IMG =
  "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjB2aWxsYSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlJTIwZHVza3xlbnwwfHx8fDE3OTE4MDYwNDh8MA&ixlib=rb-4.1.0&q=85&auto=format&fit=crop&w=1400";

function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} data-testid="stat-count-up">
      {val}
    </span>
  );
}

function TiltBadge({ children }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: 600 }} className="absolute -bottom-8 left-6 sm:left-10">
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        data-testid="stat-55-badge"
        className="navy-panel rounded-xl px-7 py-6 shadow-lift"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function BrandAbout() {
  return (
    <section data-testid="brand-about-section" className="bg-ivory py-20 lg:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="About the Brand"
            title="We See Potential in Places. We Believe in People."
          />
          <Reveal delay={0.1}>
            <div className="mt-7 space-y-5 text-[15px] leading-8 text-steel sm:text-base">
              <p>
                SV Developers is a real estate development, promotion, marketing
                and sales company focused on residential property opportunities
                across Hyderabad and its surrounding regions.
              </p>
              <p>
                Our core team brings together 55 years of combined real estate
                industry experience. We focus on promising locations, project
                fundamentals, responsible promotion and transparent communication.
              </p>
              <p>
                From residential plots and independent villas to residential
                developments, our goal is to help buyers explore suitable
                property opportunities with greater clarity and confidence.
              </p>
              <p className="border-l-2 border-gold pl-5 font-medium text-navy">
                We believe a great property decision begins with the right
                information—not pressure.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/about" data-testid="brand-about-cta" className="btn-navy mt-9">
              Discover Our Story <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-xl border-2 border-gold/40" />
          <img
            src={ABOUT_IMG}
            alt="Contemporary residential architecture — representative image"
            loading="lazy"
            className="relative aspect-[4/3.4] w-full rounded-xl object-cover shadow-lift"
          />
          <TiltBadge>
            <p className="text-gold-gradient font-display text-3xl font-bold">
              <CountUp to={55} />
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
              Years Combined
              <br />
              Core-Team Experience
            </p>
          </TiltBadge>
        </Reveal>
      </div>
    </section>
  );
}
