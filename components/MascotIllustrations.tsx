'use client';

import clsx from 'clsx';

interface MascotProps {
  className?: string;
}

export function LexMascot({ className }: MascotProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={clsx('mascot-shadow drop-shadow-lg', className)}
      role="img"
      aria-labelledby="lexTitle"
    >
      <title id="lexTitle">Лекс — сова-наставник</title>
      <defs>
        <linearGradient id="lexWing" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="160" height="160" rx="40" fill="#ecfdf5" />
      <g transform="translate(30 25)">
        <ellipse cx="50" cy="92" rx="40" ry="16" fill="#0f766e20" />
        <path d="M18 30c0-18 14-30 32-30s32 12 32 30v24c0 22-14 40-32 40s-32-18-32-40V30z" fill="url(#lexWing)" />
        <circle cx="36" cy="52" r="14" fill="#fefefe" />
        <circle cx="64" cy="52" r="14" fill="#fefefe" />
        <circle cx="36" cy="52" r="8" fill="#0f172a" />
        <circle cx="64" cy="52" r="8" fill="#0f172a" />
        <path d="M50 62l-10 10 10 4 10-4z" fill="#f97316" />
        <path d="M24 76c8 10 44 10 52 0" stroke="#0f172a20" strokeWidth="6" strokeLinecap="round" />
        <path d="M10 44c-6-4-10 2-8 6 4 8 12 16 24 20" stroke="#0f766e" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M106 44c6-4 10 2 8 6-4 8-12 16-24 20" stroke="#0f766e" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

export function TabletMuza({ className }: MascotProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={clsx('mascot-shadow drop-shadow-xl', className)}
      role="img"
      aria-labelledby="tabletMuza"
    >
      <title id="tabletMuza">Муза с планшетом</title>
      <defs>
        <linearGradient id="hood" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="160" height="160" rx="44" fill="#f3f4ff" />
      <g transform="translate(24 20)">
        <ellipse cx="56" cy="110" rx="44" ry="16" fill="#1d4ed820" />
        <path d="M16 44c0-24 18-44 40-44s40 20 40 44v26c0 22-18 40-40 40S16 92 16 70V44z" fill="url(#hood)" />
        <rect x="34" y="54" width="44" height="32" rx="6" fill="#0f172a" />
        <rect x="38" y="58" width="36" height="24" rx="3" fill="#111827" />
        <rect x="40" y="60" width="32" height="20" rx="2" fill="#1f2937" />
        <circle cx="44" cy="44" r="12" fill="#fde68a" />
        <circle cx="76" cy="44" r="12" fill="#fde68a" />
        <circle cx="44" cy="46" r="6" fill="#0f172a" />
        <circle cx="76" cy="46" r="6" fill="#0f172a" />
        <path d="M60 58l-8 10 8 4 8-4z" fill="#fb923c" />
        <path d="M22 82c10 12 52 12 62 0" stroke="#1d4ed8" strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function HoodieMuza({ className }: MascotProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={clsx('mascot-shadow drop-shadow-xl', className)}
      role="img"
      aria-labelledby="hoodieMuza"
    >
      <title id="hoodieMuza">Муза в красной худи</title>
      <defs>
        <linearGradient id="hoodie" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient id="sky" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="160" height="160" rx="46" fill="url(#sky)" />
      <g transform="translate(20 18)">
        <ellipse cx="60" cy="118" rx="46" ry="16" fill="#0f172a1a" />
        <path
          d="M12 52c0-28 20-52 48-52s48 24 48 52v18c0 30-20 54-48 54S12 100 12 70V52z"
          fill="url(#hoodie)"
        />
        <path d="M20 76c8 16 32 26 52 26 20 0 44-10 52-26" stroke="#fef2f2" strokeWidth="8" strokeLinecap="round" />
        <circle cx="44" cy="52" r="14" fill="#fde68a" />
        <circle cx="76" cy="52" r="14" fill="#fde68a" />
        <circle cx="44" cy="54" r="7" fill="#0f172a" />
        <circle cx="76" cy="54" r="7" fill="#0f172a" />
        <path d="M60 66l-10 10 10 4 10-4z" fill="#fb923c" />
        <path d="M28 90c12 10 52 10 64 0" stroke="#991b1b" strokeWidth="6" strokeLinecap="round" />
        <path d="M104 50c10 0 18 8 18 18" stroke="#fef2f2" strokeWidth="7" strokeLinecap="round" />
        <path d="M16 50c-10 0-18 8-18 18" stroke="#fef2f2" strokeWidth="7" strokeLinecap="round" />
        <path d="M88 92c8 10 16 22 18 32" stroke="#fef2f2" strokeWidth="6" strokeLinecap="round" />
        <path d="M32 92c-8 10-16 22-18 32" stroke="#fef2f2" strokeWidth="6" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function resolveMascot(key: 'lex' | 'tablet-cow' | 'hoodie-cow', className?: string) {
  if (key === 'lex') return <LexMascot className={className} />;
  if (key === 'tablet-cow') return <TabletMuza className={className} />;
  return <HoodieMuza className={className} />;
}
