import { Reveal } from "@/components/common/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col ${alignCls} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={`mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.6rem] ${
          dark ? "text-white" : "text-navy"
        }`}
        style={{ textWrap: "balance" }}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 max-w-2xl text-[15px] leading-7 sm:text-base ${dark ? "text-white/70" : "text-steel"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
