import { useOrbitals } from './OrbitalsContext';
import { OrbitNodeData } from './orbitalsData';
import OrbitNode from './OrbitNode';

interface PetalProps {
  node: OrbitNodeData;
  depth: number;
  index: number;
  total: number;
  radius: number;
  size: number;
  parentOpen: boolean;
}

export default function Petal({
  node,
  depth,
  index,
  total,
  radius,
  size,
  parentOpen,
}: PetalProps) {
  const { openPath, openPathSet, setOpenPath, isCompleted, toggleComplete, childrenOf } = useOrbitals();
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const childNodes = childrenOf(node.id) || [];
  const hasChildren = childNodes.length > 0;
  const isOpen = openPathSet.has(node.id);
  const completed = isCompleted(node.id);
  const myPath = [...openPath.slice(0, depth), node.id];
  const lit = parentOpen;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasChildren) {
      toggleComplete(node.id);
      return;
    }
    setOpenPath(isOpen ? openPath.slice(0, depth) : myPath);
  };

  return (
    <div
      className={`absolute ${lit ? 'petal-lit' : 'petal-dormant'}`}
      style={{
        left: Math.cos(angle) * radius,
        top: Math.sin(angle) * radius,
        transform: 'translate(-50%, -50%)',
        opacity: lit ? 1 : 0.32,
        transition: 'opacity 0.7s ease',
      }}
    >
      <span
        className={`orbit-branch-wrap absolute pointer-events-none ${lit ? 'orbit-branch-open' : ''}`}
        style={{
          left: '50%',
          top: '50%',
          width: radius,
          height: 1,
          transformOrigin: '100% 0',
          transform: `rotate(${angle + Math.PI}rad)`,
          opacity: lit ? 0.6 : 0.14,
        }}
      >
        <span
          className="orbit-branch-inner block h-full w-full"
          style={{ background: 'linear-gradient(to right, rgba(150,200,240,0.38), rgba(150,200,240,0))' }}
        />
      </span>
      <OrbitNode
        label={node.label}
        size={size}
        active={isOpen}
        dormant={!lit}
        completed={completed}
        onClick={handleClick}
      />
      {isOpen && hasChildren && (
        <div className="absolute left-0 top-0">
          {childNodes.map((child, i) => (
            <Petal
              key={child.id}
              node={child}
              depth={depth + 1}
              index={i}
              total={childNodes.length}
              radius={radius * 0.62}
              size={Math.max(size * 0.62, 5)}
              parentOpen={isOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}
