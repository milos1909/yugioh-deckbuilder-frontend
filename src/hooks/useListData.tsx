import {useCallback, useState} from "react";
import {get} from "@/core/httpClient";

const useListData = <T,> (url: string, initalData: T) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T>(initalData)

    const getData = useCallback(async (url : string) => {
        setLoading(true);
        let result = await get(url);

        setData(result.data);
        setLoading(false);
    }, [url]);

    return {getData, loading, data};
}

export default useListData;