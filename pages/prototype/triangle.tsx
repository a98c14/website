import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../../prototypes/triangle/components/SceneContainer"), {
    ssr: false,
});

const Triangle: NextPage = () => {
    return (
        <>
            <div className="flex bg-black z-[2] w-full h-screen relative">
                <h2 className="text-cyan-200">Triangle Page</h2>
                <Scene />
            </div>
        </>
    );
};

export default Triangle;
