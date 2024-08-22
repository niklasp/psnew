"use client";

import { useState, cloneElement, ReactElement } from "react";
import { cn } from "../../lib/utils";

export function PointerTrackingSection({
  children,
  scene,
  className
}: {
  children: React.ReactNode;
  scene: ReactElement;
  className?: string;
}) {
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setPointerPos({ x, y });
  };

  return (
    <section
      className={cn("relative isolate", className)}
      onPointerMove={handlePointerMove}
    >
      {children}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        {cloneElement(scene, { pointerPos })}
      </div>
    </section>
  );
}
