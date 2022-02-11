import stopper from "@prototypes/wheel/assets/wheel/pointer.png";
import { useRef } from "react";
import { useStore } from "@prototypes/wheel/store";
import { Sprite } from "./Sprite";
import { useFrame } from "@react-three/fiber";
import { clamp, lerp } from "three/src/math/MathUtils";
import { rotate } from "@core/math/vector";

type Props = { position: [number, number, number]; scale: number; isVisible?: boolean };

const STOPPER_ROTATION_ANGLE = -Math.PI / 4;
const STOPPER_MAX_COLLISION_SPEED = 2.8;
const STOPPER_PLAY_THRESHOLD = -0.4;
const STOPPER_LERP_SPEED = 4;

export const Stopper: React.FC<Props> = () => {
    const spriteRef = useRef<THREE.Sprite>(null);
    const groupRef = useRef<THREE.Group>(null);
    useFrame((_, dt) => {
        if (!spriteRef.current) return;
        const ws = useStore.getState().wheelState;
        const mat = spriteRef.current.material;
        if (ws.playStopperAnimation && !ws.isStopperPlaying) {
            ws.playStopperAnimation = false;
            ws.isStopperPlaying = true;
            const mat = spriteRef.current.material;
            mat.rotation = STOPPER_ROTATION_ANGLE * clamp(ws.lastCollisionSpeed / STOPPER_MAX_COLLISION_SPEED, 0.2, 1);
        } else if (!ws.playStopperAnimation && ws.isStopperPlaying && mat.rotation > STOPPER_PLAY_THRESHOLD) {
            ws.isStopperPlaying = false;
        }

        // Since we can't set the stopper pivot we rotate the group its on
        // and offset the position accordingly
        const v = rotate({ x: 0, y: stopper.height }, mat.rotation);
        groupRef.current?.position.set(-v.x, -v.y, 0);
        groupRef.current?.rotation.set(0, 0, mat.rotation);
        mat.rotation = lerp(mat.rotation, 0, dt * STOPPER_LERP_SPEED);
    });

    return (
        <group position={[0, 270 + 20, 1]}>
            <group ref={groupRef}>
                <Sprite position={[0, stopper.height - 20, 0]} ref={spriteRef} scale={0.42} image={stopper} />
            </group>
        </group>
    );
};
