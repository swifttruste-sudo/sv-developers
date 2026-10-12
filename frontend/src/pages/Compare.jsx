import { useSearchParams, Link } from "react-router-dom";
import { GitCompare, Plus } from "lucide-react";
import PageMeta from "@/components/common/PageMeta";
import PageHero from "@/components/common/PageHero";
import { FadePage, Reveal } from "@/components/common/Reveal";
import CompareTable from "@/components/compare/CompareTable";
import CompareInsights from "@/components/compare/CompareInsights";
import CtaBand from "@/components/home/CtaBand";
import { PROJECTS, getProject } from "@/data/projects";

export default function Compare() {
  const [params] = useSearchParams();
  const raw = (params.get("ids") || "").split(",").filter(Boolean);
  const projects = raw.map(getProject).filter(Boolean).slice(0, 3);

  return (
    <FadePage>
      <PageMeta
        title="Compare Projects"
        description="Compare SV Developers projects side by side — with honest information-clarity ratings and a suggestion you can test yourself."
      />
      <PageHero
        eyebrow="Compare"
        title="Compare Projects Side by Side."
        description="A like-for-like view of every listing — including honest ratings of how clearly each one is documented today, and a suggestion you can test yourself."
        testid="compare-page-hero"
      />

      <section className="bg-gradient-to-b from-white to-ice py-16 lg:py-24">
        <div className="container-x">
          {projects.length === 0 ? (
            <Reveal>
              <div data-testid="compare-empty" className="rounded-xl border border-dashed border-navy/25 bg-white p-8 text-center sm:p-12">
                <GitCompare size={40} className="mx-auto text-gold" />
                <h2 className="mt-4 font-display text-2xl font-bold text-navy">Nothing to compare yet.</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-steel">
                  Pick up to three projects below — or tap “Compare” on any
                  project card — and we will line them up honestly, side by side.
                </p>
                <div className="mt-8 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
                  {PROJECTS.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/compare?ids=${p.slug}`}
                      data-testid={`compare-quick-add-${p.slug}`}
                      className="group flex items-center justify-between rounded-lg border border-navy/10 bg-white px-4 py-3 transition-all duration-300 hover:border-gold hover:shadow-card"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-navy">{p.name}</span>
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-soft">{p.bestFor}</span>
                      </span>
                      <Plus size={16} className="shrink-0 text-gold transition-transform duration-300 group-hover:rotate-90" />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : (
            <>
              <Reveal>
                <CompareTable projects={projects} />
              </Reveal>
              <Reveal delay={0.1}>
                <CompareInsights projects={projects} />
              </Reveal>
            </>
          )}
        </div>
      </section>

      <CtaBand />
    </FadePage>
  );
}
