import { useOrbitals } from './OrbitalsContext';
import { OrbitNodeData } from './orbitalsData';
import Petal from './Petal';
import Harmonograph from './Harmonograph';

interface BloomProps {
  node: OrbitNodeData;
}

export default function Bloom({ node }: BloomProps) {
  const { openPathSet, isCompleted, childrenOf, collapse, setOpenPath } = useOrbitals();
  const isOpen = openPathSet.has(node.id);
  const children = childrenOf(node.id) || [];
  const radius = 108;
  const completedCount = children.filter((child) => isCompleted(child.id)).length;
  const calm = children.length > 0 ? completedCount / children.length : 0;
  const symbolSize = 24 - calm * 7;

  const handleCenterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpen) collapse();
    else setOpenPath([node.id]);
  };

  return (
    <div className="relative h-0 w-0">
      {children.map((child, i) => (
        <Petal
          key={child.id}
          node={child}
          depth={1}
          index={i}
          total={children.length}
          radius={radius}
          size={7}
          parentOpen={isOpen}
        />
      ))}

      <button
        type="button"
        aria-label={node.label}
        onClick={handleCenterClick}
        className="orbit-bloom-center absolute left-0 top-0 z-10 flex items-center justify-center rounded-full"
      >
        <span className="orbit-bloom-hit-area absolute -inset-6 rounded-full" />
        <Harmonograph size={isOpen ? symbolSize * 3.4 : symbolSize} active={isOpen} />
        <span
          className="orbit-center-label orbit-upright pointer-events-none absolute whitespace-nowrap text-[11px] font-light tracking-[0.28em] uppercase"
          style={{
            top: symbolSize + 18,
            left: '50%',
            color: isOpen ? 'rgba(226,244,255,0.95)' : 'rgba(190,210,235,0.7)',
            textShadow: isOpen ? '0 0 16px rgba(120,180,240,0.6)' : 'none',
          }}
        >
          {node.label}
        </span>
      </button>
    </div>
  );
}
