import PageMeta from "@/components/common/PageMeta";
import PageHero from "@/components/common/PageHero";
import ImageBand from "@/components/common/ImageBand";
import { FadePage } from "@/components/common/Reveal";
import WhySv from "@/components/home/WhySv";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import CtaBand from "@/components/home/CtaBand";

const AMENITY_BAND =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBjbHViSG91c2UlMjBzd2ltbWluZyUyMHBvb2wlMjByZXNvcnQlMjBldmVuaW5nfGVufDB8fHwxNzkxODA2MDQ4fDA&ixlib=rb-4.1.0&q=85&auto=format&fit=crop&w=1800";

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
      <ImageBand
        image={AMENITY_BAND}
        eyebrow="Lifestyle Amenities"
        title="Amenities That Anchor Everyday Life."
        caption="Clubhouses, pools, play areas and open lawns — the details we study in every project we present, because a home is more than its plot size."
        testid="why-choose-us-image-band"
      />
      <ProcessTimeline />
      <CtaBand />
    </FadePage>
  );
}
