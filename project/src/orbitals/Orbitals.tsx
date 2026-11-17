import { useRef, useEffect } from 'react';
import { OrbitalsProvider } from './OrbitalsContext';
import { ORBIT_FIELD } from './orbitalsData';
import ConstellationField from './ConstellationField';

export default function Orbitals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const loop = (t: number) => {
      if (start === null) start = t;
      const elapsed = t - start;
      const deg = (elapsed / 240000) * 360;
      if (containerRef.current) {
        containerRef.current.style.setProperty('--orbit-angle', `${deg}deg`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <OrbitalsProvider data={ORBIT_FIELD}>
      <div
        ref={containerRef}
        className="relative w-screen h-screen overflow-hidden bg-[#05070d]"
        style={{ '--orbit-angle': '0deg' } as React.CSSProperties}
      >
        {/* deep atmospheric gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 45%, rgba(20,40,70,0.55) 0%, rgba(8,12,22,0.2) 45%, rgba(5,7,13,0) 75%)',
          }}
        />
        {/* subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)',
          }}
        />
        <ConstellationField />
        {/* restrained title */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none select-none">
          <p
            className="text-[10px] font-light tracking-[0.5em] uppercase text-slate-400/50"
            style={{ textShadow: '0 0 12px rgba(120,180,240,0.2)' }}
          >
            Orbitals
          </p>
        </div>
      </div>
    </OrbitalsProvider>
  );
}
