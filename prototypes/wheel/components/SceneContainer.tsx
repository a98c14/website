import { OrthographicCamera, Plane } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const SceneContainer: React.FC = () => {
    const planeRef = useRef<THREE.Mesh>(null);
    useFrame(() => {
        if (!planeRef.current) return;
        planeRef.current.rotateX(30);
    });
    return (
        <Canvas
            mode="concurrent"
            style={{
                position: "absolute",
                top: 0,
            }}
            dpr={Math.max(window.devicePixelRatio, 2)}
            linear={true}
            flat={true}
        >
            <OrthographicCamera position={[0, 0, 5]} zoom={80} />
            <Plane ref={planeRef} position={[0, 0, 0]}>
                <meshBasicMaterial color={"hotpink"} />
            </Plane>
            {/* <Suspense fallback={null}></Suspense> */}
        </Canvas>
    );
};

export default SceneContainer;
