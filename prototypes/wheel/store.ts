import create from "zustand";

type WheelState = {
    shouldRun: boolean;
    shouldStop: boolean;
    targetPrize: number;
    targetSpeed: number;
    playStopperAnimation: boolean;
    isStopperPlaying: boolean;
    lastCollisionIndex: number;
    lastCollisionSpeed: number;
};

type Store = {
    wheelState: WheelState;
};

export const useStore = create<Store>(() => ({
    wheelState: {
        shouldRun: false,
        shouldStop: false,
        playStopperAnimation: false,
        isStopperPlaying: false,
        lastCollisionIndex: -1,
        lastCollisionSpeed: 0,
        targetPrize: -1,
        targetSpeed: 0,
    },
}));
