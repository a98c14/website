import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../../prototypes/wheel/components/Scene"), {
    ssr: false,
});

const Wheel: NextPage = () => {
    return (
        <>
            <div className="flex bg-black z-[2] w-full h-screen relative">
                <h2 className="text-cyan-200">Wheel Page</h2>
                <Scene />
            </div>
        </>
    );
};

export default Wheel;
