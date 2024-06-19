import {Table} from "flowbite-react";
import {EndpointResponse} from "../model/EndpointResponse.ts";

export function EndpointResponseTableRow({endpointResponse}: { endpointResponse: EndpointResponse }) {
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={endpointResponse.uuid}>
			<Table.Cell
				className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
			>
				{endpointResponse.statusCode}
			</Table.Cell>
			<Table.Cell className="px-6 py-4">{endpointResponse.body}</Table.Cell>
			<Table.Cell className="px-6 py-4">{endpointResponse.timeSent.toString()}</Table.Cell>
		</Table.Row>
	);
}
