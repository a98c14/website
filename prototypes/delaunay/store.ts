import { MouseState } from "@core/controls/mouse";
import { Vec2 } from "@core/math/vector";
import { Camera } from "@react-three/fiber";
import { createRef, RefObject } from "react";
import create from "zustand";

type Store = {
    canvasRef: RefObject<HTMLCanvasElement>;
    cameraRef: RefObject<Camera>;
    mouseState: MouseState;
    points: Vec2[];
    addPoint: (v: Vec2) => void;
    clearPoints: () => void;
};

export const useDelaunayStore = create<Store>((set) => ({
    mouseState: {
        normalized: { x: 0, y: 0 },
        world: { x: 0, y: 0 },
    },
    canvasRef: createRef(),
    cameraRef: createRef(),
    points: [],
    addPoint: (v) => set((prev) => ({ points: [...prev.points, v] })),
    clearPoints: () => set(() => ({ points: [] })),
}));
