import { OrbitControls, OrthographicCamera, useTexture } from "@react-three/drei";
import React, { Suspense } from "react";
import bearWithHat from "@prototypes/wheel/assets/wheel/bear_with_hat.png";
import spinButton from "@prototypes/wheel/assets/wheel/spin_button_enabled.png";
import stopper from "@prototypes/wheel/assets/wheel/pointer.png";
import backframe from "@prototypes/wheel/assets/wheel/backframe.png";
import innerframe from "@prototypes/wheel/assets/wheel/background.png";
import background from "@prototypes/wheel/assets/misc/background.png";
import rays from "@prototypes/wheel/assets/misc/rays_01.png";

type SpriteProps = { image: StaticImageData; scale: number };

const Sprite: React.FC<SpriteProps> = ({ image, scale }) => {
    const texture = useTexture(image.src);
    const aspect = image.width / image.height;
    return (
        <sprite position={[0, 0, 0]} scale={[image.height * scale * aspect, image.height * scale, 1]}>
            <spriteMaterial attach="material" map={texture} />
        </sprite>
    );
};

const Scene: React.FC = () => {
    return (
        <Suspense fallback={null}>
            <OrbitControls enableRotate={false} />
            <OrthographicCamera position={[0, 0, 5]} zoom={80} />
            <Sprite scale={1 / 100} image={background} />
            <Sprite scale={1 / 200} image={rays} />
            <Sprite scale={1 / 200} image={backframe} />
            <Sprite scale={1 / 200} image={innerframe} />
            <Sprite scale={1 / 200} image={stopper} />
            <Sprite scale={1 / 200} image={spinButton} />
            <Sprite scale={1 / 300} image={bearWithHat} />
        </Suspense>
    );
};

export default Scene;
