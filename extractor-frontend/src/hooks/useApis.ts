import {useQuery} from "@tanstack/react-query";
import {getAPIs} from "../services/apiMethods.ts";

export function useApis() {
    const {
        data: apis,
        isLoading: isApisLoading,
        isError: isApiError,
        isSuccess: isApiSuccess,
        error: apiError,
        refetch: refetchApis,
    } = useQuery({
        queryKey: ["apis"],
        queryFn: () => getAPIs(),
        refetchInterval: 30000,
    });
    
    return {apis, isApisLoading, isApiError, isApiSuccess, apiError, refetchApis};
}
