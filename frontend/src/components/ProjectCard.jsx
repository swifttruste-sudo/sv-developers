import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import StatusChip from "@/components/common/StatusChip";
import { waLink } from "@/data/site";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      data-testid={`project-card-${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <Link
        to={`/projects/${project.slug}`}
        data-testid={`project-view-${project.slug}`}
        className="relative block h-56 overflow-hidden"
        aria-label={`View ${project.name}`}
      >
        <img
          src={project.image}
          alt={`${project.name} — representative image`}
          loading={index < 3 ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/55 via-transparent to-transparent" />
        <div className="absolute left-4 top-4">
          <StatusChip label={project.status.label} tone="light" />
        </div>
        <span className="absolute bottom-4 right-4 inline-flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-gold text-midnight opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowRight size={18} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-gold-soft">
          {project.typeLabel}
        </p>
        <h3 className="mt-2 font-display text-xl font-bold text-navy">{project.name}</h3>
        <p className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-medium text-steel">
          <MapPin size={14} className="shrink-0 text-gold" /> {project.location}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-steel">{project.shortDescription}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.highlights.slice(0, 3).map((h) => (
            <li
              key={h}
              className="rounded-full bg-ice px-2.5 py-1 text-[10.5px] font-semibold text-navy"
            >
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-3 pt-6">
          <Link
            to={`/projects/${project.slug}`}
            data-testid={`project-details-btn-${project.slug}`}
            className="btn-outline-navy flex-1 !px-4 !py-2.5 !text-[11px]"
          >
            View Project <ArrowRight size={14} />
          </Link>
          <a
            href={waLink(project.enquiryMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`project-whatsapp-btn-${project.slug}`}
            aria-label={`WhatsApp enquiry for ${project.name}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-navy/15 text-navy transition-all duration-300 hover:border-gold hover:bg-gold hover:text-midnight"
          >
            <MessageCircle size={17} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
