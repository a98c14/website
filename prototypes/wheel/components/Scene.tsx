import { OrbitControls, OrthographicCamera, useTexture } from "@react-three/drei";
import React, { Suspense, useEffect } from "react";
import * as THREE from "three";

import bearWithHat from "@prototypes/wheel/assets/wheel/bear_with_hat.png";
import spinButton from "@prototypes/wheel/assets/wheel/spin_button_enabled.png";
import stopper from "@prototypes/wheel/assets/wheel/pointer.png";
import backframe from "@prototypes/wheel/assets/wheel/backframe.png";
import innerframe from "@prototypes/wheel/assets/wheel/background.png";
import pin from "@prototypes/wheel/assets/wheel/piepin.png";
import background from "@prototypes/wheel/assets/misc/background.png";
import rays from "@prototypes/wheel/assets/misc/rays_01.png";
import lightOn from "@prototypes/wheel/assets/wheel/lighton.png";
import lightOff from "@prototypes/wheel/assets/wheel/lightoff.png";
import { Prize } from "../types/Prize";
import { Sprite } from "./Sprite";
import { Ray } from "./Ray";
import { WheelPrize } from "./WheelPrize";
import { Light } from "./Light";

type WheelProps = {
    textures: THREE.Texture[];
};

const LIGHT_COUNT = 12;
const Wheel: React.FC<WheelProps> = ({ textures }) => {
    const pinTexture = useTexture(pin.src);
    const lightOnTexture = useTexture(lightOn.src);
    const lightOffTexture = useTexture(lightOff.src);
    return (
        <>
            <group scale={[0.01, 0.01, 0.01]}>
                <Ray position={[0, 0, -2]} scale={1} image={rays} />
                <Sprite position={[0, 0, -3]} scale={1} image={background} />
                <Sprite position={[300, -100, -1]} scale={0.5} image={bearWithHat} />
                <Sprite position={[0, -1.8, 0]} scale={0.54} image={backframe} />
                <Sprite position={[0, 3, 0]} scale={0.55} image={innerframe} />
                <group position={[0, 4, 0]}>
                    {textures.map((texture, idx) => {
                        const angle = idx * ((2 * Math.PI) / textures.length);
                        const cos = Math.cos(angle);
                        const sin = Math.sin(angle);
                        const x0 = 0;
                        const y0 = 120;
                        const x = x0 * cos + sin * y0 * -1;
                        const y = x0 * sin + y0 * cos;
                        return (
                            <WheelPrize
                                pinTexture={pinTexture}
                                key={idx}
                                texture={texture}
                                scale={0.275}
                                position={[x, y, 0]}
                                rotation={angle - Math.PI / 2}
                            />
                        );
                    })}
                    <group position={[0, -0.5, 0]}>
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
                </group>
                <Sprite position={[0, 270, 1]} scale={0.5} image={stopper} />
                <Sprite position={[0, 0, 1]} scale={0.5} image={spinButton} />
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
