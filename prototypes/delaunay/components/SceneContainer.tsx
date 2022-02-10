import { useMouse } from "@core/controls/hooks/useMouse";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { useDelaunayStore } from "../store";
import shallow from "zustand/shallow";
import Scene from "./Scene";

const SceneContainer: React.FC = () => {
    const { addPoint, cameraRef, canvasRef } = useDelaunayStore(
        (state) => ({ addPoint: state.addPoint, cameraRef: state.cameraRef, canvasRef: state.canvasRef }),
        shallow
    );
    useMouse(useDelaunayStore, (v) => {
        addPoint(v);
        console.log(v);
    });

    return (
        <Canvas
            ref={canvasRef}
            mode="concurrent"
            style={{
                position: "absolute",
                top: 0,
            }}
            dpr={Math.max(window.devicePixelRatio, 2)}
            linear={true}
            flat={true}
        >
            <OrbitControls enableRotate={false} />
            <OrthographicCamera ref={cameraRef} makeDefault near={0.5} far={1000} zoom={100} position={[0, 0, 8]} />
            <Scene />
        </Canvas>
    );
};

export default SceneContainer;
