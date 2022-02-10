import React, { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import { useStore } from "@prototypes/triangle/store";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";

import { useMouse } from "@core/controls/hooks/useMouse";
import Scene from "./Scene";

const SceneContainer: React.FC = () => {
    const { cameraRef, canvasRef } = useStore((state) => ({ cameraRef: state.cameraRef, canvasRef: state.canvasRef }));
    useMouse(useStore);

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
            ref={canvasRef}
        >
            <Suspense fallback={null}>
                <OrbitControls enableRotate={false} />
                <OrthographicCamera makeDefault ref={cameraRef} near={0.5} far={1000} zoom={100} position={[0, 0, 8]} />
                <Scene />
            </Suspense>
        </Canvas>
    );
};

export default SceneContainer;
