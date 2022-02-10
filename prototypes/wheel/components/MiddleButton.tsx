import spinButton from "@prototypes/wheel/assets/wheel/spin_button_enabled.png";
import buttonShadow from "@prototypes/wheel/assets/wheel/button_shadow.png";
import { Sprite } from "./Sprite";

type Props = { position: [number, number, number]; scale: number; isVisible?: boolean };
export const MiddleButton: React.FC<Props> = () => {
    return (
        <group position={[0, 0, 1]} scale={0.5}>
            <Sprite position={[0, 0, 0]} scale={1} image={spinButton} />
            <Sprite position={[0, 0, 0]} scale={1} image={buttonShadow} />
        </group>
    );
};
