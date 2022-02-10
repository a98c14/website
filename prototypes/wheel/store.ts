import create from "zustand";

type WheelState = {
    shouldRun: boolean;
    playStopperAnimation: boolean;
    isStopperPlaying: boolean;
};

type Store = {
    wheelState: WheelState;
};

export const useStore = create<Store>(() => ({
    wheelState: { shouldRun: false, playStopperAnimation: false, isStopperPlaying: false },
}));
