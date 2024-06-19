import { Table } from "flowbite-react";
import { API } from "../model/API";

import { useContext } from "react";
import ApisContext from "../context/ApisContext";
import { Link } from "react-router-dom";

export function ApiTableRow({ api }: { api: API }) {
    const { setCurrentApi } = useContext(ApisContext);
    // TODO: Fix the linking system
    return (
        <Table.Row
            onClick={() => setCurrentApi(api)}
            className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-gray-100"
            key={api.uuid}
        >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Link to={`/api/${api.uuid}`}>{api.name}</Link>
            </Table.Cell>
            <Table.Cell className="px-6 py-4">
                <Link to={`/api/${api.uuid}`}>{api.vendorUrl}</Link>
            </Table.Cell>
            <Table.Cell className="px-6 py-4">
                <Link to={`/api/${api.uuid}`}>{api.maxRequestsPerDay}</Link>
            </Table.Cell>
        </Table.Row>
    );
}
