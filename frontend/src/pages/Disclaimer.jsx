import PageMeta from "@/components/common/PageMeta";
import PageHero from "@/components/common/PageHero";
import { FadePage, Reveal } from "@/components/common/Reveal";
import { SITE } from "@/data/site";

export default function Disclaimer() {
  return (
    <FadePage>
      <PageMeta
        title="Disclaimer"
        description="Important information about the scope of SV Developers' services, project information, pricing, approvals and representative imagery."
      />
      <PageHero
        eyebrow="Legal"
        title="Disclaimer"
        description="Clear terms about how we present project information — so you can rely on what we say, and verify the rest."
        testid="disclaimer-page-hero"
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-steel">Last updated: January 2026</p>
            <div className="prose-legal mt-8" data-testid="disclaimer-content">
              <h3>1. General</h3>
              <p>
                The information on this website is provided for general
                information about SV Developers and the residential property
                opportunities we present. It does not constitute an offer,
                contract or commitment of any kind.
              </p>

              <h3>2. Our Role in Projects</h3>
              <p>
                SV Developers is a real estate development, promotion, marketing
                and sales company. Depending on the project, our role may be
                development, promotion, marketing, sales or enquiry
                facilitation. The role applicable to each project is stated on
                the relevant project page.
              </p>

              <h3>3. Project Information, Pricing and Approvals</h3>
              <ul>
                <li>
                  Project details, stated areas, configurations and amenities
                  are shared as supplied and are subject to reconfirmation
                  against current records.
                </li>
                <li>
                  Pricing is not published on this website. Any price shared
                  during an enquiry is valid only when reconfirmed in writing at
                  that time.
                </li>
                <li>
                  Approval status (including HMDA, RERA or other authorities) is
                  shown only after the latest applicable official records have
                  been verified. Until then, approvals are described as
                  “to be confirmed”.
                </li>
                <li>
                  Possession dates, phasing and availability are not published
                  until reconfirmed against current developer documents.
                </li>
              </ul>

              <h3>4. Third-Party Projects</h3>
              <p>
                Some projects presented on this website are developed by
                independent third parties (for example, Pearl County is
                associated with JS Infra Developers, and BBG-related
                opportunities are facilitated as an enquiry service). SV
                Developers does not claim ownership of, or an authorised
                partnership with, BBG India unless officially confirmed.
                Purchases in third-party projects are made directly with the
                respective developer on their terms.
              </p>

              <h3>5. Concept-Stage Presentations</h3>
              <p>
                Projects described as “concept presentations” (such as Vertical
                Forest) are shown strictly as stated concept material. They
                should not be understood as approved, under construction or
                currently available without supporting records.
              </p>

              <h3>6. Representative Imagery</h3>
              <p>
                Images used on this website are representative architectural and
                location visuals, unless explicitly stated otherwise. They are
                not claimed to be photographs of the actual projects and are
                used to illustrate the type of opportunity presented.
              </p>

              <h3>7. No Professional Advice</h3>
              <p>
                Nothing on this website constitutes legal, financial or
                investment advice. We encourage every buyer to independently
                verify title documents, approvals and project records with a
                qualified legal and financial advisor before making a decision.
              </p>

              <h3>8. Regulatory Note</h3>
              <p>
                Real estate projects in Telangana may require registration under
                the Real Estate (Regulation and Development) Act, 2016 (RERA)
                and other applicable laws. Buyers should verify the current
                registration status of any project with the concerned
                authorities before purchase.
              </p>

              <h3>9. Limitation of Liability</h3>
              <p>
                To the fullest extent permitted by law, SV Developers accepts no
                liability for any loss arising from reliance on the general
                information published on this website. Decisions should be based
                on verified, current documentation.
              </p>

              <h3>10. Contact</h3>
              <p>
                Questions about this disclaimer? Contact SV Developers,
                {` ${SITE.location}`} — Phone: {SITE.phoneDisplay}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </FadePage>
  );
}
