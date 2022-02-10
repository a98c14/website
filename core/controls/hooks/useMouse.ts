import { Camera } from "@react-three/fiber";
import { RefObject, useEffect } from "react";
import { MouseState } from "@core/controls/mouse";
import { StoreApi, UseBoundStore } from "zustand";
import { getNormalizedPosition, projectScreenToWorld } from "@core/graphics/camera";

interface MouseStore {
    mouseState: MouseState;
    canvasRef: RefObject<HTMLCanvasElement>;
    cameraRef: RefObject<Camera>;
}

/**
 * Sets the mouse state for the given store.
 * Store has to implement mouse store interface
 * ```
 * interface MouseStore {
 *     mouseState: MouseState;
 *     canvasRef: RefObject<HTMLCanvasElement>;
 *     cameraRef: RefObject<Camera>;
 * }
 * ```
 * @param store Store to save to
 */
export function useMouse<T extends MouseStore>(store: UseBoundStore<T, StoreApi<T>>) {
    function onMouseMove(e: MouseEvent) {
        const canvasRef = store.getState().canvasRef;
        const cameraRef = store.getState().cameraRef;
        if (!canvasRef || !canvasRef.current || !cameraRef || !cameraRef.current) return;
        const mouseState = store.getState().mouseState;
        const rect = canvasRef.current.getBoundingClientRect();
        const v = getNormalizedPosition(e.clientX, e.clientY, rect!);
        const r = projectScreenToWorld(v, cameraRef.current);
        mouseState.normalized = v;
        mouseState.world = r;
    }

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    });
}
