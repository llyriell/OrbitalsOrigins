export interface OrbitNodeData {
  id: string;
  label: string;
  children?: OrbitNodeData[];
}

export interface OrbitPosition {
  x: number;
  y: number;
}

export const ORBIT_FIELD: OrbitNodeData[] = [
  {
    id: 'garden',
    label: 'Garden',
    children: [
      {
        id: 'water-peas',
        label: 'Water peas',
        children: [
          { id: 'wp-soak', label: 'Soak overnight' },
          { id: 'wp-rows', label: 'Space rows 30cm' },
          { id: 'wp-mulch', label: 'Lay straw mulch' },
        ],
      },
      {
        id: 'move-compost',
        label: 'Move compost',
        children: [
          { id: 'mc-turn', label: 'Turn pile' },
          { id: 'mc-sift', label: 'Sift finished' },
        ],
      },
      {
        id: 'lemon-tree',
        label: 'Lemon tree',
        children: [
          {
            id: 'build-trellis',
            label: 'Build trellis',
            children: [
              { id: 'buy-cedar', label: 'Buy cedar' },
              { id: 'sketch-joint', label: 'Sketch joint' },
              { id: 'cut-lumber', label: 'Cut lumber' },
              { id: 'assemble', label: 'Assemble' },
            ],
          },
          { id: 'lt-prune', label: 'Prune suckers' },
          { id: 'lt-water', label: 'Deep water' },
        ],
      },
      { id: 'butterfly-bush', label: 'Butterfly bush' },
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    children: [
      {
        id: 'pavilion',
        label: 'Pavilion',
        children: [
          { id: 'pv-footings', label: 'Pour footings' },
          { id: 'pv-frame', label: 'Raise frame' },
          { id: 'pv-roof', label: 'Set roof' },
        ],
      },
      { id: 'renderings', label: 'Renderings' },
      { id: 'materials', label: 'Materials palette' },
    ],
  },
  {
    id: 'evol',
    label: 'Evol',
    children: [
      {
        id: 'read',
        label: 'Reading',
        children: [
          { id: 'rd-bateson', label: 'Bateson ch.4' },
          { id: 'rd-alexander', label: 'Alexander notes' },
        ],
      },
      { id: 'practice', label: 'Daily practice' },
      { id: 'retreat', label: 'Plan retreat' },
    ],
  },
  {
    id: 'revenue',
    label: 'Revenue',
    children: [
      { id: 'invoices', label: 'Send invoices' },
      {
        id: 'product',
        label: 'Product launch',
        children: [
          { id: 'pl-landing', label: 'Landing page' },
          { id: 'pl-pricing', label: 'Pricing tiers' },
          { id: 'pl-announce', label: 'Announce' },
        ],
      },
      { id: 'retainers', label: 'Retainers' },
    ],
  },
  {
    id: 'home',
    label: 'Home',
    children: [
      { id: 'hm-paint', label: 'Paint trim' },
      { id: 'hm-shelves', label: 'Hang shelves' },
      { id: 'hm-garden', label: 'Sweep porch' },
    ],
  },
  {
    id: 'school',
    label: 'School',
    children: [
      {
        id: 'sc-thesis',
        label: 'Thesis',
        children: [
          { id: 'th-outline', label: 'Outline ch.2' },
          { id: 'th-draft', label: 'Draft intro' },
          { id: 'th-cite', label: 'Cite sources' },
        ],
      },
      { id: 'sc-review', label: 'Review notes' },
    ],
  },
  {
    id: 'vietnam',
    label: 'Vietnam',
    children: [
      { id: 'vn-visa', label: 'Visa' },
      { id: 'vn-route', label: 'Route plan' },
      { id: 'vn-pack', label: 'Pack list' },
    ],
  },
];

export const ORBIT_POSITIONS: Record<string, OrbitPosition> = {
  garden: { x: 0.12, y: -0.18 },
  architecture: { x: 0.34, y: 0.14 },
  evol: { x: -0.28, y: 0.06 },
  revenue: { x: -0.06, y: -0.34 },
  home: { x: 0.22, y: 0.36 },
  school: { x: -0.34, y: -0.22 },
  vietnam: { x: -0.16, y: 0.34 },
};
