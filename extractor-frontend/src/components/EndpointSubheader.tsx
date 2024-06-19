import { Button } from "flowbite-react";
import { useContext } from "react";
import ApisContext from "../context/ApisContext.ts";
import EndpointContext from "../context/EndpointContext.ts";
import { useToggleEndpoint } from "../hooks/useToggleEndpoint.ts";
import { useDeleteEndpoint } from "../hooks/useDeleteEndpoint.ts";

export function EndpointSubheader() {
    const { currentEndpoint, setCurrentEndpoint } = useContext(EndpointContext);
    const { currentApi } = useContext(ApisContext);

    const {
        enableEndpoint,
        isEndpointActivationPending,
        disableEndpoint,
        isEndpointDeactivationPending,
    } = useToggleEndpoint(currentEndpoint?.uuid || "");

    const { removeEndpoint } = useDeleteEndpoint();

    const toggleEndpoint = () => {
        if (currentEndpoint?.uuid) {
            try {
                if (currentEndpoint?.active) {
                    disableEndpoint();
                    currentEndpoint.active = false;
                    setCurrentEndpoint(currentEndpoint);
                } else {
                    enableEndpoint();
                    currentEndpoint.active = true;
                    setCurrentEndpoint(currentEndpoint);
                }
            } catch (error) {
                console.error("Error toggling endpoint:", error);
            }
        }
    };
    return (
        <div className={"border-t-2 pt-5"}>
            <div className={"flex justify-between grid-flow-row "}>
                <div className="md:block w-64" />
                <span className="text-xl font-semibold dark:text-white">
                    {currentApi?.name}~{currentEndpoint?.name}
                </span>
                <div className={"flex gap-2"}>
                    <Button
                        color={currentEndpoint?.active ? "red" : "green"}
                        onClick={() => toggleEndpoint()}
                        disabled={
                            isEndpointActivationPending ||
                            isEndpointDeactivationPending
                        }
                    >
                        {currentEndpoint?.active ? "Disable" : "Enable"}
                    </Button>
                    <Button
                        onClick={() =>
                            removeEndpoint(currentEndpoint?.uuid || "")
                        }
                        color={"failure"}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}
