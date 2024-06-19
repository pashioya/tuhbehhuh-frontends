import {RequestParam} from "./RequestParam";

export interface Endpoint {
    uuid: string;
    name: string;
    apiUUID: string;
    endpointPath: string;
    requestParams: RequestParam[];
    active: boolean;
    timeInterval: number;
    timeUnit: string;
}