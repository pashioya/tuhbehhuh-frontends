import { Table } from "flowbite-react";
import { Endpoint } from "../model/Endpoint.ts";
import EndpointContext from "../context/EndpointContext.ts";
import { useContext } from "react";
import { Link } from "react-router-dom";

export function EndpointTableRow({
    apiUUID,
    endpoint,
}: {
    apiUUID: string;
    endpoint: Endpoint;
}) {
    const { setCurrentEndpoint } = useContext(EndpointContext);

    return (
        <Table.Row
            onClick={() => setCurrentEndpoint(endpoint)}
            className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            key={endpoint.uuid}
        >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Link to={`/api/${apiUUID}/endpoint/${endpoint.uuid}`}>
                    {endpoint.name}
                </Link>
            </Table.Cell>
            <Table.Cell className="px-6 py-4">
                <Link to={`/api/${apiUUID}/endpoint/${endpoint.uuid}`}>
                    {endpoint.endpointPath}
                </Link>
            </Table.Cell>
            <Table.Cell className="px-6 py-4">
                <Link to={`/api/${apiUUID}/endpoint/${endpoint.uuid}`}>
                    {String(endpoint.active)}
                </Link>
            </Table.Cell>
        </Table.Row>
    );
}
