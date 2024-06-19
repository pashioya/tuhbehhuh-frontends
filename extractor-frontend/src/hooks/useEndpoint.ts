import {useQuery} from "@tanstack/react-query";
import {getEndpoint} from "../services/endpointMethods.ts";

export function useEndpoint(endpointUUID: string) {
    
    const {
        data: endpoint,
        isLoading: isEndpointLoading,
        isError: isEndpointError,
        isSuccess: isEndpointSuccess,
        error: endpointError,
    } = useQuery({
        queryKey: ["endpoints"],
        queryFn: () => getEndpoint(endpointUUID),
    });
    
    return {
        endpoint,
        isEndpointLoading,
        isEndpointSuccess,
        isEndpointError,
        endpointError,
    };
}
