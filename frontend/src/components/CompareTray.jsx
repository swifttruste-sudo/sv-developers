import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { GitCompare, X, ArrowRight } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { getProject } from "@/data/projects";

export default function CompareTray() {
  const { ids, toggle, clear } = useCompare();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname.startsWith("/admin") || pathname === "/compare") return null;

  return (
    <AnimatePresence>
      {ids.length > 0 && (
        <motion.div
          data-testid="compare-tray"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-4 right-4 z-[55] sm:left-1/2 sm:right-auto sm:w-auto sm:-translate-x-1/2"
        >
          <div className="navy-panel flex flex-wrap items-center justify-center gap-3 rounded-xl border border-gold/30 px-4 py-3 shadow-lift">
            <span className="hidden items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gold sm:inline-flex">
              <GitCompare size={14} /> Compare
            </span>
            {ids.map((id) => {
              const p = getProject(id);
              if (!p) return null;
              return (
                <span
                  key={id}
                  data-testid={`compare-tray-item-${id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white"
                >
                  {p.name}
                  <button
                    type="button"
                    onClick={() => toggle(id)}
                    data-testid={`compare-remove-${id}`}
                    aria-label={`Remove ${p.name} from compare`}
                    className="text-white/60 transition-colors hover:text-gold"
                  >
                    <X size={13} />
                  </button>
                </span>
              );
            })}
            {ids.length >= 2 && (
              <button
                type="button"
                onClick={() => navigate(`/compare?ids=${ids.join(",")}`)}
                data-testid="compare-now-btn"
                className="btn-gold !px-4 !py-2 !text-[11px]"
              >
                Compare Now <ArrowRight size={13} />
              </button>
            )}
            <button
              type="button"
              onClick={clear}
              data-testid="compare-clear-btn"
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-gold"
            >
              Clear
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
