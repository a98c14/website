import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

type Props = {
    lightOnImage: THREE.Texture;
    lightOffImage: THREE.Texture;
    position: [number, number, number];
    scale: number;
    initialVisibility: boolean;
};

export const Light: React.FC<Props> = ({ lightOnImage, lightOffImage, position, scale, initialVisibility }) => {
    const lightsOnRef = useRef<THREE.Sprite>(null);
    const lightsOffRef = useRef<THREE.Sprite>(null);
    let time = 0;
    useFrame((_, dt) => {
        time += dt;
        if (time > 1) {
            if (!lightsOnRef.current || !lightsOffRef.current) return;
            lightsOnRef.current.visible = !lightsOnRef.current.visible;
            lightsOffRef.current.visible = !lightsOffRef.current.visible;
            time = 0;
        }
    });
    return (
        <group position={position} scale={[scale, scale, 1]}>
            <sprite
                visible={initialVisibility}
                ref={lightsOnRef}
                position={[0, 0, 0]}
                scale={[lightOnImage.image.width, lightOnImage.image.height, 1]}
            >
                <spriteMaterial attach="material" map={lightOnImage} />
            </sprite>
            <sprite
                visible={!initialVisibility}
                ref={lightsOffRef}
                position={[0, 0, 0]}
                scale={[lightOffImage.image.width, lightOffImage.image.height, 1]}
            >
                <spriteMaterial attach="material" map={lightOffImage} />
            </sprite>
        </group>
    );
};
