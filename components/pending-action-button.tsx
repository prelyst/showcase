'use client';

import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

export function PendingActionButton({
  idle,
  pending,
  className,
  pendingClassName,
  idleClassName,
  disabled,
  type = 'submit',
  actionId,
  formAction,
}: {
  idle: ReactNode;
  pending: ReactNode;
  className: string;
  pendingClassName?: string;
  idleClassName?: string;
  disabled?: boolean;
  type?: 'submit' | 'button';
  actionId?: string;
  formAction?: (formData: FormData) => void | Promise<void>;
}) {
  const { pending: isPending, data } = useFormStatus();
  const activeAction = typeof data?.get === 'function' ? data.get('__action') : null;
  const isActiveAction = isPending && actionId && activeAction === actionId;
  const isDisabled = disabled || isPending;

  return (
    <button
      type={type}
      formAction={formAction}
      disabled={isDisabled}
      name={actionId ? '__action' : undefined}
      value={actionId}
      className={`${className} ${isActiveAction ? pendingClassName ?? '' : idleClassName ?? ''} disabled:cursor-not-allowed disabled:opacity-70`}
    >
      <span className="inline-flex items-center gap-2">
        {isActiveAction ? <span className="h-[14px] w-[14px] animate-spin rounded-full border border-current border-t-transparent" /> : null}
        <span>{isActiveAction ? pending : idle}</span>
      </span>
    </button>
  );
}
