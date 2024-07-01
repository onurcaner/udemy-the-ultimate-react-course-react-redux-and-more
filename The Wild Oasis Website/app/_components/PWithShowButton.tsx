'use client';

import { useState } from 'react';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

import { Button } from './Button';

type PWithShowButtonProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export function PWithShowButton({ children, ...rest }: PWithShowButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = (): void => {
    setIsExpanded((e) => !e);
  };

  return (
    <p {...rest}>
      <span
        className={twJoin(
          'inline-block overflow-hidden',
          isExpanded && 'h-auto',
          !isExpanded && 'h-20',
        )}
      >
        {children}
      </span>

      <Button $variant="underline" onClick={toggleIsExpanded}>
        {isExpanded ? 'Show less' : 'Show more'}
      </Button>
    </p>
  );
}
