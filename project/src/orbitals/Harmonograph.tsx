interface HarmonographProps {
  size: number;
  active?: boolean;
  dormant?: boolean;
  completed?: boolean;
}

export default function Harmonograph({
  size,
  active = false,
  dormant = false,
  completed = false,
}: HarmonographProps) {
  const opacity = dormant ? 0.45 : completed ? 0.34 : 1;
  const stroke = active ? 'rgba(206,232,255,0.92)' : 'rgba(178,211,240,0.72)';
  const accent = active ? 'rgba(226,244,255,0.98)' : 'rgba(178,211,240,0.58)';

  return (
    <svg
      aria-hidden="true"
      className={`harmonograph ${active ? 'harmonograph-active' : ''}`}
      viewBox="0 0 64 64"
      style={{ width: size, height: size, opacity }}
    >
      {/* expanding pulse rings — these become the aura when active */}
      <circle className="harmonograph-pulse-ring harmonograph-pulse-1" cx="32" cy="32" r="22" fill="none" stroke={stroke} strokeWidth="0.8" />
      <circle className="harmonograph-pulse-ring harmonograph-pulse-2" cx="32" cy="32" r="22" fill="none" stroke={stroke} strokeWidth="0.6" />
      <circle className="harmonograph-pulse-ring harmonograph-pulse-3" cx="32" cy="32" r="22" fill="none" stroke={stroke} strokeWidth="0.5" />

      {/* rotating geometric rings */}
      <circle className="harmonograph-ring harmonograph-ring-a" cx="32" cy="32" r="22" fill="none" stroke={stroke} strokeWidth="0.8" />
      <circle className="harmonograph-ring harmonograph-ring-b" cx="32" cy="32" r="15" fill="none" stroke={stroke} strokeWidth="0.7" strokeDasharray="1 3" />

      {/* flower petals */}
      <path
        d="M32 7 C43 19 55 21 57 32 C55 43 43 45 32 57 C21 45 9 43 7 32 C9 21 21 19 32 7Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      <path
        d="M32 13 C40 24 40 24 51 32 C40 40 40 40 32 51 C24 40 24 40 13 32 C24 24 24 24 32 13Z"
        fill="none"
        stroke={stroke}
        strokeWidth="0.75"
      />
      <path d="M32 25 L39 32 L32 39 L25 32 Z" fill="none" stroke={accent} strokeWidth="1" />
      <circle cx="32" cy="32" r={active ? 2.4 : 1.8} fill={accent} />
    </svg>
  );
}
