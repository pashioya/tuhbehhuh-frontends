export interface EndpointResponse {
	uuid: string;
	endpointUUID: string;
	statusCode: number;
	request: string;
	answeringUri: string;
	timeSent: Date;
	timeInterval: number;
	body: string;
}
