import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";
import { useStore } from "@prototypes/triangle/store";
import Scene from "./Scene";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { getNormalizedPosition, projectScreenToWorld } from "@core/graphics/camera";

function onMouseMove(e: MouseEvent) {
    const canvasRef = useStore.getState().canvasRef;
    const cameraRef = useStore.getState().cameraRef;
    if (!canvasRef || !canvasRef.current || !cameraRef || !cameraRef.current) return;
    const mouseState = useStore.getState().mouseState;
    const rect = canvasRef.current.getBoundingClientRect();
    const v = getNormalizedPosition(e.clientX, e.clientY, rect!);
    const r = projectScreenToWorld(v, cameraRef.current);
    mouseState.normalized = v;
    mouseState.world = r;
}

const SceneContainer: React.FC = () => {
    const { cameraRef, canvasRef } = useStore((state) => ({ cameraRef: state.cameraRef, canvasRef: state.canvasRef }));
    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
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
