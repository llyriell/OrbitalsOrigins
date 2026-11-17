import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { OrbitNodeData } from './orbitalsData';

interface OrbitalsContextValue {
  completed: Set<string>;
  toggleComplete: (id: string) => void;
  openPath: string[];
  openPathSet: Set<string>;
  setOpenPath: (path: string[]) => void;
  collapse: () => void;
  isCompleted: (id: string) => boolean;
  allNodes: Record<string, OrbitNodeData>;
  childrenOf: (id: string) => OrbitNodeData[] | undefined;
}

const OrbitalsContext = createContext<OrbitalsContextValue | null>(null);

export function useOrbitals() {
  const ctx = useContext(OrbitalsContext);
  if (!ctx) throw new Error('useOrbitals must be used within OrbitalsProvider');
  return ctx;
}

function indexNodes(nodes: OrbitNodeData[]): Record<string, OrbitNodeData> {
  const map: Record<string, OrbitNodeData> = {};
  const walk = (list: OrbitNodeData[]) => {
    for (const n of list) {
      map[n.id] = n;
      if (n.children) walk(n.children);
    }
  };
  walk(nodes);
  return map;
}

export function OrbitalsProvider({
  children,
  data,
}: {
  children: ReactNode;
  data: OrbitNodeData[];
}) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [openPath, setOpenPathState] = useState<string[]>([]);
  const [allNodes] = useState(() => indexNodes(data));

  const toggleComplete = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const setOpenPath = useCallback((path: string[]) => {
    setOpenPathState(path);
  }, []);

  const collapse = useCallback(() => setOpenPathState([]), []);

  const isCompleted = useCallback((id: string) => completed.has(id), [completed]);

  const childrenOf = useCallback(
    (id: string) => allNodes[id]?.children,
    [allNodes]
  );

  const openPathSet = new Set(openPath);

  return (
    <OrbitalsContext.Provider
      value={{
        completed,
        toggleComplete,
        openPath,
        openPathSet,
        setOpenPath,
        collapse,
        isCompleted,
        allNodes,
        childrenOf,
      }}
    >
      {children}
    </OrbitalsContext.Provider>
  );
}
