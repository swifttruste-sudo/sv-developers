import PageMeta from "@/components/common/PageMeta";
import PageHero from "@/components/common/PageHero";
import { FadePage } from "@/components/common/Reveal";
import WhySv from "@/components/home/WhySv";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import CtaBand from "@/components/home/CtaBand";

export default function WhyChooseUs() {
  return (
    <FadePage>
      <PageMeta
        title="Why Choose Us"
        description="Experienced guidance, growth-zone focus, documentation awareness and transparent communication — the SV Developers difference in Hyderabad real estate."
      />
      <PageHero
        eyebrow="Why Choose Us"
        title="Real Estate. Guided by Experience. Driven by Trust."
        description="Six commitments that shape how we identify opportunities, present projects and stand beside every buyer — from the first conversation to long after the keys are handed over."
        testid="why-choose-us-page-hero"
      />
      <WhySv detailed />
      <ProcessTimeline />
      <CtaBand />
    </FadePage>
  );
}
