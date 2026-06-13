'use client';

import { useMemo, useState } from 'react';

import { publishNowAction, saveDraftAction } from '@/app/showcase/compose/actions';
import { PendingActionButton } from '@/components/pending-action-button';
import { Avatar, ComposeToolButton, PlatformBadge } from '@/components/showcase-ui';
import { composeTools } from '@/lib/mock/showcase';
import type { PlatformChip, PlatformKey } from '@/lib/types/showcase';

// Per-platform character ceilings used to validate the live preview.
const PLATFORM_LIMITS: Record<PlatformKey, number> = {
  showcase: 3000,
  x: 280,
  threads: 500,
  facebook: 63206,
  instagram: 2200,
  youtube: 5000,
};

type Draft = {
  draftId: string | null;
  authorName: string;
  authorHandle: string;
  authorInitials: string;
  content: string;
  selectedTargets: string[];
};

/** Renders draft text with #hashtags accented, preserving line breaks. */
function renderBody(content: string) {
  if (!content.trim()) {
    return <span className="text-muted">Your post preview will appear here as you type…</span>;
  }

  return content.split(/(\s+)/).map((token, index) =>
    token.startsWith('#') && token.length > 1 ? (
      <span key={index} className="italic text-accent">
        {token}
      </span>
    ) : (
      <span key={index}>{token}</span>
    ),
  );
}

export function ComposeEditor({
  draft,
  availableTargets,
  saved,
  errorMessage,
}: {
  draft: Draft;
  availableTargets: PlatformChip[];
  saved: boolean;
  errorMessage: string | null;
}) {
  const [content, setContent] = useState(draft.content);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(draft.selectedTargets.filter((key) => availableTargets.some((target) => target.key === key))),
  );

  const selectedTargets = availableTargets.filter((target) => selected.has(target.key));
  const [previewKey, setPreviewKey] = useState<PlatformKey>(
    (selectedTargets[0]?.key ?? availableTargets[0]?.key ?? 'showcase') as PlatformKey,
  );

  // Keep the active preview tab pointed at a target that's still selected.
  const activeKey: PlatformKey = selected.has(previewKey)
    ? previewKey
    : ((selectedTargets[0]?.key ?? 'showcase') as PlatformKey);
  const activePlatform = availableTargets.find((target) => target.key === activeKey) ?? availableTargets[0];

  const limit = PLATFORM_LIMITS[activeKey] ?? 3000;
  const overBy = Math.max(0, content.length - limit);

  const validation = useMemo(() => {
    if (selectedTargets.length === 0) return { tone: 'warn' as const, text: 'Select at least one platform', tag: 'NO TARGET' };
    if (!content.trim()) return { tone: 'warn' as const, text: 'Write something to publish', tag: 'EMPTY' };
    const over = selectedTargets.filter((target) => content.length > (PLATFORM_LIMITS[target.key] ?? 3000));
    if (over.length) return { tone: 'error' as const, text: `Too long for ${over.map((t) => t.label).join(', ')}`, tag: 'OVER LIMIT' };
    return { tone: 'ok' as const, text: 'All selected platforms validated', tag: 'READY' };
  }, [content, selectedTargets]);

  function toggle(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="grid max-w-[1200px] gap-7 xl:grid-cols-[1.1fr_1fr]">
      <form action={saveDraftAction} className="overflow-hidden rounded-[16px] border border-border bg-card">
        <div className="flex items-center justify-between border-b border-divider px-[22px] py-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Draft</span>
          <span className="font-mono text-[11px] text-muted">{content.length} / 3000</span>
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
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Share something…"
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
          {availableTargets.length > 1 ? (
            <div className="flex flex-wrap gap-[8px]">
              {availableTargets.map((target) => {
                const checked = selected.has(target.key);

                return (
                  <label
                    key={target.key}
                    className={`flex cursor-pointer items-center gap-[6px] rounded-full border px-[10px] py-[6px] text-[12px] font-medium transition ${checked ? 'border-ink bg-ink text-white' : 'border-border bg-card text-ink'}`}
                  >
                    <input
                      type="checkbox"
                      name={`target-${target.key.toUpperCase()}`}
                      checked={checked}
                      onChange={() => toggle(target.key)}
                      className="sr-only"
                    />
                    <PlatformBadge platform={target} />
                    <span>{target.label}</span>
                  </label>
                );
              })}
            </div>
          ) : (
            <div className="text-[13px] text-muted">
              Only <span className="font-medium text-ink">Showcase</span> is connected.{' '}
              <a href="/showcase/settings" className="text-accent underline">
                Connect a platform
              </a>{' '}
              to cross-post.
              <input type="hidden" name="target-SHOWCASE" value="on" />
            </div>
          )}
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
            {(selectedTargets.length ? selectedTargets : availableTargets.slice(0, 1)).map((target) => (
              <button
                key={target.key}
                type="button"
                onClick={() => setPreviewKey(target.key)}
                className={`rounded-[6px] px-3 py-[6px] font-mono text-[10px] uppercase tracking-[0.05em] transition ${target.key === activeKey ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}
              >
                {target.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-panel p-[22px]">
          <div
            className={`mb-[14px] flex items-center justify-between rounded-[8px] px-[14px] py-[10px] font-mono text-[12px] ${
              validation.tone === 'ok'
                ? 'bg-sage-tint text-sage'
                : validation.tone === 'warn'
                  ? 'bg-surface text-muted'
                  : 'bg-accent-tint text-danger'
            }`}
          >
            <span>{validation.tone === 'ok' ? '✓ ' : ''}{validation.text}</span>
            <span>{validation.tag}</span>
          </div>

          <div className="rounded-[14px] border border-border bg-card p-[18px]">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <Avatar avatar={{ initials: draft.authorInitials, className: 'bg-accent-tint text-accent' }} size="sm" />
                <div>
                  <div className="font-serif font-medium text-ink">{draft.authorName}</div>
                  <div className="font-mono text-[11px] text-muted">{draft.authorHandle} · now</div>
                </div>
              </div>
              {activePlatform ? <PlatformBadge platform={activePlatform} large /> : null}
            </div>
            <div className="whitespace-pre-wrap break-words font-serif text-[17px] leading-[1.5] text-ink">{renderBody(content)}</div>

            <div className="mt-[12px] flex items-center justify-between border-t border-dashed border-border pt-[10px]">
              <div className="flex items-center gap-1">
                {selectedTargets.filter((target) => target.key !== activeKey).length ? (
                  <>
                    <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.05em] text-muted">Also to</span>
                    {selectedTargets
                      .filter((target) => target.key !== activeKey)
                      .map((target) => (
                        <PlatformBadge key={target.key} platform={target} />
                      ))}
                  </>
                ) : (
                  <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-muted">{activePlatform?.label} only</span>
                )}
              </div>
              <span className={`font-mono text-[11px] ${overBy > 0 ? 'text-danger' : 'text-muted'}`}>
                {content.length} / {limit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
