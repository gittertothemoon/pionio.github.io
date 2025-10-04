import React from 'react';
import { cn } from '../../../utils/cn';

// Central icon registry: stroke-based, consistent 24x24 viewport for cohesive styling.
// Add new icons by extending the map; keep strokeLinecap/Linejoin round for brand softness.

type IconName =
  | 'palette'
  | 'target'
  | 'bolt'
  | 'bulb'
  | 'chart'
  | 'clock'
  | 'phone'
  | 'mail'
  | 'chat'
  | 'location'
  | 'check-circle'
  | 'rocket'
  | 'chevron-left'
  | 'chevron-right'
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'x';

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number;
  weight?: number; // stroke width override
  className?: string;
  label?: string; // accessible label if not purely decorative
  decorative?: boolean; // if true => aria-hidden
}

const paths: Record<IconName, React.ReactNode> = {
  palette: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="10" r="1" />
      <circle cx="15" cy="10" r="1" />
      <circle cx="9" cy="14" r="1" />
      <path d="M15 13.75a1.75 1.75 0 0 1 0 3.5h-1.1" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  bolt: (
    <path d="M11 3 5 14h6l-1 7 6-11h-6l1-7Z" />
  ),
  bulb: (
    <>
      <path d="M12 3a6 6 0 0 0-3 11.24V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.76A6 6 0 0 0 12 3Z" />
      <path d="M9 21h6" />
    </>
  ),
  chart: (
    <>
      <path d="M3 21h18" />
      <rect x="5" y="10" width="3" height="7" rx="1" />
      <rect x="11" y="6" width="3" height="11" rx="1" />
      <rect x="17" y="13" width="3" height="4" rx="1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  phone: (
    <>
      <path d="M6 3h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 4 5a2 2 0 0 1 2-2Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  chat: (
    <>
      <path d="M7 18 4 20v-3.5" />
      <rect x="4" y="4" width="16" height="12" rx="3" />
      <path d="M8 10h8M8 7h5" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.5" />
    </>
  ),
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5 11 15l4.5-5.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2c2.8 1.4 5.5 4.7 5.5 8.2 0 2.3-.9 4.4-2.5 6.1l-.6.7-2.4-1.2-2.4 1.2-.6-.7A8.6 8.6 0 0 1 6.5 10.2C6.5 6.7 9.2 3.4 12 2Z" />
      <path d="M10 22c0-1 .4-2 1.2-2.8.3-.3.8-.3 1.1 0 .8.8 1.2 1.8 1.2 2.8" />
    </>
  ),
  'chevron-left': <path d="m14 6-6 6 6 6" />,
  'chevron-right': <path d="m10 6 6 6-6 6" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="16.5" cy="7.5" r="1" />
    </>
  ),
  tiktok: (
    <>
      <path d="M13 5v7.4a2.6 2.6 0 1 1-2-2.5" />
      <path d="M13 7.2c.5 1.4 1.8 2.3 3.2 2.4" />
    </>
  ),
  linkedin: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 11v5M8 8v.01M12 16v-3.2a1.8 1.8 0 0 1 3.6 0V16" />
    </>
  ),
  x: (
    <>
      <path d="m7 7 10 10M7 17 17 7" />
    </>
  )
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  weight = 1.6,
  className,
  decorative = true,
  label,
  ...rest
}) => {
  const ariaProps = decorative
    ? { 'aria-hidden': true }
    : { role: 'img', 'aria-label': label || name };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
  strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('inline-block align-middle text-brand-400', className)}
      {...ariaProps}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
};
