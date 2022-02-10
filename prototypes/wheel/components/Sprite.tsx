import { useTexture } from "@react-three/drei";
import React from "react";

type Props = { image: StaticImageData; position: [number, number, number]; scale: number; isVisible?: boolean };

export const Sprite = React.forwardRef<THREE.Sprite, Props>(({ image, position, scale, isVisible }, ref) => {
    const texture = useTexture(image.src);
    const aspect = image.width / image.height;
    return (
        <sprite visible={isVisible ?? true} ref={ref} position={position} scale={[image.height * scale * aspect, image.height * scale, 1]}>
            <spriteMaterial attach="material" map={texture} />
        </sprite>
    );
});
