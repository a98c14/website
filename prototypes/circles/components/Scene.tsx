import { OrthographicCamera } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import { useControls } from "leva";
import * as THREE from "three";
import { Circle, intersectionCircleCircle } from "core/math/circle";

type CircleProps = MeshProps;
const Circle2D: React.FC<CircleProps> = (props) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_, dt) => {
        if (!ref.current) return;
        ref.current.rotateZ((Math.PI / 2) * dt);
    });

    return (
        <mesh ref={ref} {...props}>
            <circleGeometry args={[1, 64]} />
            <meshBasicMaterial color={"hotpink"} wireframe />
        </mesh>
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
    const { r1, r2, p1, p2 } = useControls({
        r1: 1,
        r2: 1,
        p1: { value: { x: -0.6, y: 0 }, step: 0.01, joystick: "invertY" },
        p2: { value: { x: 0.6, y: 0 }, step: 0.01, joystick: "invertY" },
    });
    const c1: Circle = {
        center: p1,
        r: r1,
    };

    const c2: Circle = {
        center: p2,
        r: r2,
    };
    const [isIntersecting, i1, i2] = intersectionCircleCircle(c1, c2);
    return (
        <Suspense fallback={null}>
            <OrthographicCamera position={[0, 0, 8]} />
            <Circle2D position={[c1.center.x, c1.center.y, 0]} scale={[c1.r, c1.r, 1]} />
            <Circle2D position={[c2.center.x, c2.center.y, 0]} scale={[c2.r, c2.r, 1]} />
            {isIntersecting && (
                <>
                    <Box position={[i1.x, i1.y, 0]} scale={[0.05, 0.05, 1]} />
                    <Box position={[i2.x, i2.y, 0]} scale={[0.05, 0.05, 1]} />
                </>
            )}
        </Suspense>
    );
};

export default Scene;
