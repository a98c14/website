import { WheelPrize } from "./WheelPrize";
import pin from "@prototypes/wheel/assets/wheel/piepin.png";
import { useTexture } from "@react-three/drei";
import { createRef, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lerp } from "three/src/math/MathUtils";
import { useStore } from "../store";

type InnerWheelProps = {
    textures: THREE.Texture[];
};

const ROTATION_SPEED = Math.PI;

export const InnerWheel: React.FC<InnerWheelProps> = ({ textures }) => {
    const pinTexture = useTexture(pin.src);
    const wheelRef = useRef<THREE.Group>(null);
    const [prizes] = useState(() => [...Array(textures.length)].map((_) => createRef<THREE.Sprite>()));

    let currentSpeed = 0;
    useFrame((_, dt) => {
        if (!wheelRef.current) return;
        const wheelState = useStore.getState().wheelState;
        currentSpeed = lerp(currentSpeed, wheelState.shouldRun ? ROTATION_SPEED : 0, dt / 4);
        wheelRef.current.rotateZ(currentSpeed * dt);
        for (let i = 0; i < prizes.length; i++) {
            const prize = prizes[i]?.current;
            const mat = prize?.material;
            if (mat) {
                if (mat.rotation % Math.PI > 1.85 && mat.rotation % Math.PI < 2.07 && wheelState.isStopperPlaying != true) {
                    wheelState.playStopperAnimation = true;
                }
                mat.rotation = mat.rotation + currentSpeed * dt;
            }
        }
    });

    return (
        <group ref={wheelRef} position={[0, 4, 0]}>
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
                        ref={prizes[idx]}
                        key={idx}
                        texture={texture}
                        scale={0.275}
                        position={[x, y, 0]}
                        rotation={angle - Math.PI / 2}
                    />
                );
            })}
        </group>
    );
};
