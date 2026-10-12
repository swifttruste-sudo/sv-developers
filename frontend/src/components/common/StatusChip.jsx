const TONES = {
  gold: "border-gold/60 bg-gold/10 text-[#9a6c00]",
  navy: "border-navy/25 bg-ice text-navy",
  outline: "border-charcoal/25 bg-white/80 text-charcoal",
  light: "border-white/40 bg-white/10 text-white backdrop-blur",
};

export default function StatusChip({ label, tone = "gold", className = "" }) {
  return (
    <span
      data-testid="project-status-chip"
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] ${TONES[tone] || TONES.gold} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      {label}
    </span>
  );
}
