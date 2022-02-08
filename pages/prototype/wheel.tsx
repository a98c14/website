import type { NextPage } from "next";
import dynamic from "next/dynamic";
import api from "@prototypes/wheel/api";
import { Prize } from "@prototypes/wheel/types/Prize";

const Scene = dynamic(() => import("../../prototypes/wheel/components/SceneContainer"), {
    ssr: false,
});

const Wheel: NextPage = () => {
    const { data, isLoading } = api.useGetPrizes();
    return (
        <>
            <div className="flex bg-black z-[2] w-full h-screen relative">
                <h2 className="text-cyan-200">Wheel Page</h2>
                <Scene prizes={data} />
            </div>
        </>
    );
};

export default Wheel;
