import PageMeta from "@/components/common/PageMeta";
import PageHero from "@/components/common/PageHero";
import { FadePage, Reveal } from "@/components/common/Reveal";
import { SITE } from "@/data/site";

export default function PrivacyPolicy() {
  return (
    <FadePage>
      <PageMeta
        title="Privacy Policy"
        description="How SV Developers collects, uses and protects the information you share through our website and enquiry channels."
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="We collect only the information needed to respond to your enquiry — and we never sell it."
        testid="privacy-page-hero"
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-steel">Last updated: January 2026</p>
            <div className="prose-legal mt-8" data-testid="privacy-policy-content">
              <h3>1. Overview</h3>
              <p>
                SV Developers (“we”, “our”, “us”) respects your privacy. This
                policy explains what information we collect when you use our
                website or contact us, how we use it, and the choices you have.
              </p>

              <h3>2. Information We Collect</h3>
              <ul>
                <li>Contact details you provide voluntarily: your name, phone number and email address.</li>
                <li>Enquiry details: the project you are interested in and any message or requirement you share.</li>
                <li>Basic technical data (such as browser type) collected for website functionality and aggregate analytics.</li>
              </ul>

              <h3>3. How We Use Your Information</h3>
              <ul>
                <li>To respond to your enquiry and provide the project information you requested.</li>
                <li>To arrange site visits and follow-up communication you have asked for.</li>
                <li>To improve our website and the clarity of the information we present.</li>
              </ul>
              <p>We do not use your details for unrelated marketing, and we do not send bulk promotional messages.</p>

              <h3>4. WhatsApp and Phone Communication</h3>
              <p>
                When you contact us on WhatsApp or by phone, standard privacy
                practices of those platforms also apply. We use these channels
                only to communicate about the enquiries and projects you raise
                with us.
              </p>

              <h3>5. Sharing of Information</h3>
              <p>
                We do not sell, rent or trade your personal information. Your
                details are shared only with the relevant team member handling
                your enquiry, or with a project's developer where strictly
                needed to answer your question — and only for that purpose.
              </p>

              <h3>6. Data Storage and Security</h3>
              <p>
                Enquiry submissions are stored in a secured database with access
                limited to our team. We retain enquiry records only as long as
                needed to serve you and to meet applicable record-keeping
                requirements.
              </p>

              <h3>7. Your Choices and Rights</h3>
              <p>
                You may ask us at any time to access, correct or delete the
                personal details you have shared, or to stop contacting you.
                Call us on {SITE.phoneDisplay} or message us on WhatsApp and we
                will act on your request promptly.
              </p>

              <h3>8. Cookies and Analytics</h3>
              <p>
                This website may use basic cookies and privacy-conscious
                analytics to understand aggregate usage. No advertising trackers
                are used, and no analytics data is used to identify you
                personally.
              </p>

              <h3>9. External Links</h3>
              <p>
                Our website may reference third-party websites (such as project
                reference links). We are not responsible for the privacy
                practices of those websites; please review their policies
                separately.
              </p>

              <h3>10. Updates to This Policy</h3>
              <p>
                We may update this policy from time to time. The latest version
                will always be available on this page.
              </p>

              <h3>11. Contact Us</h3>
              <p>
                For any privacy question or request, contact SV Developers,
                {` ${SITE.location}`} — Phone: {SITE.phoneDisplay}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </FadePage>
  );
}
