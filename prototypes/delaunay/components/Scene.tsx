import { OrthographicCamera, Plane } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import * as THREE from "three";

const Scene: React.FC = () => {
    const planeRef = useRef<THREE.Mesh>(null);
    useFrame(() => {
        if (!planeRef.current) return;
        planeRef.current.rotateX(30);
    });
    return (
        <Suspense fallback={null}>
            <OrthographicCamera position={[0, 0, 5]} zoom={80} />
            <Plane ref={planeRef} position={[0, 0, 0]}>
                <meshBasicMaterial color={"hotpink"} />
            </Plane>
        </Suspense>
    );
};

export default Scene;
