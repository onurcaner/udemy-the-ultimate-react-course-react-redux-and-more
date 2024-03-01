import { useState, CSSProperties, MouseEventHandler } from 'react';

import { createBemClassName } from '../utils/createBemClassName';

export interface StarRatingProps {
  onRate: (newRating: number) => void;
  initialRating?: number;
  maxRating?: number;
  hasText?: boolean;
  messages?: string[];
  className?: string;
  size?: CSSProperties['fontSize'];
  color?: CSSProperties['color'];
}

export function StarRating({
  onRate,
  initialRating = 0,
  maxRating = 5,
  hasText = true,
  messages = [],
  className = undefined,
  size = '1rem',
  color = '#fcc419',
}: StarRatingProps): JSX.Element {
  const [rating, setRating] = useState(initialRating);
  const [temporaryRating, setTemporaryRating] = useState(0);

  const displayedRating = temporaryRating || rating;

  const handleClickToStar = (newRating: number): void => {
    setRating(newRating);
    onRate(newRating);
  };

  const handleMouseEnterToStar = (newTemporaryRating: number): void => {
    setTemporaryRating(newTemporaryRating);
  };

  const handleMouseLeaveFromStar = (): void => {
    setTemporaryRating(0);
  };

  const componentContainerStyle: CSSProperties = {
    fontSize: size,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5em',
  };

  const starContainerStyle: CSSProperties = {
    display: 'flex',
  };

  const ratingStyle: CSSProperties = {
    color,
    fontSize: '1em',
    lineHeight: '1',
    margin: '0',
  };

  return (
    <div
      className={createBemClassName(className)}
      style={componentContainerStyle}
    >
      <div
        className={createBemClassName(className, 'stars')}
        style={starContainerStyle}
        aria-label={rating ? `Rated ${rating}` : 'Rated zero or not rated'}
      >
        {Array.from({ length: maxRating })
          .map((_, i) => i + 1)
          .map((starRating) => (
            <Star
              itsRating={starRating}
              key={starRating}
              isFilled={displayedRating >= starRating}
              onClick={handleClickToStar}
              onMouseEnter={handleMouseEnterToStar}
              onMouseLeave={handleMouseLeaveFromStar}
              className={createBemClassName(className, 'star')}
              size={size}
              color={color}
            />
          ))}
      </div>
      {hasText && (
        <p
          className={createBemClassName(className, 'text')}
          style={ratingStyle}
        >
          {messages[displayedRating] ?? (displayedRating || <>&nbsp;</>)}
        </p>
      )}
    </div>
  );
}

interface StarProps {
  isFilled?: boolean;
  itsRating: number;
  onClick: (newRating: number) => void;
  onMouseEnter: (newTemporaryRating: number) => void;
  onMouseLeave: () => void;
  className?: string;
  size: CSSProperties['fontSize'];
  color: CSSProperties['color'];
}

function Star({
  isFilled = false,
  itsRating,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  color,
}: StarProps): JSX.Element {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    onClick(itsRating);
  };

  const handleMouseEnter: MouseEventHandler<HTMLButtonElement> = () => {
    onMouseEnter(itsRating);
  };

  const handleMouseLeave: MouseEventHandler<HTMLButtonElement> = () => {
    onMouseLeave();
  };

  const starStyle: CSSProperties = {
    fontSize: size,
    display: 'block',
    height: '2em',
    aspectRatio: '1',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={starStyle}
      className={className}
      aria-label={`Rate ${itsRating}`}
    >
      {isFilled && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {!isFilled && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </button>
  );
}

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>

*/
