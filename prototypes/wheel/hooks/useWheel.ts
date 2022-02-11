import { useCallback, useEffect } from "react";
import shallow from "zustand/shallow";
import { useStore } from "../store";

export function useWheel(onLoad: () => void, onComplete: () => void) {
    const { setOnWheelLoad, setOnWheelRotationComplete } = useStore(
        (state) => ({
            setOnWheelLoad: state.setOnWheelLoad,
            setOnWheelRotationComplete: state.setOnWheelRotationComplete,
        }),
        shallow
    );

    const spinWheel = useCallback((prizeIndex) => {
        const wheelState = useStore.getState().wheelState;
        wheelState.shouldRun = !wheelState.shouldRun;
        wheelState.shouldBrake = false;
        wheelState.targetPrizeIndex = prizeIndex;
    }, []);

    useEffect(() => {
        setOnWheelLoad(onLoad);
        setOnWheelRotationComplete(onComplete);
    }, [onLoad, onComplete]);

    return { spinWheel };
}
