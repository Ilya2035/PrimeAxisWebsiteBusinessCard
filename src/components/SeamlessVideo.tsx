import React, { useEffect, useRef } from 'react';

/**
 * Plays a video on loop with an invisible loop point: a short crossfade
 * happens ONLY at the end → beginning seam, never in the middle.
 *
 * Implementation: two video elements share the same source. One is active
 * (full opacity, playing). When the active video reaches its last `fade`
 * seconds, the standby video starts from 0 and the two crossfade. Once
 * the swap completes, the previously-active video is paused and reset.
 */
export function SeamlessVideo({
  src,
  className = '',
  fadeSeconds = 1.0,
}: {
  src: string;
  className?: string;
  fadeSeconds?: number;
}) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    // Disable native looping — we drive the seam manually.
    a.loop = false;
    b.loop = false;
    b.pause();
    b.currentTime = 0;
    b.style.opacity = '0';
    a.style.opacity = '1';
    a.play().catch(() => {});

    let active = a;
    let standby = b;

    const tick = () => {
      const d = active.duration;
      if (d && isFinite(d)) {
        const fade = Math.min(fadeSeconds, d / 3);
        const remaining = d - active.currentTime;

        if (remaining <= fade) {
          // Enter the crossfade window.
          if (standby.paused) {
            standby.currentTime = 0;
            standby.play().catch(() => {});
          }
          const k = Math.min(1, 1 - remaining / fade);
          active.style.opacity = String(1 - k);
          standby.style.opacity = String(k);

          if (active.currentTime >= d - 0.05 || k >= 1) {
            // Swap roles: previously-active becomes standby, reset for next cycle.
            active.pause();
            active.currentTime = 0;
            active.style.opacity = '0';
            standby.style.opacity = '1';
            const tmp = active;
            active = standby;
            standby = tmp;
          }
        } else {
          active.style.opacity = '1';
          standby.style.opacity = '0';
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [fadeSeconds, src]);

  const common =
    'absolute inset-0 w-full h-full object-cover pointer-events-none transition-none';

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <video ref={aRef} className={common} src={src} muted playsInline preload="auto" />
      <video ref={bRef} className={common} src={src} muted playsInline preload="auto" style={{ opacity: 0 }} />
    </div>
  );
}
