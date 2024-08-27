"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { InstancedMesh, Vector3, Color, Matrix4 } from "three";

const Particles = ({
  count = 500,
  pointerPos,
  zOffset,
  offset = false
}: {
  count?: number;
  pointerPos: { x: number; y: number };
  zOffset: number;
  offset?: boolean;
}) => {
  const mesh = useRef<InstancedMesh>(null);

  const dummy = useMemo(() => new Vector3(), []);
  const matrix = useMemo(() => new Matrix4(), []);

  const colors = useMemo(
    () => [
      new Color("#e6007a") // pink
      // new Color("#00b2ff") // cyan
      //   new Color("#d3ff33"), // lime
      //   new Color("#56f39a") // green
    ],
    []
  );

  const particles = useMemo(() => {
    const temp = [];
    const gridSize = Math.ceil(Math.sqrt(count));
    const spacing = 50 / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (temp.length >= count) break;

        let x = (i / (gridSize - 1) - 0.5) * 50;
        let y = (j / (gridSize - 1) - 0.5) * 50;

        if (offset) {
          x += spacing / 2;
          y += spacing / 2;
        }

        const z = zOffset;
        const color = colors[Math.floor(Math.random() * colors.length)];

        const position = new Vector3(x, y, z);
        temp.push({ position, color, originalPosition: position.clone() });
      }
      if (temp.length >= count) break;
    }
    return temp;
  }, [count, zOffset, colors, offset]);

  useFrame(() => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      const { position, originalPosition, color } = particle;

      const parallaxFactor = 1 - zOffset / 10;
      const targetX = originalPosition.x + pointerPos.x * parallaxFactor;
      const targetY = originalPosition.y + pointerPos.y * parallaxFactor;

      position.x += (targetX - position.x) * 0.1;
      position.y += (targetY - position.y) * 0.1;
      position.z = zOffset;

      dummy.copy(position);
      matrix.setPosition(dummy);
      mesh.current?.setMatrixAt(i, matrix);
      mesh.current?.setColorAt(i, color);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.instanceColor!.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, particles.length]}>
      <ringGeometry args={[0.25, 0.3, 24]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
};

export function DotsBackground({
  pointerPos
}: {
  pointerPos: { x: number; y: number };
}) {
  return (
    <div className="absolute inset-0">
      <Canvas>
        <OrthographicCamera
          makeDefault
          position={[0, 0, 100]}
          zoom={30}
          near={0.1}
          far={1000}
        />
        <Particles count={300} pointerPos={pointerPos} zOffset={0} />
        <Particles
          count={300}
          pointerPos={pointerPos}
          zOffset={-5}
          offset={true}
        />
      </Canvas>
    </div>
  );
}
