import {deleteEndpoint} from "../services/endpointMethods.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useDeleteEndpoint() {
    
    const queryClient = useQueryClient();
    
    const {
        mutate: removeEndpoint,
        isPending: isEndpointDeletePending,
        isError: isEndpointDeleteError,
        isSuccess: isEndpointDeleteSuccess,
    } = useMutation({
        mutationFn: (endpointUUID: string) => deleteEndpoint(endpointUUID),
        onSettled: () =>
            queryClient.invalidateQueries({queryKey: ["apis"]}),
    });
    
    return {
        removeEndpoint,
        isEndpointDeletePending,
        isEndpointDeleteError,
        isEndpointDeleteSuccess
    }
}
