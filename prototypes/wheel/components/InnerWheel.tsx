import { WheelPrize } from "./WheelPrize";
import pin from "@prototypes/wheel/assets/wheel/piepin.png";
import { useTexture } from "@react-three/drei";
import { createRef, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lerp } from "three/src/math/MathUtils";
import { useStore, WheelState } from "../store";
import { rotate } from "@core/math/vector";
import { EPSILON } from "@core/math/constant";

type InnerWheelProps = {
    textures: THREE.Texture[];
};

const MAX_ROTATION_SPEED = Math.PI;
const MIN_ROTATION_SPEED = 0.1;
const MIN_STOPPER_TRIGGER = 1.87;
const MAX_STOPPER_TRIGGER = 2.07;
const MIN_BREAK_ROTATION = 4.3;
const MAX_BREAK_ROTATION = 4.7;
const BREAK_SPEED_THRESHOLD = 0.6;
const ACTIVE_LERP_SPEED = 0.25;
const BRAKE_LERP_SPEED = 1.2;

function calculateSpeed(currentSpeed: number, state: WheelState, dt: number) {
    let wheelSpeed = state.shouldRun ? MAX_ROTATION_SPEED : MIN_ROTATION_SPEED;
    wheelSpeed = state.shouldBrake ? 0 : wheelSpeed;
    return lerp(currentSpeed, wheelSpeed, state.shouldBrake ? dt * BRAKE_LERP_SPEED : dt * ACTIVE_LERP_SPEED);
}

export const InnerWheel: React.FC<InnerWheelProps> = ({ textures }) => {
    const pinTexture = useTexture(pin.src);
    const wheelRef = useRef<THREE.Group>(null);
    const [prizes] = useState(() => [...Array(textures.length)].map((_) => createRef<THREE.Sprite>()));

    let currentSpeed = 0;
    useFrame((_, dt) => {
        if (!wheelRef.current) return;
        const ws = useStore.getState().wheelState;
        currentSpeed = calculateSpeed(currentSpeed, ws, dt);
        wheelRef.current.rotateZ(currentSpeed * dt);

        if (currentSpeed <= EPSILON && ws.targetPrizeIndex >= 0) {
            useStore.getState().onWheelRotationComplete();
            ws.targetPrizeIndex = -1;
            ws.targetSpeed = 0;
            ws.shouldRun = false;
            ws.shouldBrake = false;
        }

        for (let i = 0; i < prizes.length; i++) {
            const prize = prizes[i]?.current;
            const mat = prize?.material;
            if (!mat) continue;

            // Rotate the wheel
            const rot = mat.rotation % (Math.PI * 2);
            mat.rotation = mat.rotation + currentSpeed * dt;
            // Stops the wheel if wheel should stop and its on the target prize
            if (i === ws.targetPrizeIndex && !ws.shouldRun && currentSpeed < BREAK_SPEED_THRESHOLD) {
                if (rot > MIN_BREAK_ROTATION && rot < MAX_BREAK_ROTATION) ws.shouldBrake = true;
            }

            // Play the stopper animation if colliding with a pin. Fakes the collision
            // detection by using rotation intervals.
            if (rot > MIN_STOPPER_TRIGGER && rot < MAX_STOPPER_TRIGGER && ws.isStopperPlaying != true && ws.lastCollisionIndex !== i) {
                ws.playStopperAnimation = true;
                ws.lastCollisionIndex = i;
                ws.lastCollisionSpeed = currentSpeed;
            }
        }
    });

    return (
        <group ref={wheelRef} position={[0, 4, 0]}>
            {textures.map((texture, idx) => {
                const angle = idx * ((2 * Math.PI) / textures.length);
                const pos = rotate({ x: 0, y: 120 }, angle);
                return (
                    <WheelPrize
                        pinTexture={pinTexture}
                        ref={prizes[idx]}
                        key={idx}
                        texture={texture}
                        scale={0.275}
                        position={[pos.x, pos.y, 0]}
                        rotation={angle - Math.PI / 2}
                    />
                );
            })}
        </group>
    );
};
