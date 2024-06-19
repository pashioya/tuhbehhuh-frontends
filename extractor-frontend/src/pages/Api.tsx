import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { Main } from "../components/Main";
import { BottomFooter } from "../components/BottomFooter.tsx";
import { ReactNode, useContext, useEffect } from "react";
import ApisContext from "../context/ApisContext.ts";

import { ResourceView } from "../util/ResourceView.tsx";
import { GenericTable } from "../components/GenericTable.tsx";
import { EndpointTableRow } from "../components/EndpointTableRow.tsx";
import { ApiSubheader } from "../components/ApiSubheader.tsx";
import { EditApiForm } from "../components/EditApiForm.tsx";

export function Api() {
    const endpointsRows: ReactNode[] = [];
    const endpointTableColumns = [
        "Endpoint Name",
        "Endpoint Path",
        "Is Active",
    ];
    const { currentApi } = useContext(ApisContext);
    const { apis } = useContext(ApisContext);

    // TODO: Find a better solution to this. this is hacky
    useEffect(() => {
        if (!currentApi) {
            window.location.href = "/";
        }
    }, [currentApi]);

    for (const endpoint of currentApi?.endpoints || [])
        endpointsRows.push(
            <EndpointTableRow
                apiUUID={currentApi?.uuid || ""}
                endpoint={endpoint}
            />
        );

    const largeSections: ReactNode[] = [];
    const mediumSections: ReactNode[] = [];

    mediumSections.push(
        <ResourceView
            isLoading={false}
            loadingMessage={"Loading Endpoints"}
            isError={false}
            isSuccess={true}
        >
            <EditApiForm />
        </ResourceView>
    );

    largeSections.push(
        <ResourceView
            isLoading={false}
            loadingMessage={"Loading Endpoints"}
            isError={false}
            isSuccess={true}
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
            <ApiSubheader
                endpoints={currentApi?.endpoints || []}
                apiUUID={currentApi?.uuid || ""}
            />
            <Main
                largeSections={largeSections}
                mediumSections={mediumSections}
            />
            <BottomFooter />
        </div>
    );
}
