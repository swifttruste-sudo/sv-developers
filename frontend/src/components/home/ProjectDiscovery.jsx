import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, PROJECT_TYPES, UPCOMING_LOCATIONS } from "@/data/projects";

export default function ProjectDiscovery() {
  const [filter, setFilter] = useState("all");
  const visible = PROJECTS.filter((p) => filter === "all" || p.type === filter);

  return (
    <section data-testid="project-discovery-section" className="bg-ice py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Project Discovery"
          title="Explore Opportunities for Your Next Chapter."
          description="From land for your future home to independent villas and contemporary residences, discover property opportunities designed around different needs and aspirations."
        />

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Filter projects by type"
            data-testid="project-filter-bar"
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {PROJECT_TYPES.map((t) => {
              const active = filter === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  data-testid={`project-filter-${t.id}`}
                  onClick={() => setFilter(t.id)}
                  className={`rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                    active
                      ? "border-navy bg-navy text-white shadow-card"
                      : "border-navy/20 bg-white text-steel hover:border-gold hover:text-navy"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3" data-testid="project-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <Link
            to="/projects"
            data-testid="project-discovery-all-link"
            className="group mt-12 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-navy transition-colors hover:text-gold"
          >
            View All Projects
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
          <p className="mt-6 max-w-2xl text-[13px] leading-6 text-steel">
            Further verified opportunities in {UPCOMING_LOCATIONS.join(" and ")} are
            being added to our portfolio —{" "}
            <Link to="/contact" className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold">
              register your interest
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
