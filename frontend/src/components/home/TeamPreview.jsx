import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import TeamCard from "@/components/TeamCard";
import { TEAM } from "@/data/team";

export default function TeamPreview() {
  return (
    <section data-testid="team-preview-section" className="bg-ivory py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our Core Team"
            title="Experienced People. One Shared Vision."
            description="Our six-member core team brings together 55 years of combined real estate experience and a shared commitment to identifying promising opportunities, building trusted relationships and putting buyers first."
          />
          <Reveal delay={0.15}>
            <Link to="/team" data-testid="team-preview-all-link" className="btn-outline-navy shrink-0">
              Meet the Full Team <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.06} className="h-full">
              <TeamCard member={member} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
