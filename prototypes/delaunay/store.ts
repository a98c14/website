import { MouseState } from "@core/controls/mouse";
import { Camera } from "@react-three/fiber";
import { createRef, RefObject } from "react";
import create from "zustand";

type Store = {
    canvasRef: RefObject<HTMLCanvasElement>;
    cameraRef: RefObject<Camera>;
    mouseState: MouseState;
};

export const useStore = create<Store>(() => ({
    mouseState: {
        normalized: { x: 0, y: 0 },
        world: { x: 0, y: 0 },
    },
    canvasRef: createRef(),
    cameraRef: createRef(),
}));
