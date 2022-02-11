import create from "zustand";

export type WheelState = {
    shouldRun: boolean;
    shouldBrake: boolean;
    targetPrizeIndex: number;
    targetSpeed: number;
    playStopperAnimation: boolean;
    isStopperPlaying: boolean;
    lastCollisionIndex: number;
    lastCollisionSpeed: number;
};

type Store = {
    wheelState: WheelState;
    onWheelRotationComplete: () => void;
    onWheelLoad: () => void;
    setOnWheelLoad: (callback: () => void) => void;
    setOnWheelRotationComplete: (callback: () => void) => void;
};

export const useStore = create<Store>((set) => ({
    wheelState: {
        shouldRun: false,
        shouldBrake: false,
        playStopperAnimation: false,
        isStopperPlaying: false,
        lastCollisionIndex: -1,
        lastCollisionSpeed: 0,
        targetPrizeIndex: -1,
        targetSpeed: 0,
    },
    onWheelRotationComplete: () => {},
    onWheelLoad: () => {},
    setOnWheelLoad: (callback: () => void) => set({ onWheelLoad: callback }),
    setOnWheelRotationComplete: (callback: () => void) => set({ onWheelRotationComplete: callback }),
}));
