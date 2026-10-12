const ITEMS = [
  "Residential Plots",
  "Premium Villas",
  "Plotted Communities",
  "Buyer-First Philosophy",
  "55 Years Combined Experience",
  "Building Your Future",
  "Hyderabad",
];

function Mark() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0" aria-hidden>
      <rect x="1" y="11" width="3" height="8" fill="#F5AA00" />
      <rect x="6" y="7" width="3" height="12" fill="#F5AA00" />
      <rect x="11" y="3" width="3" height="16" fill="#F5AA00" />
      <rect x="16" y="0" width="3" height="19" fill="#F5AA00" opacity="0.45" />
    </svg>
  );
}

export default function Marquee() {
  return (
    <section data-testid="brand-marquee" aria-label="SV Developers highlights" className="relative overflow-hidden border-y border-gold/25 bg-midnight py-5">
      <div className="marquee-track items-center gap-10">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-10 pr-10">
            {ITEMS.map((item, i) => (
              <span key={i} className="flex items-center gap-10">
                <span className="whitespace-nowrap font-display text-[13px] font-semibold uppercase tracking-[0.32em] text-white/75">
                  {item}
                </span>
                <Mark />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-midnight to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-midnight to-transparent" />
    </section>
  );
}
