import { OrbitNodeData } from './orbitalsData';
import Harmonograph from './Harmonograph';

interface OrbitNodeProps {
  label: string;
  size?: number;
  dim?: boolean;
  active?: boolean;
  dormant?: boolean;
  completed?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function OrbitNode({
  label,
  size = 7,
  dim = false,
  active = false,
  dormant = false,
  completed = false,
  onClick,
  className = '',
  style,
}: OrbitNodeProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`orbit-node group relative flex items-center justify-center rounded-full ${className}`}
      style={{
        width: Math.max(size * 5, 36),
        height: Math.max(size * 5, 36),
        opacity: dim ? 0.18 : 1,
        ...style,
      }}
    >
      <span className="orbit-node-hit-area absolute inset-0 rounded-full" />
      <Harmonograph
        size={active ? size * 3.5 : size * 2.4}
        active={active}
        dormant={dormant}
        completed={completed}
      />
      {active && (
        <span
          className="orbit-node-label orbit-upright pointer-events-none absolute whitespace-nowrap text-[10px] font-light tracking-[0.22em] uppercase"
          style={{
            top: Math.max(size * 2.5, 16),
            left: '50%',
            color: 'rgba(226,244,255,0.92)',
            textShadow: '0 0 14px rgba(120,180,240,0.55)',
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
}

export type { OrbitNodeProps, OrbitNodeData };
