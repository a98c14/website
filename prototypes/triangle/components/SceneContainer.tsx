import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Scene from "./Scene";

const SceneContainer: React.FC = () => {
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
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
        </Canvas>
    );
};

export default SceneContainer;
