import axios from "axios";
import {API} from "../model/API";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getAPIs() {
	const url = `${BASE_URL}/apis`;
	try {
		return (await axios.get<API[]>(url)).data;
	} catch (error) {
		console.error("Error fetching APIs:", error);
		throw error;
	}
}


export async function postAPI(api: API) {
	const url = `${BASE_URL}/apis/create`;
	try {
		console.log("Posting")
		console.log(api)
		return (await axios.post<API>(url, api)).data;
	} catch (error) {
		console.error("Error posting Endpoint:", error);
		throw error;
	}
}

export async function deleteAPI(apiUUID: string) {
	const url = `${BASE_URL}/apis/${apiUUID}`;
	try {
		await axios.delete(url);
	} catch (error) {
		console.error("Error deleting API:", error);
		throw error;
	}
}