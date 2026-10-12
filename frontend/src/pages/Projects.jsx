import PageMeta from "@/components/common/PageMeta";
import PageHero from "@/components/common/PageHero";
import { FadePage } from "@/components/common/Reveal";
import ProjectFilterGrid from "@/components/project/ProjectFilterGrid";
import CtaBand from "@/components/home/CtaBand";

export default function Projects() {
  return (
    <FadePage>
      <PageMeta
        title="All Projects"
        description="Explore residential plots, premium villa plots, independent villas, plotted communities and apartment opportunities across Hyderabad — presented transparently by SV Developers."
      />
      <PageHero
        eyebrow="Project Portfolio"
        title="Explore Opportunities for Your Next Chapter."
        description="From land for your future home to independent villas and contemporary residences, discover property opportunities designed around different needs and aspirations."
        testid="projects-page-hero"
      />
      <section className="bg-ice py-16 lg:py-24">
        <div className="container-x">
          <ProjectFilterGrid />
        </div>
      </section>
      <CtaBand />
    </FadePage>
  );
}
