import { OrbitControls, OrthographicCamera, useTexture } from "@react-three/drei";
import React, { Suspense, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import bearWithHat from "@prototypes/wheel/assets/wheel/bear_with_hat.png";
import spinButton from "@prototypes/wheel/assets/wheel/spin_button_enabled.png";
import stopper from "@prototypes/wheel/assets/wheel/pointer.png";
import backframe from "@prototypes/wheel/assets/wheel/backframe.png";
import innerframe from "@prototypes/wheel/assets/wheel/background.png";
import pin from "@prototypes/wheel/assets/wheel/piepin.png";
import background from "@prototypes/wheel/assets/misc/background.png";
import rays from "@prototypes/wheel/assets/misc/rays_01.png";
import { Prize } from "../types/Prize";

type SpriteProps = { image: StaticImageData; position: [number, number, number]; scale: number };

const Sprite = React.forwardRef<THREE.Sprite, SpriteProps>(({ image, position, scale }, ref) => {
    const texture = useTexture(image.src);
    const aspect = image.width / image.height;
    return (
        <sprite ref={ref} position={position} scale={[image.height * scale * aspect, image.height * scale, 1]}>
            <spriteMaterial attach="material" map={texture} />
        </sprite>
    );
});

type PrizePartProps = {
    texture: THREE.Texture;
    pinTexture: THREE.Texture;
    position: [number, number, number];
    scale: number;
    rotation: number;
};
const PrizePart: React.FC<PrizePartProps> = ({ texture, position, scale, rotation, pinTexture }) => {
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

type RayProps = { image: StaticImageData; position: [number, number, number]; scale: number };
const Ray: React.FC<RayProps> = ({ image, position, scale }) => {
    const ref = useRef<THREE.Sprite>(null);
    useFrame((_, dt) => {
        if (!ref.current) return;
        ref.current.material.rotation += (Math.PI / 2) * dt;
    });
    return <Sprite ref={ref} position={position} scale={scale} image={image} />;
};

type WheelProps = {
    textures: THREE.Texture[];
};
const Wheel: React.FC<WheelProps> = ({ textures }) => {
    const pinTexture = useTexture(pin.src);
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
                            <PrizePart
                                pinTexture={pinTexture}
                                key={idx}
                                texture={texture}
                                scale={0.275}
                                position={[x, y, 0]}
                                rotation={angle - Math.PI / 2}
                            />
                        );
                    })}
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
                console.log("Clicked", e);
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
