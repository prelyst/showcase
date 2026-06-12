import { ComposeEditor } from '@/components/compose-editor';
import { ShowcaseShell } from '@/components/showcase-shell';
import { getComposePageData } from '@/lib/server/showcase-data';

export default async function ComposePage({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string }> }) {
  const { availableTargets, ...draft } = await getComposePageData();
  const params = await searchParams;
  const errorMessage = params.error ? decodeURIComponent(params.error) : null;
  const saved = params.saved === '1';
  return (
    <ShowcaseShell title={<><span>New post </span><em className="font-light italic text-accent">/ draft</em></>} active="/showcase/compose">
      <ComposeEditor draft={draft} availableTargets={availableTargets} saved={saved} errorMessage={errorMessage} />
    </ShowcaseShell>
  );
}
