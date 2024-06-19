import {useMutation, useQueryClient} from "@tanstack/react-query";
import {activateEndpoint, deactivateEndpoint,} from "../services/endpointMethods.ts";

export function useToggleEndpoint(endpointUUID: string) {
    const queryClient = useQueryClient();
    
    
    
    const {
        mutate: enableEndpoint,
        isPending: isEndpointActivationPending,
        isError: isEndpointActivationError,
        isSuccess: isEndpointActivationSuccess,
    } = useMutation({
        mutationFn: () => activateEndpoint(endpointUUID),
        onSettled: () =>
            queryClient.invalidateQueries({queryKey: ["toggleEndpoint"]}),
    });
    
    const {
        mutate: disableEndpoint,
        isPending: isEndpointDeactivationPending,
        isError: isEndpointDeactivationError,
        isSuccess: isEndpointDeactivationSuccess,
    } = useMutation({
        mutationFn: () => deactivateEndpoint(endpointUUID),
        onSettled: () =>
            queryClient.invalidateQueries({queryKey: ["toggleEndpoint"]}),
    });
    
    return {
        enableEndpoint,
        isEndpointActivationPending,
        isEndpointActivationError,
        isEndpointActivationSuccess,
        disableEndpoint,
        isEndpointDeactivationPending,
        isEndpointDeactivationError,
        isEndpointDeactivationSuccess,
    };
}
