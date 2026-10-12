import { Building2, FileSearch, HeartHandshake, MapPinned, MessagesSquare, Users } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import CountUp from "@/components/common/CountUp";
import { handleSpotlight } from "@/components/common/spotlight";
import { WHY_CARDS } from "@/data/home";

const ICONS = {
  users: Users,
  map: MapPinned,
  file: FileSearch,
  building: Building2,
  message: MessagesSquare,
  handshake: HeartHandshake,
};

const SPANS = ["lg:col-span-2 lg:row-span-2", "lg:col-span-2", "", "", "lg:col-span-2", "lg:col-span-2"];

export default function WhySv({ detailed = false }) {
  return (
    <section data-testid="why-sv-section" className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why SV Developers"
          title="Real Estate. Guided by Experience. Driven by Trust."
          description="Six commitments that shape how we identify opportunities, present projects and stand beside every buyer."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4">
          {WHY_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon];
            const hero = i === 0;
            return (
              <Reveal key={card.title} delay={i * 0.07} className={`${SPANS[i]} h-full`}>
                <article
                  onMouseMove={handleSpotlight}
                  data-testid={`why-card-${i + 1}`}
                  className={`spotlight-card group flex h-full flex-col rounded-xl border border-navy/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-card ${
                    hero ? "navy-panel !border-0" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-300 ${
                        hero ? "bg-white/10 text-gold" : "bg-ice text-navy group-hover:bg-gold group-hover:text-midnight"
                      }`}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <span className={`font-display text-sm font-bold tracking-[0.2em] ${hero ? "text-gold/70" : "text-navy/20"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {hero && (
                    <p className="text-gold-gradient mt-10 font-display text-6xl font-bold lg:text-7xl" data-testid="why-hero-stat">
                      <CountUp to={55} />
                    </p>
                  )}

                  <h3
                    className={`mt-auto pt-8 font-display font-bold ${hero ? "text-2xl text-white lg:text-[1.7rem]" : "text-lg text-navy"}`}
                  >
                    {card.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-7 ${hero ? "text-white/70" : "text-steel"} ${detailed ? "sm:text-[15px]" : ""}`}>
                    {card.text}
                  </p>
                  {!hero && (
                    <span className="mt-auto pt-6">
                      <span className="block h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-full" />
                    </span>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
