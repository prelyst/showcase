import type { Metadata } from 'next';

import { LegalPage, Section } from '../(legal)/legal-page';

export const metadata: Metadata = {
  title: 'Terms of Service · Showcase',
  description: 'The terms that govern your use of Showcase.',
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="June 13, 2026">
      <p>
        These Terms govern your use of Showcase. By creating an account or using the service, you agree to them.
      </p>

      <Section heading="Using Showcase">
        <p>
          You must be old enough to form a binding contract in your jurisdiction. You are responsible for the content
          you create and publish, and for keeping your account credentials secure.
        </p>
      </Section>

      <Section heading="Connected platforms">
        <p>
          When you connect a third-party platform (such as X, LinkedIn, or Threads), you authorize Showcase to publish
          content on your behalf to that platform. Your use of each platform also remains subject to that platform&rsquo;s
          own terms and policies. You can disconnect any platform at any time from Settings.
        </p>
      </Section>

      <Section heading="Acceptable use">
        <ul className="list-disc space-y-2 pl-5">
          <li>Do not publish unlawful, infringing, or abusive content.</li>
          <li>Do not attempt to disrupt, reverse engineer, or abuse the service.</li>
          <li>Respect the rate limits and rules of the platforms you connect.</li>
        </ul>
      </Section>

      <Section heading="Your content">
        <p>
          You retain ownership of the content you create. You grant Showcase the limited rights needed to store,
          display, and publish that content to the destinations you choose.
        </p>
      </Section>

      <Section heading="Disclaimer and liability">
        <p>
          Showcase is provided &ldquo;as is&rdquo; without warranties. We are not responsible for the availability or
          behavior of third-party platforms. To the extent permitted by law, our liability is limited.
        </p>
      </Section>

      <Section heading="Changes and termination">
        <p>
          We may update these Terms from time to time. You may stop using the service at any time, and we may suspend
          accounts that violate these Terms.
        </p>
      </Section>

      <Section heading="Contact">
        <p>
          Questions? Email <a href="mailto:maran.mallow@gmail.com" className="text-accent underline">maran.mallow@gmail.com</a>.
        </p>
      </Section>
    </LegalPage>
  );
}
