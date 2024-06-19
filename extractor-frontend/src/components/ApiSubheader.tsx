import { Button } from "flowbite-react";
import { Endpoint } from "../model/Endpoint.ts";
import { CreateEndpointForm } from "./CreateEndpointForm.tsx";
import { FaPlus } from "react-icons/fa";
import { GenericModal } from "./GenericModal.tsx";
import { Link } from "react-router-dom";
import { useDeleteApi } from "../hooks/useDeleteApi.ts";
import { useContext } from "react";
import ApisContext from "../context/ApisContext.ts";

export function ApiSubheader({
    endpoints,
    apiUUID,
}: {
    endpoints: Endpoint[];
    apiUUID: string;
}) {
    const { currentApi } = useContext(ApisContext);
    const { removeApi } = useDeleteApi();

    const handleDeleteApi = async () => {
        try {
            await removeApi(currentApi?.uuid || "");
        } catch (error) {
            console.error("Error deleting API:", error);
        }
    };

    return (
        <div className={"border-t-2 pt-5"}>
            <div className={"flex justify-between "}>
                <div className="md:block w-64" />
                <div className={"flex"}>
                    {endpoints.map((endpoint) => (
                        <Button
                            key={endpoint.uuid}
                            className={"mr-2"}
                            size={"small"}
                            as={Link}
                            to={`/api/${apiUUID}/endpoints/${endpoint.uuid}`}
                        >
                            {endpoint.name}
                        </Button>
                    ))}
                    <Button onClick={() => handleDeleteApi()} color={"failure"}>
                        Delete Api
                    </Button>
                    <GenericModal
                        headerTitle={"Create Endpoint"}
                        modelBody={
                            <CreateEndpointForm
                                apiUUID={apiUUID}
                                onCloseModal={() => console.log("win")}
                            />
                        }
                        modalActivator={
                            <div className="flex flex-row gap-2">
                                <FaPlus />
                                <span>Create Endpoint</span>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
