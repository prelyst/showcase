import type { Metadata } from 'next';

import { LegalPage, Section } from '../(legal)/legal-page';

export const metadata: Metadata = {
  title: 'Privacy Policy · Showcase',
  description: 'How Showcase collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="June 13, 2026">
      <p>
        Showcase (&ldquo;Showcase&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a creator-first publishing tool. This
        policy explains what we collect, why, and the choices you have. We collect as little as possible and we never
        sell your data.
      </p>

      <Section heading="Information we collect">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Account data</strong> — your email address and profile details you provide when you sign up.</li>
          <li><strong>Content you create</strong> — drafts, posts, and previews you write inside Showcase.</li>
          <li>
            <strong>Connected platform data</strong> — when you connect an account (such as X, LinkedIn, or Threads),
            we store the access tokens and the basic public profile (handle, name, account id) returned by that
            platform, solely to publish on your behalf.
          </li>
          <li><strong>Operational data</strong> — basic logs needed to run the service securely.</li>
        </ul>
      </Section>

      <Section heading="How we use your information">
        <ul className="list-disc space-y-2 pl-5">
          <li>To publish the content you explicitly choose to send to connected platforms.</li>
          <li>To show you the status of each publish lane.</li>
          <li>To operate, secure, and improve the service.</li>
        </ul>
        <p>
          We do <strong>not</strong> scrape or ingest your existing posts from other platforms, and we do not use your
          content to train AI models.
        </p>
      </Section>

      <Section heading="Sharing">
        <p>
          We share content only with the third-party platforms you direct us to publish to, and only the content you
          select. We do not sell personal data. We may use infrastructure providers (for hosting and our database) who
          process data on our behalf under appropriate safeguards.
        </p>
      </Section>

      <Section heading="Data retention and deletion">
        <p>
          We retain your data while your account is active. You can disconnect any platform at any time from Settings,
          which removes the stored tokens for that platform. To delete your account and associated data, see our{' '}
          <a href="/data-deletion" className="text-accent underline">Data Deletion</a> instructions.
        </p>
      </Section>

      <Section heading="Your rights">
        <p>
          You may request access to, correction of, or deletion of your personal data by contacting us at the address
          below.
        </p>
      </Section>

      <Section heading="Contact">
        <p>
          Questions about this policy? Email <a href="mailto:maran.mallow@gmail.com" className="text-accent underline">maran.mallow@gmail.com</a>.
        </p>
      </Section>
    </LegalPage>
  );
}
