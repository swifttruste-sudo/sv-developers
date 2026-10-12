import PageMeta from "@/components/common/PageMeta";
import PageHero from "@/components/common/PageHero";
import { FadePage, Reveal } from "@/components/common/Reveal";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import CtaBand from "@/components/home/CtaBand";
import { Quote } from "lucide-react";
import { COMMITMENTS } from "@/data/home";

export default function BuyerFirst() {
  return (
    <FadePage>
      <PageMeta
        title="Buyer-First Approach"
        description="Property is a significant financial decision. At SV Developers, transparency, responsible communication and informed decision-making come before the transaction."
      />
      <PageHero
        eyebrow="Buyer-First Approach"
        title="Your Interests Come Before the Transaction."
        description="Property is a significant financial decision. Buyers deserve clear information, time to evaluate their options and an honest explanation of project details."
        testid="buyer-first-page-hero"
      />

      <section className="bg-white py-16 lg:py-24" data-testid="buyer-first-commitments">
        <div className="container-x">
          <Reveal>
            <blockquote className="mx-auto max-w-3xl border-l-2 border-gold bg-ivory px-8 py-7 text-center sm:px-12">
              <Quote size={20} className="inline text-gold" />
              <p className="mt-3 font-display text-xl font-semibold leading-8 text-navy sm:text-2xl">
                A Better-Informed Buyer Is the Foundation of a Better Real Estate
                Experience.
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mx-auto mt-10 max-w-3xl text-center text-[15px] leading-8 text-steel">
              <p>
                At SV Developers, we emphasize transparency, responsible
                communication and informed decision-making. Our aim is to build
                trust that continues long after a property enquiry. Here is what
                that means in practice:
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-xl border border-navy/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-card">
                  <span className="font-display text-3xl font-bold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy">{c.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-steel">{c.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline />
      <CtaBand />
    </FadePage>
  );
}
