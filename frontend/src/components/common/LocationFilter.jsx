import { MapPin } from "lucide-react";
import { LOCATION_AREAS } from "@/data/projects";

export default function LocationFilter({ value, onChange, testid = "location-filter" }) {
  return (
    <div className="relative sm:w-60">
      <MapPin size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={testid}
        aria-label="Filter projects by location"
        className="field-input appearance-none !pl-11"
      >
        {LOCATION_AREAS.map((a) => (
          <option key={a.id} value={a.id}>
            {a.label}
          </option>
        ))}
      </select>
    </div>
  );
}
