import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../../prototypes/delaunay/components/SceneContainer"), {
    ssr: false,
});

const Triangle: NextPage = () => {
    return (
        <>
            <div className="flex bg-black z-[2] w-full h-screen relative">
                <h2 className="text-cyan-200">Delaunay Page</h2>
                <Scene />
            </div>
        </>
    );
};

export default Triangle;
