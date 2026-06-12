import { PendingActionButton } from '@/components/pending-action-button';
import { ShowcaseShell } from '@/components/showcase-shell';
import { Avatar, ComposeToolButton, PlatformBadge } from '@/components/showcase-ui';
import { composeTools, platforms, publishTargets } from '@/lib/mock/showcase';
import { getComposePageData } from '@/lib/server/showcase-data';
import { publishNowAction, saveDraftAction } from './actions';

export default async function ComposePage({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string }> }) {
  const draft = await getComposePageData();
  const params = await searchParams;
  const errorMessage = params.error ? decodeURIComponent(params.error) : null;
  const saved = params.saved === '1';
  return (
    <ShowcaseShell title={<><span>New post </span><em className="font-light italic text-accent">/ draft</em></>} active="/showcase/compose">
      <div className="grid max-w-[1200px] gap-7 xl:grid-cols-[1.1fr_1fr]">
        <form action={saveDraftAction} className="overflow-hidden rounded-[16px] border border-border bg-card">
          <div className="flex items-center justify-between border-b border-divider px-[22px] py-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Draft</span>
            <span className="font-mono text-[11px] text-muted">{draft.content.length} / 3000</span>
          </div>
          <div className="p-[22px]">
            <input type="hidden" name="draftId" value={draft.draftId || ''} />
            {saved ? <div className="mb-4 rounded-[12px] border border-border bg-surface px-4 py-3 text-[13px] text-subtle">Draft saved.</div> : null}
            {errorMessage ? <div className="mb-4 rounded-[12px] border border-danger-tint bg-accent-tint px-4 py-3 text-[13px] text-danger">{errorMessage}</div> : null}
            <div className="mb-[18px] flex items-center gap-3">
              <Avatar avatar={{ initials: draft.authorInitials, className: 'bg-accent-tint text-accent' }} size="sm" />
              <div>
                <div className="text-[15px] font-medium text-ink">{draft.authorName}</div>
                <div className="font-mono text-[12px] text-muted">{draft.authorHandle}</div>
              </div>
            </div>

            <textarea
              name="content"
              defaultValue={draft.content}
              className="min-h-[220px] w-full resize-none border-none bg-transparent font-serif text-[22px] leading-[1.4] text-ink outline-none"
            />

            <div className="mt-3 border-t border-divider pt-[18px]">
              <div className="flex gap-1 text-muted">
                {composeTools.map((tool) => (
                  <ComposeToolButton key={tool.label} tool={tool} />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-divider bg-panel px-[22px] py-[18px]">
            <div className="mb-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-muted">Publishing to</div>
            <div className="flex flex-wrap gap-[8px]">
              {publishTargets.map((target) => {
                const checked = draft.selectedTargets.includes(target.platform.key);

                return (
                  <label
                    key={target.platform.key}
                    className={`flex cursor-pointer items-center gap-[6px] rounded-full border px-[10px] py-[6px] text-[12px] font-medium ${checked ? 'border-ink bg-ink text-white' : 'border-border bg-card text-ink'}`}
                  >
                    <input type="checkbox" name={`target-${target.platform.key.toUpperCase()}`} defaultChecked={checked} className="sr-only" />
                    <PlatformBadge platform={target.platform} />
                    <span>{target.platform.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-[10px] border-t border-divider bg-panel px-[22px] py-[18px]">
            <PendingActionButton
              idle="Save draft"
              pending="Saving draft..."
              actionId="save-draft"
              className="rounded-[10px] border border-border px-4 py-[9px] text-[13px] font-medium text-subtle"
            />
            <PendingActionButton
              idle="Publish now"
              pending="Publishing..."
              actionId="publish-now"
              formAction={publishNowAction}
              className="rounded-[10px] bg-accent px-[18px] py-[9px] text-[13px] font-medium text-white"
            />
          </div>
        </form>

        <div className="overflow-hidden rounded-[16px] border border-border bg-card">
          <div className="flex items-center justify-between border-b border-divider px-[22px] py-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Live preview</span>
            <div className="flex gap-[2px]">
              {['Showcase', 'X', 'LinkedIn'].map((tab, index) => (
                <button
                  key={tab}
                  className={`rounded-[6px] px-3 py-[6px] font-mono text-[10px] uppercase tracking-[0.05em] ${index === 0 ? 'bg-ink text-white' : 'text-muted'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-panel p-[22px]">
            <div className="mb-[14px] flex items-center justify-between rounded-[8px] bg-sage-tint px-[14px] py-[10px] font-mono text-[12px] text-sage">
              <span>✓ All selected platforms validated</span>
              <span>READY</span>
            </div>

            <div className="rounded-[14px] border border-border bg-card p-[18px]">
              <div className="mb-3 flex items-center gap-[10px]">
                <Avatar avatar={{ initials: draft.authorInitials, className: 'bg-accent-tint text-accent' }} size="sm" />
                <div>
                  <div className="font-serif font-medium text-ink">{draft.authorName}</div>
                  <div className="font-mono text-[11px] text-muted">{draft.authorHandle} · now</div>
                </div>
              </div>
              <div className="font-serif text-[17px] leading-[1.5] text-ink">
                {draft.content.replace(' #building', '')} <span className="italic text-accent">#building</span>
              </div>
              <div className="mt-[10px] flex items-center gap-1 border-t border-dashed border-border pt-[10px]">
                <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.05em] text-muted">Also to</span>
                {[platforms.x, platforms.linkedin, platforms.bluesky].map((platform) => (
                  <PlatformBadge key={platform.key} platform={platform} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShowcaseShell>
  );
}
