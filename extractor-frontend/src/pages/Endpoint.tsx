import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { Main } from "../components/Main";
import { BottomFooter } from "../components/BottomFooter.tsx";
import { ReactNode, useContext, useEffect } from "react";
import ApisContext from "../context/ApisContext.ts";
import { EndpointSubheader } from "../components/EndpointSubheader.tsx";
import { useQuery } from "@tanstack/react-query";
import { getEndpointResponseHistory } from "../services/endpointMethods.ts";
import EndpointContext from "../context/EndpointContext.ts";
import { ResourceView } from "../util/ResourceView.tsx";
import { GenericTable } from "../components/GenericTable.tsx";
import { EndpointResponseTableRow } from "../components/EndpointResponseTableRow.tsx";
import { EditEndpointForm } from "../components/EditEndpointForm.tsx";

export function Endpoint() {
    const { apis, currentApi } = useContext(ApisContext);
    const { currentEndpoint } = useContext(EndpointContext);

    const { data, isError, isLoadingError, isSuccess } = useQuery({
        queryKey: ["endpointResponseHistory", currentEndpoint?.uuid],
        queryFn: () => getEndpointResponseHistory(currentEndpoint?.uuid),
    });

    // TODO: Find a better solution to this. this is hacky
    useEffect(() => {
        if (!currentEndpoint || !currentApi) {
            window.location.href = "/";
        }
    }, [currentEndpoint, currentApi]);

    const endpointResponsesRows: ReactNode[] = [];

    if (data != undefined) {
        for (const endpointResponse of data) {
            endpointResponsesRows.push(
                <EndpointResponseTableRow endpointResponse={endpointResponse} />
            );
        }
    }

    const largeSections: ReactNode[] = [];
    const mediumSections: ReactNode[] = [];

    const statusCodeTableColumns = ["Status Code", "Body", "Time Sent"];

    largeSections.push(
        <ResourceView
            isLoading={isLoadingError}
            loadingMessage={"Loading Endpoint Status Codes"}
            isError={isError}
            isSuccess={isSuccess}
        >
            <GenericTable
                tableRows={endpointResponsesRows}
                tableColumns={statusCodeTableColumns}
            />
        </ResourceView>
    );

    mediumSections.push(
        <ResourceView
            isLoading={isLoadingError}
            loadingMessage={"Loading Endpoint Status Codes"}
            isError={isError}
            isSuccess={isSuccess}
        >
            <EditEndpointForm />
        </ResourceView>
    );

    return (
        <div>
            <Header />
            <EndpointSubheader />
            <SideBar apis={apis} />
            <Main
                largeSections={largeSections}
                mediumSections={mediumSections}
            />
            <BottomFooter />
        </div>
    );
}
