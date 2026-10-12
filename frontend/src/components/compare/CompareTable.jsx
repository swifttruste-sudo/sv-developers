import { Link } from "react-router-dom";
import { MessageCircle, MapPin } from "lucide-react";
import StatusChip from "@/components/common/StatusChip";
import { waLink } from "@/data/site";

function Row({ label, children }) {
  return (
    <tr className="border-t border-navy/10">
      <th
        scope="row"
        className="w-32 bg-ivory px-4 py-3.5 align-top text-[10.5px] font-bold uppercase tracking-[0.14em] text-steel sm:w-44"
      >
        {label}
      </th>
      {children}
    </tr>
  );
}

function Cell({ children }) {
  return <td className="px-4 py-3.5 align-top text-sm leading-6 text-charcoal">{children}</td>;
}

export default function CompareTable({ projects }) {
  const specLabels = [...new Set(projects.flatMap((p) => p.specs.map((s) => s.label)))];

  return (
    <div className="overflow-x-auto rounded-xl border border-navy/10 bg-white shadow-sm" data-testid="compare-table">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <tbody>
          <tr className="border-b border-navy/10">
            <th scope="row" className="w-32 bg-ivory px-4 py-4 sm:w-44" aria-label="Projects" />
            {projects.map((p) => (
              <td key={p.slug} className="px-4 py-4 align-top">
                <div className="overflow-hidden rounded-lg">
                  <img src={p.image} alt={`${p.name} — representative image`} className="h-28 w-full object-cover" />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-navy">{p.name}</h3>
                <p
                  className="mt-1.5 inline-flex rounded-full bg-gold-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a6c00]"
                  data-testid={`compare-bestfor-${p.slug}`}
                >
                  {p.bestFor}
                </p>
              </td>
            ))}
          </tr>

          <Row label="Status">
            {projects.map((p) => (
              <Cell key={p.slug}>
                <StatusChip label={p.status.label} tone={p.status.tone} />
              </Cell>
            ))}
          </Row>
          <Row label="Type">
            {projects.map((p) => (
              <Cell key={p.slug}>{p.typeLabel}</Cell>
            ))}
          </Row>
          <Row label="Location">
            {projects.map((p) => (
              <Cell key={p.slug}>
                <span className="inline-flex items-start gap-1.5">
                  <MapPin size={14} className="mt-1 shrink-0 text-gold" />
                  {p.location}
                </span>
              </Cell>
            ))}
          </Row>
          <Row label="Developer">
            {projects.map((p) => (
              <Cell key={p.slug}>{p.developer}</Cell>
            ))}
          </Row>
          <Row label="Highlights">
            {projects.map((p) => (
              <Cell key={p.slug}>
                <ul className="space-y-1">
                  {p.highlights.slice(0, 6).map((h) => (
                    <li key={h} className="text-[13px] leading-5">• {h}</li>
                  ))}
                </ul>
              </Cell>
            ))}
          </Row>

          {specLabels.map((label) => (
            <Row key={label} label={label}>
              {projects.map((p) => (
                <Cell key={p.slug}>{p.specs.find((s) => s.label === label)?.value || "—"}</Cell>
              ))}
            </Row>
          ))}

          <Row label="Actions">
            {projects.map((p) => (
              <Cell key={p.slug}>
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/projects/${p.slug}`}
                    data-testid={`compare-view-${p.slug}`}
                    className="btn-outline-navy !px-3 !py-2 !text-[10px]"
                  >
                    View Project
                  </Link>
                  <a
                    href={waLink(p.enquiryMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`compare-whatsapp-${p.slug}`}
                    className="btn-gold !px-3 !py-2 !text-[10px]"
                  >
                    <MessageCircle size={12} /> WhatsApp
                  </a>
                </div>
              </Cell>
            ))}
          </Row>
        </tbody>
      </table>
    </div>
  );
}
