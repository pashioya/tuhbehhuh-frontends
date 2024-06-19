import { ReactElement, useState } from "react";
import { useApis } from "../hooks/useApis.ts";
import ApisContext from "./ApisContext.ts";
import { API } from "../model/API.ts";

interface WithChildren {
    children: ReactElement | ReactElement[];
}

export default function ApisContextProvider({ children }: WithChildren) {
    let { apis } = useApis();
    const setApis = () => {
        console.log("setApis");
    };
    const { isApisLoading, isApiError, isApiSuccess, refetchApis } = useApis();
    const [currentApi, setCurrentApi] = useState<API | undefined>(undefined);

    if (!apis) apis = [];

    return (
        <ApisContext.Provider
            value={{
                apis: apis,
                setApis: setApis,
                currentApi: currentApi,
                isApisLoading: isApisLoading,
                isApiError: isApiError,
                isApiSuccess: isApiSuccess,
                setCurrentApi: setCurrentApi,
                refetchApis,
            }}
        >
            {children}
        </ApisContext.Provider>
    );
}
