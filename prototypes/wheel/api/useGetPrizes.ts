import { useQuery, UseQueryResult } from "react-query";
import { QueryOptionTypes } from "types";
import { Prize } from "../types/Prize";

async function getPrizes(): Promise<Prize[]> {
    const INIT: RequestInit = {
        method: "GET",
    };

    return await fetch("https://haribo.azurewebsites.net/prizes", INIT).then((result) => result.json());
}

export default function useGetPrizes(props?: QueryOptionTypes<Prize[]>): UseQueryResult<Prize[]> {
    return useQuery("useGetPrize", () => getPrizes(), props);
}
