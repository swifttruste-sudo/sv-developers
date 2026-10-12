import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarCheck, Lightbulb, ShieldCheck } from "lucide-react";
import { rateProject, suggestionFor } from "@/lib/ratings";

function Bar({ label, level, score }) {
  const color = level === "High" ? "bg-gold" : level === "Moderate" ? "bg-gold-soft" : "bg-steel/40";
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-steel">
        <span>{label}</span>
        <span className="text-navy">{level}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ice">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${color}`}
          data-testid="clarity-bar"
        />
      </div>
    </div>
  );
}

export default function CompareInsights({ projects }) {
  const rated = projects.map((p) => ({ p, r: rateProject(p) }));
  const { best, reason, caveat } = suggestionFor(projects);

  return (
    <div className="mt-12">
      <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">Information Clarity Ratings</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-steel">
        These ratings measure how completely each listing is documented today —
        never the quality of the project itself. We rate only what we can
        verify, and we encourage you to do the same.
      </p>

      <div className={`mt-8 grid gap-6 ${rated.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
        {rated.map(({ p, r }) => (
          <div key={p.slug} data-testid={`insights-card-${p.slug}`} className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-base font-bold text-navy">{p.name}</h3>
              <span className="text-gold-gradient font-display text-3xl font-bold" data-testid={`clarity-score-${p.slug}`}>
                {r.overall}
              </span>
            </div>
            <div className="mt-5 space-y-4">
              <Bar label="Documentation clarity" level={r.levels.documentation} score={r.documentation} />
              <Bar label="Location clarity" level={r.levels.location} score={r.location} />
              <Bar label="Specification detail" level={r.levels.specs} score={r.specs} />
              <Bar label="Stage certainty" level={r.levels.stage} score={r.stage} />
            </div>
          </div>
        ))}
      </div>

      <div data-testid="compare-suggestion" className="mt-10 rounded-xl border-l-4 border-gold bg-gold-light/50 p-7 sm:p-9">
        <p className="flex items-center gap-2 font-display text-lg font-bold text-navy">
          <Lightbulb size={19} className="text-gold" /> Our Honest Suggestion
        </p>
        <p className="mt-3 text-[15px] leading-8 text-charcoal">
          Based purely on documentation clarity, <strong className="text-navy">{best.name}</strong>{" "}
          stands out in this comparison — {reason}.
        </p>
        <p className="mt-3 text-sm leading-7 text-charcoal/80">{caveat}</p>
        <p className="mt-4 flex items-start gap-2 text-[13px] leading-6 text-steel">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-gold" />
          We rate only what we can verify today. Please verify every document
          independently — we insist on it.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" data-testid="suggestion-visit-btn" className="btn-gold">
            <CalendarCheck size={15} /> Book a Site Visit
          </Link>
          <Link to="/buyer-first" data-testid="suggestion-philosophy-link" className="btn-outline-navy">
            Why We Rate This Way
          </Link>
        </div>
      </div>
    </div>
  );
}
