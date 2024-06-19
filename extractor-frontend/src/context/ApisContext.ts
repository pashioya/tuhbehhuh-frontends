import { API } from "../model/API";
import { createContext } from "react";

export interface ApisContext {
	apis: API[];
	setApis: () => void;
	isApisLoading: boolean;
	isApiError: boolean;
	isApiSuccess: boolean;
	currentApi: API | undefined;
	setCurrentApi: (api: API) => void;
	refetchApis: () => void;
}

export default createContext<ApisContext>({
	apis: [],
	setApis: () => { },
	isApisLoading: true,
	isApiError: false,
	isApiSuccess: false,
	currentApi: undefined,
	setCurrentApi: () => { },
	refetchApis: () => { },
});
