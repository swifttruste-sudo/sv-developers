import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, PROJECT_TYPES, UPCOMING_LOCATIONS } from "@/data/projects";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const visible = PROJECTS.filter((p) => filter === "all" || p.type === filter);

  return (
    <>
      <SectionHeading
        eyebrow="All Projects"
        title="Every Opportunity, Presented Honestly."
        description="Every listing states its current status honestly — including what is verified, what is stated by the company, and what is still being reconfirmed."
      />

      <Reveal delay={0.1}>
        <div role="tablist" aria-label="Filter projects by type" data-testid="projects-filter-bar" className="mt-10 flex flex-wrap gap-2.5">
          {PROJECT_TYPES.map((t) => {
            const active = filter === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                data-testid={`projects-filter-${t.id}`}
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

      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3" data-testid="projects-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {filter !== "all" && visible.length === 0 && (
        <p className="mt-10 rounded-xl border border-dashed border-navy/25 bg-white p-8 text-center text-sm text-steel">
          No projects in this category right now — new opportunities are added as they are verified.
        </p>
      )}

      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-xl border border-gold/40 bg-gold-light/50 p-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-lg font-bold text-navy">
              More locations on the way — {UPCOMING_LOCATIONS.join(" and ")}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-steel">
              We are evaluating further verified opportunities and will list them
              here as details are confirmed. Register your interest to be among
              the first to know.
            </p>
          </div>
          <Link to="/contact" data-testid="projects-register-interest-btn" className="btn-navy shrink-0">
            Register Interest <ArrowRight size={15} />
          </Link>
        </div>
      </Reveal>
    </>
  );
}
