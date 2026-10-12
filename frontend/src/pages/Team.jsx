import PageMeta from "@/components/common/PageMeta";
import PageHero from "@/components/common/PageHero";
import { FadePage, Reveal } from "@/components/common/Reveal";
import TeamCard from "@/components/TeamCard";
import CtaBand from "@/components/home/CtaBand";
import { TEAM } from "@/data/team";

export default function Team() {
  return (
    <FadePage>
      <PageMeta
        title="Our Core Team"
        description="Six members, 55 years of combined real estate experience — meet the core team behind SV Developers, Hyderabad."
      />
      <PageHero
        eyebrow="Our Core Team"
        title="Experienced People. One Shared Vision."
        description="Our six-member core team brings together 55 years of combined real estate experience and a shared commitment to identifying promising opportunities, building trusted relationships and putting buyers first."
        testid="team-page-hero"
      />

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="team-grid">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.06} className="h-full">
                <TeamCard member={member} index={i} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-10 text-center text-[13px] italic text-steel">
              Official team photographs will be added here as they become available — our monogram
              placeholders keep the focus on real experience, not stock faces.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </FadePage>
  );
}
