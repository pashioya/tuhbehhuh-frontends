import { Endpoint } from "./Endpoint.ts";

export interface API {
    uuid: string;
    name: string;
    vendorUrl: string;
    apiKeyParameterName: string;
    apiKey: string;
    maxRequestsPerDay: number;
    endpoints: Endpoint[];
}