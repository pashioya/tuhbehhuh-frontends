import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postAPI} from "../services/apiMethods.ts"; // Replace with your actual Endpoint function
import {API} from "../model/API.ts";

export function useApi() {
    const queryClient = useQueryClient();
    
    const {
        mutate: postNewAPI,
        data: apiData,
        isPending: isPosting,
        isError: isPostingError,
    } = useMutation({
        mutationFn: (api: API) => postAPI(api),
        onSettled: () => queryClient.invalidateQueries({queryKey: ["apis"]}),
    });
    return {postAPI: postNewAPI, apiData, isPosting, isPostingError};
}
