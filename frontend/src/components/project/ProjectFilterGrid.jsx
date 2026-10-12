import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, Info } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import LocationFilter from "@/components/common/LocationFilter";
import BudgetFilter from "@/components/common/BudgetFilter";
import { Reveal } from "@/components/common/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, PROJECT_TYPES, UPCOMING_LOCATIONS } from "@/data/projects";
import { Link } from "react-router-dom";
import { ArrowRight, GitCompare } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [loc, setLoc] = useState("all");
  const [budget, setBudget] = useState("all");
  const [query, setQuery] = useState("");

  const visible = PROJECTS.filter(
    (p) =>
      (filter === "all" || p.type === filter) &&
      (loc === "all" || p.locationArea === loc) &&
      (budget === "all" || p.budgets.includes(budget)) &&
      (!query.trim() ||
        `${p.name} ${p.location} ${p.typeLabel} ${p.shortDescription}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()))
  );

  return (
    <>
      <SectionHeading
        eyebrow="All Projects"
        title="Every Opportunity, Presented Honestly."
        description="Filter by type, location and budget — or search — and compare up to three projects side by side. Every listing states its current status honestly."
      />

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-testid="projects-search-input"
              placeholder="Search by name, location or type…"
              aria-label="Search projects"
              className="field-input !pl-11"
            />
          </div>
          <LocationFilter value={loc} onChange={setLoc} testid="projects-location-filter" />
          <BudgetFilter value={budget} onChange={setBudget} testid="projects-budget-filter" />
        </div>
        <p className="mt-3 flex items-start gap-2 text-[12px] leading-5 text-steel" data-testid="budget-note">
          <Info size={14} className="mt-0.5 shrink-0 text-gold" />
          Budget bands are indicative, to help you shortlist. Exact pricing is
          shared on request — and reconfirmed in writing.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div role="tablist" aria-label="Filter projects by type" data-testid="projects-filter-bar" className="mt-4 flex flex-wrap gap-2.5">
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

      <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-steel" data-testid="projects-results-count">
        Showing {visible.length} of {PROJECTS.length} projects
      </p>

      <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3" data-testid="projects-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 && (
        <p className="mt-10 rounded-xl border border-dashed border-navy/25 bg-white p-8 text-center text-sm text-steel" data-testid="projects-empty-state">
          No projects match those filters yet — try a different location, budget
          or clear the search. New opportunities are added as they are verified.
        </p>
      )}

      <Reveal delay={0.1}>
        <Link
          to="/compare"
          data-testid="projects-compare-link"
          className="mt-10 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-navy transition-colors hover:text-gold"
        >
          <GitCompare size={15} className="text-gold" />
          Can't decide? Compare projects side by side
          <ArrowRight size={14} />
        </Link>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-xl border border-gold/40 bg-gold-light/50 p-8 sm:flex-row sm:items-center">
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
