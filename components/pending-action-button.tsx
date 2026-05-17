'use client';

import { ReactNode, useEffect, useState } from 'react';
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
  const { pending: isPending } = useFormStatus();
  const [clickedAction, setClickedAction] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending) {
      setClickedAction(null);
    }
  }, [isPending]);

  const isActiveAction = isPending && (!actionId || clickedAction === actionId);
  const isDisabled = disabled || isPending;

  return (
    <button
      type={type}
      formAction={formAction}
      disabled={isDisabled}
      name={actionId ? '__action' : undefined}
      value={actionId}
      onClick={() => setClickedAction(actionId ?? '__default__')}
      className={`${className} ${isActiveAction ? pendingClassName ?? '' : idleClassName ?? ''} disabled:cursor-not-allowed disabled:opacity-70`}
    >
      <span className="inline-flex items-center gap-2">
        {isActiveAction ? <span className="h-[14px] w-[14px] animate-spin rounded-full border border-current border-t-transparent" /> : null}
        <span>{isActiveAction ? pending : idle}</span>
      </span>
    </button>
  );
}
