import type { Metadata } from 'next';

import { LegalPage, Section } from '../(legal)/legal-page';

export const metadata: Metadata = {
  title: 'User Data Deletion · Showcase',
  description: 'How to delete your Showcase data and disconnect platforms.',
};

export default function DataDeletionPage() {
  return (
    <LegalPage title="User Data Deletion" updated="June 13, 2026">
      <p>
        You can delete your data from Showcase at any time. This page explains exactly what gets removed and how to
        request it.
      </p>

      <Section heading="Disconnect a single platform">
        <p>
          To remove the access tokens and stored profile for one connected platform (for example Threads, X, or
          LinkedIn), open <strong>Settings → Connected platforms</strong> in the app and choose
          <strong> Disconnect</strong> next to that platform. This immediately deletes the stored tokens for that
          platform from our database.
        </p>
      </Section>

      <Section heading="Delete your entire account">
        <p>To delete your Showcase account and all associated data, send a request from your account email to:</p>
        <p>
          <a href="mailto:maran.mallow@gmail.com?subject=Delete%20my%20Showcase%20data" className="text-accent underline">
            maran.mallow@gmail.com
          </a>{' '}
          with the subject &ldquo;Delete my Showcase data&rdquo;.
        </p>
        <p>We will permanently delete the following within 30 days:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>your account and profile,</li>
          <li>all drafts, posts, and publish history,</li>
          <li>all connected-platform access tokens and stored platform profiles.</li>
        </ul>
      </Section>

      <Section heading="Data shared with third-party platforms">
        <p>
          Content you previously published to an external platform (such as Threads or X) lives on that platform under
          its own controls. To remove those posts, delete them on that platform directly or use that platform&rsquo;s
          data-deletion process.
        </p>
      </Section>

      <Section heading="Contact">
        <p>
          For any data-deletion question, email{' '}
          <a href="mailto:maran.mallow@gmail.com" className="text-accent underline">maran.mallow@gmail.com</a>.
        </p>
      </Section>
    </LegalPage>
  );
}
