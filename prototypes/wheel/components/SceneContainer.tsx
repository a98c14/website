import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Prize } from "../types/Prize";
import Scene from "./Scene";

type SceneContainerProps = {
    prizes: Prize[];
};
const SceneContainer: React.FC<SceneContainerProps> = ({ prizes }) => {
    return (
        <>
            <Canvas
                mode="concurrent"
                style={{
                    position: "absolute",
                    top: 0,
                }}
                dpr={Math.max(window.devicePixelRatio, 2)}
                linear={true}
                flat={true}
                onCreated={(state) => state.gl.setClearColor("#d4c599")}
            >
                <Suspense fallback={null}>
                    <Scene prizes={prizes} />
                </Suspense>
            </Canvas>
        </>
    );
};

export default SceneContainer;
