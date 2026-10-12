import { initials } from "@/data/team";

export default function TeamCard({ member, index = 0 }) {
  return (
    <article
      data-testid={`team-card-${member.name.toLowerCase().replace(/\s+/g, "-")}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-navy/10 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-card"
    >
      <div className="navy-panel relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full">
        <span className="font-display text-2xl font-bold tracking-wide text-gold">
          {initials(member.name)}
        </span>
        <span className="absolute inset-x-0 bottom-0 flex justify-center gap-1 pb-2 opacity-40">
          <span className="h-2 w-1 bg-white/70" />
          <span className="h-3 w-1 bg-white/70" />
          <span className="h-4 w-1 bg-gold" />
        </span>
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-navy">{member.name}</h3>
      <p className="mt-1 text-[13px] font-semibold text-gold-soft">{member.role}</p>
      <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.14em] text-steel">
        {member.years} Years of Experience
      </p>
      <span className="gold-rule absolute inset-x-0 bottom-0 mx-auto !w-0 transition-all duration-500 group-hover:!w-24" />
      <span className="sr-only">Team member {index + 1}</span>
    </article>
  );
}
