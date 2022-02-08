import { OrbitControls, OrthographicCamera, Stats } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import React, { Suspense, useLayoutEffect, useRef, useState } from "react";
import { useControls } from "leva";
import * as THREE from "three";
import { Vec2 } from "@core/math/vector";

type TriangleProps = {
    p1: Vec2;
    p2: Vec2;
    p3: Vec2;
};
const Triangle: React.FC<TriangleProps> = ({ p1, p2, p3 }) => {
    const geomRef = useRef<THREE.BufferGeometry>(null);
    
    useLayoutEffect(() => {
        const points = [];
        points.push(new THREE.Vector3(p1.x, p1.y, 0));
        points.push(new THREE.Vector3(p2.x, p2.y, 0));
        points.push(new THREE.Vector3(p3.x, p3.y, 0));
        geomRef.current!.setFromPoints(points);
    }, [p1, p2, p3]);
    return (
        <line>
            <bufferGeometry ref={geomRef} attach="geometry" />
            <meshBasicMaterial color={"hotpink"} wireframe />
        </line>
    );
};

type BoxProps = MeshProps;
const Box: React.FC<BoxProps> = (props) => {
    return (
        <mesh {...props}>
            <planeGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={"red"} />
        </mesh>
    );
};

const Scene: React.FC = () => {
    const { p1, p2, p3 } = useControls({
        p1: { value: { x: -0.6, y: 0 }, step: 0.01, joystick: "invertY" },
        p2: { value: { x: 0.6, y: 0 }, step: 0.01, joystick: "invertY" },
        p3: { value: { x: 0, y: 0.6 }, step: 0.01, joystick: "invertY" },
    });

    return (
        <Suspense fallback={null}>
            <OrbitControls enableRotate={false} />
            <OrthographicCamera position={[0, 0, 8]} />
            <Triangle p1={p1} p2={p2} p3={p3} />
            <Stats />
        </Suspense>
    );
};

export default Scene;
