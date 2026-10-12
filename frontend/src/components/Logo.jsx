import { Link } from "react-router-dom";
import { LOGO_URL, SITE } from "@/data/site";

function Mark({ dark = false }) {
  const barA = dark ? "#EDF3FA" : "#062858";
  return (
    <svg
      viewBox="0 0 44 44"
      className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
      role="img"
      aria-label="SV Developers symbol"
    >
      <rect x="4" y="24" width="5" height="16" fill={barA} />
      <rect x="12" y="18" width="5" height="22" fill={barA} />
      <rect x="20" y="12" width="5" height="28" fill={barA} />
      <rect x="28" y="6" width="5" height="34" fill="#F5AA00" />
      <path
        d="M6 20 L17 10 L26 14 L37 4"
        fill="none"
        stroke="#F5AA00"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M30 4 L37 4 L37 11" fill="none" stroke="#F5AA00" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Wordmark({ dark = false }) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className={`font-display text-lg font-bold tracking-[0.08em] sm:text-xl ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        SV DEVELOPERS
      </span>
      <span className="mt-1 text-[8.5px] font-semibold uppercase tracking-[0.34em] text-gold-soft sm:text-[9px]">
        {SITE.tagline}
      </span>
    </span>
  );
}

export default function Logo({ dark = false, className = "", imgClassName = "" }) {
  return (
    <Link
      to="/"
      aria-label="SV Developers — Home"
      data-testid="logo-home-link"
      className={`inline-flex items-center gap-3 ${className}`}
    >
      {LOGO_URL ? (
        <img
          src={LOGO_URL}
          alt="SV Developers — Building Your Future"
          className={`object-contain ${imgClassName || "h-12 w-auto"}`}
        />
      ) : (
        <>
          <Mark dark={dark} />
          <Wordmark dark={dark} />
        </>
      )}
    </Link>
  );
}
