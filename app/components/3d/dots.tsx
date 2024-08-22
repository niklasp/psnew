"use client";

import * as THREE from "three";
import {
  Canvas,
  ThreeElements,
  extend,
  useFrame,
  useThree
} from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import React, { useMemo, useRef, useState } from "react";
import { RenderPixelatedPass } from "three/addons/postprocessing/RenderPixelatedPass.js";

extend({ RenderPixelatedPass });

function createEllipseGeometry(
  width: number,
  height: number,
  segments: number = 32
) {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * width;
    const y = Math.sin(angle) * height;
    points.push(new THREE.Vector2(x, y));
  }
  return new THREE.LatheGeometry(points, segments);
}

function Ellipse(
  props: ThreeElements["mesh"] & { index: number; total: number; scale: number }
) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const pink = useMemo(() => new THREE.Color("#e6007a"), []);
  const purple = useMemo(() => new THREE.Color("#552BBF"), []);
  const cyan = useMemo(() => new THREE.Color("#00B2FF"), []);
  const lime = useMemo(() => new THREE.Color("#D3FF33"), []);
  const green = useMemo(() => new THREE.Color("#56F39A"), []);

  const toColors = [purple, cyan, green];

  const ellipseGeometry = useMemo(
    () => createEllipseGeometry(0.5 * props.scale, 1 * props.scale, 64),
    [props.scale]
  );

  useFrame(({ clock, viewport }) => {
    if (ref.current) {
      const angle =
        -clock.elapsedTime / 9.0 + (props.index / props.total) * Math.PI * 2;
      const radius = Math.min(viewport.width, viewport.height) / 2.5;

      ref.current.position.x = Math.cos(angle) * radius;
      ref.current.position.y = Math.sin(angle) * radius;
      ref.current.rotation.set(0, 0, angle);

      ref.current.scale.set(props.scale, props.scale, props.scale);
    }
  });

  return (
    <mesh
      {...props}
      ref={ref}
      geometry={ellipseGeometry}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      scale={[1, 1, 1]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={cyan} />
    </mesh>
  );
}

function Scene({ total = 6 }: { total?: number }) {
  const { viewport } = useThree();

  const scale = Math.min(1, viewport.width / 4.5);
  const radius = Math.min(viewport.width, viewport.height) / 2.5;
  const angleStep = (Math.PI * 2) / total;

  const dots = Array.from({ length: total }, (_, index) => {
    const angle = index * angleStep;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return (
      <Ellipse
        key={index}
        position={[x, y, 0]}
        index={index}
        total={total}
        scale={scale}
      />
    );
  });

  return <>{dots}</>;
}

function MovingLight({
  pointerPos = { x: 0, y: 0 },
  color,
  z = 2.2
}: {
  pointerPos?: { x: number; y: number };
  color: number;
  z?: number;
}) {
  const ref = useRef<THREE.PointLight>(null!);
  const { viewport, pointer } = useThree();

  useFrame(() => {
    if (ref.current) {
      const x = (pointerPos.x * viewport.width) / 2;
      const y = (pointerPos.y * viewport.height) / 1.2;

      ref.current.position.set(x, y, z);
    }
  });

  return <pointLight ref={ref} color={color} intensity={500} />;
}

export default function Dots({
  className,
  pointerPos = { x: 0, y: 0 }
}: {
  className?: string;
  pointerPos?: { x: number; y: number };
}) {
  const [totalDots, setTotalDots] = useState(6);

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 30 }}
        style={{ width: "90vw", height: "90vh", top: "5vh", left: "5vw" }}
        gl={{ antialias: true, outputColorSpace: "srgb" }}
        shadows
      >
        <Scene total={totalDots} />
        <ambientLight color={0xffffff} intensity={0.5} />
        <OrbitControls
          enableDamping={true}
          enableRotate={false}
          enablePan={true}
          enableZoom={false}
        />
        <MovingLight pointerPos={pointerPos} color={0xe6007a} />
        <Stats />
      </Canvas>
    </>
  );
}
