import { Link } from "react-router-dom";
import { ArrowRight, MapPinned, Search, FileSearch, ShieldCheck, MessagesSquare, Handshake, TrendingUp } from "lucide-react";
import PageMeta from "@/components/common/PageMeta";
import PageHero from "@/components/common/PageHero";
import ImageReveal from "@/components/common/ImageReveal";
import SectionHeading from "@/components/common/SectionHeading";
import { FadePage, Reveal } from "@/components/common/Reveal";
import TrustStrip from "@/components/home/TrustStrip";
import TeamPreview from "@/components/home/TeamPreview";
import CtaBand from "@/components/home/CtaBand";

const ACTIVITIES = [
  { icon: TrendingUp, title: "Identify Promising Growth Locations", text: "We study connectivity, infrastructure and surrounding development to spot residential corridors with genuine potential." },
  { icon: Search, title: "Evaluate Location Fundamentals", text: "Every location is assessed on fundamentals first — access, amenities, water, road networks and planned growth." },
  { icon: FileSearch, title: "Understand Project Specifications", text: "Layouts, plot sizes, configurations and amenities are examined in detail before we present a project." },
  { icon: ShieldCheck, title: "Focus on Ownership & Approvals", text: "Title documents, ownership and applicable approvals are central to how we evaluate every opportunity." },
  { icon: MessagesSquare, title: "Present Information Transparently", text: "We state clearly what is verified, what is supplied material and what is still being reconfirmed." },
  { icon: Handshake, title: "Build Lasting Relationships", text: "With customers and development partners alike — trust that continues long after an enquiry." },
];

const STORY_IMG =
  "https://images.unsplash.com/photo-1640877268187-2fa6b2ed7a5f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwyfHxhZXJpYWwlMjB2aWV3JTIwbHV4dXJ5JTIwcmVzaWRlbnRpYWwlMjBjb21tdW5pdHklMjB2aWxsYXMlMjBncmVlbmVyeXxlbnwwfHx8fDE3OTE4MDYwNDh8MA&ixlib=rb-4.1.0&q=85&auto=format&fit=crop&w=1400";

const COLLAGE = [
  {
    src: "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob21lJTIwaW50ZXJpb3IlMjBsaXZpbmdfcm9vbSUyMG1vZGVybnxlbnwwfHx8fDE3OTE4MjIyOTN8MA&ixlib=rb-4.1.0&q=85&auto=format&fit=crop&w=1000",
    alt: "Thoughtfully designed modern interior — representative image",
  },
  {
    src: "https://images.unsplash.com/photo-1733060893177-dbf0678ae0d3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB2aWV3JTIwbHV4dXJ5JTIwcmVzaWRlbnRpYWwlMjBjb21tdW5pdHklMjB2aWxsYXMlMjBncmVlbmVyeXxlbnwwfHx8fDE3OTE4MDYwNDh8MA&ixlib=rb-4.1.0&q=85&auto=format&fit=crop&w=1000",
    alt: "Landscaped residential community — representative image",
  },
  {
    src: "https://images.unsplash.com/photo-1613850011958-cfb3e7364058?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGVudHJhbmNlJTIwZ2F0ZSUyMGxhbmRzY2FwZXxlbnwwfHx8fDE3OTE4MjIyOTN8MA&ixlib=rb-4.1.0&q=85&auto=format&fit=crop&w=1000",
    alt: "Greenery around a modern residential facade — representative image",
  },
];

export default function About() {
  return (
    <FadePage>
      <PageMeta
        title="About Us"
        description="SV Developers is a newly established Hyderabad real estate company whose six-member core team brings 55 years of combined industry experience — with a buyer-first philosophy."
      />
      <PageHero
        eyebrow="About SV Developers"
        title="Building Your Future, On a Foundation of Experience."
        description="A newly established company, an experienced core team, and one guiding philosophy: the buyer comes first."
        testid="about-page-hero"
      />

      <section className="bg-ivory py-20 lg:py-28" data-testid="about-story">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-xl border-2 border-gold/40" />
            <img
              src={STORY_IMG}
              alt="Aerial view of a planned residential community — representative image"
              loading="lazy"
              className="relative aspect-[4/3.4] w-full rounded-xl object-cover shadow-lift"
            />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Our Story"
              title="New Company. Deep Experience. Clear Intent."
            />
            <Reveal delay={0.1}>
              <div className="mt-7 space-y-5 text-[15px] leading-8 text-steel sm:text-base">
                <p>
                  SV Developers is a newly established real estate company backed
                  by a core team with 55 years of combined real estate industry
                  experience — experience earned across residential plots,
                  premium villa plots, independent villas, plotted communities
                  and apartment projects around Hyderabad.
                </p>
                <p>
                  We focus on residential property opportunities across Hyderabad
                  and its surrounding regions. Depending on the project, our work
                  spans identifying promising opportunities, developing projects,
                  promoting properties, marketing developments and selling
                  projects — and we state our role in each project openly.
                </p>
                <p className="border-l-2 border-gold pl-5 font-medium text-navy">
                  “We don't just help you discover property. We help you
                  understand its potential.”
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="bg-ivory pb-20 pt-16 lg:pb-28" data-testid="about-collage">
        <div className="container-x grid gap-5 sm:grid-cols-3">
          {COLLAGE.map((img, i) => (
            <ImageReveal
              key={img.src}
              src={img.src}
              alt={img.alt}
              className="aspect-[4/5] rounded-xl shadow-card"
              delay={i * 0.12}
            />
          ))}
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28" data-testid="about-activities">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Do"
            title="The Right Property. The Right Guidance."
            description="Our activities cover the full journey of a residential opportunity — always anchored in location fundamentals, documentation awareness and transparent communication."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06} className="h-full">
                <article className="group flex h-full flex-col rounded-xl border border-navy/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-card">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-ice text-navy transition-colors duration-300 group-hover:bg-gold group-hover:text-midnight">
                    <a.icon size={22} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-bold text-navy">{a.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-steel">{a.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-xl border border-gold/40 bg-gold-light/50 p-8 sm:flex-row sm:items-center">
              <p className="max-w-xl text-[15px] font-medium leading-7 text-navy">
                A note on our experience: SV Developers is a new company — the
                55-year figure represents the combined experience of our
                six-member core team, and we present it exactly that way.
              </p>
              <Link to="/team" data-testid="about-team-cta" className="btn-navy shrink-0">
                Meet the Team <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <TeamPreview />
      <CtaBand />
    </FadePage>
  );
}
