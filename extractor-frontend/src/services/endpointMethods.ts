import axios from "axios";
import {EndpointResponse} from "../model/EndpointResponse.ts";
import {Endpoint} from "../model/Endpoint.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getEndpointResponseHistory(
    endpointUUID: string | undefined,
) {
    const url = `${BASE_URL}/endpoint-responses/endpoint/${endpointUUID}`;
    try {
        return (await axios.get<EndpointResponse[]>(url)).data;
    } catch (error) {
        console.error("Error fetching endpoint:", error);
        throw error;
    }
}

export async function getEndpoint(endpointUUID: string) {
    const url = `${BASE_URL}/endpoints/${endpointUUID}`;
    try {
        return (await axios.get<Endpoint>(url)).data;
    } catch (error) {
        console.error("Error fetching endpoint:", error);
        throw error;
    }
}

export async function postEndpoint(endpoint: Endpoint) {
    const url = `${BASE_URL}/endpoints/create`;
    try {
        return (await axios.post<Endpoint>(url, endpoint)).data;
    } catch (error) {
        console.error("Error fetching endpoint:", error);
        throw error;
    }
}

export async function deleteEndpoint(endpointUUID: string) {
    const url = `${BASE_URL}/endpoints/${endpointUUID}`;
    try {
        await axios.delete(url);
    } catch (error) {
        console.error("Error fetching endpoint:", error);
        throw error;
    }
}

export async function activateEndpoint(endpointUUID: string) {
    const url = `${BASE_URL}/endpoints/${endpointUUID}/activate`;
    try {
        await axios.patch(url, {active: true});
    } catch (error) {
        console.error("Error fetching endpoint:", error);
        throw error;
    }
}

export async function deactivateEndpoint(endpointUUID: string) {
    const url = `${BASE_URL}/endpoints/${endpointUUID}/deactivate`;
    try {
        await axios.patch(url, {active: true});
    } catch (error) {
        console.error("Error fetching endpoint:", error);
        throw error;
    }
}
