import PageMeta from "@/components/common/PageMeta";
import { FadePage } from "@/components/common/Reveal";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import BrandAbout from "@/components/home/BrandAbout";
import ProjectDiscovery from "@/components/home/ProjectDiscovery";
import WhySv from "@/components/home/WhySv";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import BuyerFirstBand from "@/components/home/BuyerFirstBand";
import TeamPreview from "@/components/home/TeamPreview";
import FaqSection from "@/components/home/FaqSection";
import CtaBand from "@/components/home/CtaBand";

export default function Home() {
  return (
    <FadePage>
      <PageMeta
        title="SV Developers | Building Your Future — Real Estate in Hyderabad"
        description="Residential plots, premium villas and property opportunities around Hyderabad, presented with a buyer-first approach by a core team with 55 years of combined experience."
      />
      <Hero />
      <TrustStrip />
      <BrandAbout />
      <ProjectDiscovery />
      <WhySv />
      <ProcessTimeline />
      <BuyerFirstBand />
      <TeamPreview />
      <FaqSection />
      <CtaBand />
    </FadePage>
  );
}
