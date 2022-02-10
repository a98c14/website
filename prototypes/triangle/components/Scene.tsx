import { Plane, Stats } from "@react-three/drei";
import React, { Suspense, useLayoutEffect, useRef } from "react";
import { useControls } from "leva";
import * as THREE from "three";
import { Vec2 } from "@core/math/vector";
import { circumcircle, isPointInCircumcircle } from "@core/math/triangle";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../store";

type TriangleProps = {
    p1: Vec2;
    p2: Vec2;
    p3: Vec2;
};
const Triangle: React.FC<TriangleProps> = ({ p1, p2, p3 }) => {
    const cameraRef = useStore((state) => state.cameraRef);
    const triRef = useRef<THREE.BufferGeometry>(null);
    const circleRef = useRef<THREE.BufferGeometry>(null);
    const planeRef = useRef<THREE.Mesh>(null);
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

    useFrame(() => {
        var mouse = useStore.getState().mouseState;
        planeRef.current?.position.set(mouse.world.x, mouse.world.y, 0);
        const zoom = cameraRef.current?.zoom ?? 10;
        const scale = 10 / zoom;
        planeRef.current?.scale.set(scale, scale, scale);
        const material: any = planeRef.current?.material;
        const isInCircle = isPointInCircumcircle(mouse.world, { v: [p1, p2, p3] });
        if (isInCircle) material.color.set("red");
        else material.color.set("white");
    });

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
            <Plane ref={planeRef} />
        </>
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
            <Triangle p1={p1} p2={p2} p3={p3} />
            <Stats />
        </Suspense>
    );
};

export default Scene;
