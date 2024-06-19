import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { Main } from "../components/Main";
import { ReactNode, useContext } from "react";
import ApisContext from "../context/ApisContext.ts";
import { ApiTableRow } from "../components/ApiTableRow.tsx";
import { GenericTable } from "../components/GenericTable.tsx";
import { EndpointTableRow } from "../components/EndpointTableRow.tsx";
import { ResourceView } from "../util/ResourceView.tsx";
import { BottomFooter } from "../components/BottomFooter.tsx";

export function Dashboard() {
    const { apis, isApisLoading, isApiError, isApiSuccess } =
        useContext(ApisContext);

    const largeSections: ReactNode[] = [];

    const apiRows: ReactNode[] = [];
    const apiTableColumns = ["Api Name", "Vendor URL", "Max Requests Per Day"];

    const endpointsRows: ReactNode[] = [];
    const endpointTableColumns = [
        "Endpoint Name",
        "Endpoint Path",
        "Is Active",
    ];

    for (const api of apis) {
        for (const endpoint of api.endpoints)
            endpointsRows.push(
                <EndpointTableRow apiUUID={api.uuid} endpoint={endpoint} />
            );
        apiRows.push(<ApiTableRow api={api} />);
    }

    largeSections.push(
        <ResourceView
            isLoading={isApisLoading}
            loadingMessage={"Loading..."}
            isError={isApiError}
            isSuccess={isApiSuccess}
        >
            <GenericTable tableRows={apiRows} tableColumns={apiTableColumns} />
        </ResourceView>
    );

    largeSections.push(
        <ResourceView
            isLoading={isApisLoading}
            loadingMessage={"Loading..."}
            isError={isApiError}
            isSuccess={isApiSuccess}
        >
            <GenericTable
                tableRows={endpointsRows}
                tableColumns={endpointTableColumns}
            />
        </ResourceView>
    );

    return (
        <div>
            <Header />
            <SideBar apis={apis} />
            <Main largeSections={largeSections} />
            <BottomFooter />
        </div>
    );
}
