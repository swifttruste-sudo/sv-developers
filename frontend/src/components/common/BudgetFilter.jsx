import { IndianRupee } from "lucide-react";
import { BUDGET_BANDS } from "@/data/projects";

export default function BudgetFilter({ value, onChange, testid = "budget-filter" }) {
  return (
    <div className="relative sm:w-56">
      <IndianRupee size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={testid}
        aria-label="Filter projects by budget"
        className="field-input appearance-none !pl-11"
      >
        {BUDGET_BANDS.map((b) => (
          <option key={b.id} value={b.id}>
            {b.label}
          </option>
        ))}
      </select>
    </div>
  );
}
