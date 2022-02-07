import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../../prototypes/circles/components/SceneContainer"), {
    ssr: false,
});

const Circles: NextPage = () => {
    return (
        <>
            <div className="flex bg-black z-[2] w-full h-screen relative">
                <h2 className="text-cyan-200">Circle Page</h2>
                <Scene />
            </div>
        </>
    );
};

export default Circles;
