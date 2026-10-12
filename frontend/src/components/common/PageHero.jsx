import { Reveal } from "@/components/common/Reveal";

export default function PageHero({ eyebrow, title, description, children, testid }) {
  return (
    <section data-testid={testid || "page-hero"} className="navy-panel relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-44">
      <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 flex items-end gap-3 opacity-[0.08]">
        <span className="h-20 w-9 bg-white" />
        <span className="h-32 w-9 bg-white" />
        <span className="h-44 w-9 bg-gold" />
        <span className="h-28 w-9 bg-white" />
      </div>
      <div className="container-x relative">
        <Reveal>
          {eyebrow && <p className="eyebrow !text-gold">{eyebrow}</p>}
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]" style={{ textWrap: "balance" }}>
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-white/70 sm:text-base">{description}</p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
