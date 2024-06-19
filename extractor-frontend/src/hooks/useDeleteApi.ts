import {useMutation, useQueryClient} from "@tanstack/react-query";
import { deleteAPI } from "../services/apiMethods";

export function useDeleteApi() {
    
    const queryClient = useQueryClient();
    
    const {
        mutate: removeApi,
        isPending: isApiDeletePending,
        isError: isApiDeleteError,
        isSuccess: isApiDeleteSuccess,
    } = useMutation({
        mutationFn: (ApiUUID: string) => deleteAPI(ApiUUID),
        onSettled: () =>
            queryClient.invalidateQueries({queryKey: ["apis"]}),
    });
    
    return {
        removeApi,
        isApiDeletePending,
        isApiDeleteError,
        isApiDeleteSuccess
    }
}
