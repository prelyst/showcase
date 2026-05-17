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
}: {
  idle: ReactNode;
  pending: ReactNode;
  className: string;
  pendingClassName?: string;
  idleClassName?: string;
  disabled?: boolean;
  type?: 'submit' | 'button';
}) {
  const { pending: isPending } = useFormStatus();

  return (
    <button
      type={type}
      disabled={disabled || isPending}
      className={`${className} ${isPending ? pendingClassName ?? '' : idleClassName ?? ''} disabled:cursor-not-allowed disabled:opacity-70`}
    >
      <span className="inline-flex items-center gap-2">
        {isPending ? <span className="h-[14px] w-[14px] animate-spin rounded-full border border-current border-t-transparent" /> : null}
        <span>{isPending ? pending : idle}</span>
      </span>
    </button>
  );
}
