import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Sprite } from "./Sprite";

type Props = { image: StaticImageData; position: [number, number, number]; scale: number };
export const Ray: React.FC<Props> = ({ image, position, scale }) => {
    const ref = useRef<THREE.Sprite>(null);
    useFrame((_, dt) => {
        if (!ref.current) return;
        ref.current.material.rotation += (Math.PI / 2) * dt;
    });
    return <Sprite ref={ref} position={position} scale={scale} image={image} />;
};
