import { OrbitControls, OrthographicCamera, useTexture } from "@react-three/drei";
import React, { Suspense, useEffect } from "react";
import * as THREE from "three";

import bearWithHat from "@prototypes/wheel/assets/wheel/bear_with_hat.png";
import backframe from "@prototypes/wheel/assets/wheel/backframe.png";
import innerframe from "@prototypes/wheel/assets/wheel/background.png";
import background from "@prototypes/wheel/assets/misc/background.png";
import rays from "@prototypes/wheel/assets/misc/rays_01.png";
import lightOn from "@prototypes/wheel/assets/wheel/lighton.png";
import lightOff from "@prototypes/wheel/assets/wheel/lightoff.png";
import wheelShadow from "@prototypes/wheel/assets/wheel/wheel_shadow.png";
import { Prize } from "../types/Prize";
import { Sprite } from "./Sprite";
import { Ray } from "./Ray";
import { Light } from "./Light";
import { InnerWheel } from "./InnerWheel";
import { MiddleButton } from "./MiddleButton";
import { useStore } from "../store";
import { Stopper } from "./Stopper";

type WheelProps = {
    textures: THREE.Texture[];
};

const LIGHT_COUNT = 12;
const Wheel: React.FC<WheelProps> = ({ textures }) => {
    const lightOnTexture = useTexture(lightOn.src);
    const lightOffTexture = useTexture(lightOff.src);
    const onWheelLoad = useStore((state) => state.onWheelLoad);

    useEffect(() => {
        onWheelLoad();
    }, []);

    return (
        <>
            <group scale={[0.01, 0.01, 0.01]}>
                <Sprite position={[0, 0, -4]} scale={1} image={background} />
                <Sprite position={[0, -1.8, -3]} scale={1.9} image={wheelShadow} />
                <Ray position={[0, 0, -2]} scale={1} image={rays} />
                <Sprite position={[300, -100, -1]} scale={0.5} image={bearWithHat} />
                <Sprite position={[0, -1.8, 0]} scale={0.54} image={backframe} />
                <Sprite position={[0, 3, 0]} scale={0.55} image={innerframe} />
                <InnerWheel textures={textures} />
                <group position={[0, 3.5, 0]}>
                    {[...Array(LIGHT_COUNT)].map((_, idx) => {
                        const angle = idx * ((2 * Math.PI) / LIGHT_COUNT);
                        const cos = Math.cos(angle);
                        const sin = Math.sin(angle);
                        const x0 = 0;
                        const y0 = 276;
                        const x = x0 * cos + sin * y0 * -1;
                        const y = x0 * sin + y0 * cos;
                        return (
                            <Light
                                key={idx}
                                initialVisibility={idx % 2 === 0}
                                lightOnImage={lightOnTexture}
                                lightOffImage={lightOffTexture}
                                position={[x, y, 0]}
                                scale={0.5}
                            />
                        );
                    })}
                </group>
                <Stopper position={[0, 270, 1]} scale={0.5} />
                <MiddleButton position={[0, 270, 1]} scale={0.5} />
            </group>
        </>
    );
};

type SceneProps = {
    prizes: Prize[];
};
const Scene: React.FC<SceneProps> = ({ prizes }) => {
    const textures = useTexture(prizes.map((x) => x.sliceUrl));
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.code === "Space") {
                const ws = useStore.getState().wheelState;
                ws.shouldRun = !ws.shouldRun;
                ws.shouldBrake = false;
                ws.targetPrizeIndex = 0;
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);
    return (
        <Suspense fallback={null}>
            <OrbitControls enableRotate={false} />
            <OrthographicCamera position={[0, 0, 5]} zoom={80} />
            <Wheel textures={textures} />
        </Suspense>
    );
};

export default Scene;
