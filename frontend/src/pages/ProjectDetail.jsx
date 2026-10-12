import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  FileWarning,
  MapPin,
  MessageCircle,
  Phone,
  BadgeInfo,
} from "lucide-react";
import PageMeta from "@/components/common/PageMeta";
import StatusChip from "@/components/common/StatusChip";
import GalleryGrid from "@/components/common/GalleryGrid";
import { Reveal, FadePage } from "@/components/common/Reveal";
import ProjectCard from "@/components/ProjectCard";
import CtaBand from "@/components/home/CtaBand";
import { getProject, PROJECTS } from "@/data/projects";
import { SITE, waLink } from "@/data/site";
import NotFound from "@/pages/NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;

  const related = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <FadePage>
      <PageMeta
        title={project.name}
        description={`${project.name} — ${project.tagline} ${project.shortDescription}`}
      />

      <section data-testid="project-detail-hero" className="navy-panel relative overflow-hidden pb-14 pt-32 sm:pt-36 lg:pt-44">
        <div className="container-x relative">
          <Reveal>
            <Link
              to="/projects"
              data-testid="project-back-link"
              className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-gold"
            >
              <ArrowLeft size={14} /> All Projects
            </Link>
            <div className="mt-6">
              <StatusChip label={project.status.label} tone="light" />
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.2rem]">
              {project.name}
            </h1>
            <p className="mt-4 font-display text-lg font-semibold text-gold sm:text-xl">{project.tagline}</p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white/75">
              <MapPin size={16} className="text-gold" /> {project.location}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="container-x">
          <Reveal>
            <div className="overflow-hidden rounded-xl shadow-lift">
              <img
                src={project.image}
                alt={`${project.name} — representative image`}
                className="aspect-[16/10] w-full object-cover sm:aspect-[21/9]"
              />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-navy">Project Overview</h2>
                <div className="mt-5 space-y-5 text-[15px] leading-8 text-steel">
                  {project.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="mt-12 font-display text-2xl font-bold text-navy">Verified Highlights</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2" data-testid="project-highlights">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 rounded-lg border border-navy/10 bg-ice/60 px-4 py-3 text-sm font-medium text-charcoal"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-gold" strokeWidth={2.5} />
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="mt-12 font-display text-2xl font-bold text-navy">Specifications & Status</h2>
                <dl className="mt-6 overflow-hidden rounded-xl border border-navy/10" data-testid="project-specs">
                  {project.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
                        i % 2 === 0 ? "bg-white" : "bg-ivory"
                      } border-b border-navy/10 last:border-b-0`}
                    >
                      <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-steel">{spec.label}</dt>
                      <dd className="text-sm font-semibold text-navy sm:max-w-[60%] sm:text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="mt-12 font-display text-2xl font-bold text-navy">Gallery</h2>
                <p className="mt-2 max-w-xl text-[13px] leading-6 text-steel">
                  Representative visuals of the lifestyle and property type — not
                  actual site photographs. Ask us for the latest site images.
                </p>
                <GalleryGrid images={project.gallery} name={project.name} />
              </Reveal>

              <Reveal delay={0.05}>
                <div
                  data-testid="project-transparency-note"
                  className="mt-10 rounded-xl border-l-4 border-gold bg-gold-light/50 p-6"
                >
                  <p className="flex items-center gap-2 font-display text-base font-bold text-navy">
                    <FileWarning size={18} className="text-gold" /> Transparency Note
                  </p>
                  <p className="mt-3 text-sm leading-7 text-charcoal">{project.transparencyNote}</p>
                  {project.priceNote && (
                    <p className="mt-3 border-t border-gold/30 pt-3 text-sm font-semibold leading-7 text-navy">
                      {project.priceNote}
                    </p>
                  )}
                </div>
              </Reveal>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={0.1}>
                <div className="navy-panel overflow-hidden rounded-xl" data-testid="project-enquiry-card">
                  <div className="border-b border-white/10 p-7">
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                      <BadgeInfo size={14} /> Role & Developer
                    </p>
                    <p className="mt-4 text-sm leading-7 text-white/75">{project.svRole}</p>
                    <p className="mt-3 text-sm text-white/75">
                      <span className="font-semibold text-white">Developer: </span>
                      {project.developer}
                    </p>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-xl font-bold text-white">Enquire About This Project</h3>
                    <p className="mt-2.5 text-sm leading-6 text-white/65">
                      Get current availability, pricing and documentation status — clearly explained.
                    </p>
                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href={waLink(project.enquiryMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="project-detail-whatsapp-btn"
                        className="btn-gold w-full"
                      >
                        <MessageCircle size={16} /> WhatsApp Enquiry
                      </a>
                      <Link to="/contact" data-testid="project-detail-visit-btn" className="btn-ghost-light w-full">
                        <CalendarCheck size={15} /> Book a Site Visit
                      </Link>
                      <a
                        href={SITE.phoneHref}
                        data-testid="project-detail-call-btn"
                        className="mt-2 inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-white/80 transition-colors hover:text-gold"
                      >
                        <Phone size={15} className="text-gold" /> {SITE.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>

                {project.referenceUrl && (
                  <p className="mt-5 rounded-lg border border-navy/10 bg-ice/70 p-4 text-[12px] leading-6 text-steel">
                    Reference:{" "}
                    <a
                      href={project.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-navy underline decoration-gold underline-offset-2"
                    >
                      {project.referenceUrl}
                    </a>
                  </p>
                )}
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
              Explore More Opportunities
            </h2>
            <Link
              to="/projects"
              data-testid="project-related-all-link"
              className="group hidden items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-navy transition-colors hover:text-gold sm:inline-flex"
            >
              View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3" data-testid="project-related-grid">
            {related.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </FadePage>
  );
}
