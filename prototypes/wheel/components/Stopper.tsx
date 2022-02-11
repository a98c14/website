import stopper from "@prototypes/wheel/assets/wheel/pointer.png";
import { useRef } from "react";
import { useStore } from "@prototypes/wheel/store";
import { Sprite } from "./Sprite";
import { useFrame } from "@react-three/fiber";
import { lerp } from "three/src/math/MathUtils";

type Props = { position: [number, number, number]; scale: number; isVisible?: boolean };

export const Stopper: React.FC<Props> = () => {
    const spriteRef = useRef<THREE.Sprite>(null);
    const groupRef = useRef<THREE.Group>(null);
    useFrame((_, dt) => {
        if (!spriteRef.current) return;
        const wheelState = useStore.getState().wheelState;
        const mat = spriteRef.current.material;
        if (wheelState.playStopperAnimation && !wheelState.isStopperPlaying) {
            wheelState.playStopperAnimation = false;
            wheelState.isStopperPlaying = true;
            const mat = spriteRef.current.material;
            mat.rotation = (-Math.PI / 4) * Math.max(Math.min(1, wheelState.lastCollisionSpeed / 2.8), 0.2);
        } else if (!wheelState.playStopperAnimation && wheelState.isStopperPlaying) {
            if (mat.rotation > -0.4) wheelState.isStopperPlaying = false;
        }
        const angle = mat.rotation;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x0 = 0;
        const y0 = stopper.height;
        const x = x0 * cos + sin * y0 * -1;
        const y = x0 * sin + y0 * cos;
        groupRef.current?.position.set(-x, -y, 0);
        groupRef.current?.rotation.set(0, 0, mat.rotation);
        mat.rotation = lerp(mat.rotation, 0, dt * 4);
    });
    return (
        <group position={[0, 270 + 20, 1]}>
            <group ref={groupRef}>
                <Sprite position={[0, stopper.height - 20, 0]} ref={spriteRef} scale={0.42} image={stopper} />
            </group>
        </group>
    );
};
