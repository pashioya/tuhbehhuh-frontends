import {Endpoint} from "../model/Endpoint.ts";
import {postEndpoint} from "../services/endpointMethods.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useCreateEndpoint() {
    
    const queryClient = useQueryClient();
    
    const {
        mutate: createEndpoint,
        isPending: isEndpointPostPending,
        isError: isEndpointPostError,
        isSuccess: isEndpointPostSuccess,
    } = useMutation({
        mutationFn: (endpoint: Endpoint) => postEndpoint(endpoint),
        onSettled: () =>
            queryClient.invalidateQueries({queryKey: ["apis"]}),
    });
    
    return {
        createEndpoint,
        isEndpointPostPending,
        isEndpointPostError,
        isEndpointPostSuccess
    }
}
