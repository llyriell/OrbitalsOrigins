import { useOrbitals } from './OrbitalsContext';
import { ORBIT_FIELD, ORBIT_POSITIONS } from './orbitalsData';
import Bloom from './Bloom';

export default function ConstellationField() {
  const { openPath, collapse } = useOrbitals();
  const anyOpen = openPath.length > 0;

  return (
    <div
      className="relative w-full h-full"
      onClick={() => {
        if (anyOpen) collapse();
      }}
    >
      {/* ambient starfield */}
      <div className="absolute inset-0 pointer-events-none orbit-starfield" />

      {/* slowly rotating constellation layer */}
      <div className="absolute inset-0 orbit-rotate-layer">
        {ORBIT_FIELD.map((node, i) => {
          const pos = ORBIT_POSITIONS[node.id];
          if (!pos) return null;
          const driftClass = `orbit-drift-${i % 4}`;
          return (
            <div
              key={node.id}
              className={`absolute ${driftClass}`}
              style={{
                left: `${pos.x * 50 + 50}%`,
                top: `${pos.y * 50 + 50}%`,
                transform: 'translate(-50%, -50%)',
                transition: 'opacity 0.7s ease',
                opacity: anyOpen && !openPath.includes(node.id) ? 0.32 : 1,
              }}
            >
              <Bloom node={node} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
