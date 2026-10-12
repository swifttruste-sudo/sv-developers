import { Building2, FileSearch, HeartHandshake, MapPinned, MessagesSquare, Users } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { WHY_CARDS } from "@/data/home";

const ICONS = {
  users: Users,
  map: MapPinned,
  file: FileSearch,
  building: Building2,
  message: MessagesSquare,
  handshake: HeartHandshake,
};

export default function WhySv({ detailed = false }) {
  return (
    <section data-testid="why-sv-section" className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why SV Developers"
          title="Real Estate. Guided by Experience. Driven by Trust."
          description="Six commitments that shape how we identify opportunities, present projects and stand beside every buyer."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon];
            return (
              <Reveal key={card.title} delay={i * 0.07} className="h-full">
                <article className="group flex h-full flex-col rounded-xl border border-navy/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-card">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-ice text-navy transition-colors duration-300 group-hover:bg-gold group-hover:text-midnight">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-bold text-navy">{card.title}</h3>
                  <p className={`mt-3 text-sm leading-7 text-steel ${detailed ? "sm:text-[15px]" : ""}`}>
                    {card.text}
                  </p>
                  <span className="mt-auto pt-6">
                    <span className="block h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-full" />
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
