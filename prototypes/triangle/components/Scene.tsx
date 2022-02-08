import { Circle, OrbitControls, OrthographicCamera, Plane, Stats } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import React, { Suspense, useLayoutEffect, useRef, useState } from "react";
import { useControls } from "leva";
import * as THREE from "three";
import { dist, Vec2 } from "@core/math/vector";
import { circumcircle, findCircumcenter } from "@core/math/triangle";

type TriangleProps = {
    p1: Vec2;
    p2: Vec2;
    p3: Vec2;
};
const Triangle: React.FC<TriangleProps> = ({ p1, p2, p3 }) => {
    const triRef = useRef<THREE.BufferGeometry>(null);
    const circleRef = useRef<THREE.BufferGeometry>(null);

    useLayoutEffect(() => {
        let points = [];
        points.push(new THREE.Vector3(p1.x, p1.y, 0));
        points.push(new THREE.Vector3(p2.x, p2.y, 0));
        points.push(new THREE.Vector3(p3.x, p3.y, 0));
        points.push(new THREE.Vector3(p1.x, p1.y, 0));
        triRef.current!.setFromPoints(points);
        points = [];
        const c = circumcircle({ v: [p1, p2, p3] });
        const r = c.r;
        const a = { x: 0, y: r };
        const cos = Math.cos(-(2 * Math.PI) / 64);
        const sin = Math.sin((2 * Math.PI) / 64);
        // Loop 65 times to prevent leaving the last segment disconnected
        for (let i = 0; i < 65; i++) {
            const prev = { x: a.x, y: a.y };
            a.x = prev.x * cos - sin * prev.y;
            a.y = prev.x * sin + cos * prev.y;
            const p = new THREE.Vector3(c.x + a.x, c.y + a.y, 0);
            points.push(p);
        }
        circleRef.current!.setFromPoints(points);
    }, [p1, p2, p3]);

    return (
        <>
            <line>
                <bufferGeometry ref={triRef} attach="geometry" />
                <lineBasicMaterial color={"hotpink"} />
            </line>
            <line>
                <bufferGeometry ref={circleRef} attach="geometry" />
                <lineBasicMaterial color={"white"} />
            </line>
        </>
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
