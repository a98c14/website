import * as THREE from "three";

type Props = {
    texture: THREE.Texture;
    pinTexture: THREE.Texture;
    position: [number, number, number];
    scale: number;
    rotation: number;
};

export const WheelPrize: React.FC<Props> = ({ texture, position, scale, rotation, pinTexture }) => {
    const aspect = texture.image.width / texture.image.height;
    return (
        <group position={position} rotation={[0, 0, rotation]}>
            <sprite scale={[texture.image.height * scale * aspect, texture.image.height * scale, 1]}>
                <spriteMaterial rotation={rotation} attach="material" map={texture} />
            </sprite>
            <sprite position={[29, 220, 1]} scale={[80, 80, 1]}>
                <spriteMaterial rotation={rotation} attach="material" map={pinTexture} />
            </sprite>
        </group>
    );
};
