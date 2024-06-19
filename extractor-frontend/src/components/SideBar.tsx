import { Sidebar } from "flowbite-react";
import { HiOutlineMinusSm, HiOutlinePlusSm, HiUser } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { MdOutlineDashboard } from "react-icons/md";
import { AiFillApi } from "react-icons/ai";
import { API } from "../model/API.ts";
import { Link } from "react-router-dom";
import { GenericModal } from "./GenericModal.tsx";
import ApisContext from "../context/ApisContext.ts";
import { useContext } from "react";
import EndpointContext from "../context/EndpointContext.ts";
import { CreateApiForm } from "./CreateApiForm.tsx";
import { FaPlus } from "react-icons/fa";
import SecurityContext from "../context/SecurityContext.ts";

export function SideBar({ apis }: { apis: API[] }) {
    const { setCurrentApi } = useContext(ApisContext);
    const { setCurrentEndpoint } = useContext(EndpointContext);
    const { isAuthenticated, loggedInUser } = useContext(SecurityContext);
    const { currentEndpoint } = useContext(EndpointContext);

    return (
        <Sidebar id={"default-sidebar"} aria-label={"sidebar"}>
            <Sidebar.Items
                className={
                    "h-screen fixed top-0 left-0 z-40 w-64 transition-transform bg-white border-r border-gray-200 -translate-x-full md:translate-x-0 dark:bg-gray-800"
                }
            >
                <Sidebar.ItemGroup className={"flex flex-col gap-4"}>
                    <div className="h-7" />
                    {isAuthenticated() && (
                        <Sidebar.ItemGroup>
                            <Sidebar.Item
                                as={Link}
                                to={"/settings"}
                                icon={HiUser}
                                size={50}
                            >
                                {loggedInUser}
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    )}
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            as={Link}
                            to={"/"}
                            icon={MdOutlineDashboard}
                        >
                            Dashboard
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                    {apis.map((api) => (
                        <Sidebar.Collapse
                            key={api.uuid}
                            icon={AiFillApi}
                            label={api.name}
                            renderChevronIcon={(theme, open) => {
                                const IconComponent = open
                                    ? HiOutlineMinusSm
                                    : HiOutlinePlusSm;

                                return (
                                    <IconComponent
                                        aria-hidden
                                        className={twMerge(
                                            theme.label.icon.open[
                                                open ? "on" : "off"
                                            ]
                                        )}
                                    />
                                );
                            }}
                        >
                            {api.endpoints.map((endpoint) => (
                                <Sidebar.Item
                                    key={endpoint.uuid}
                                    onClick={() => {
                                        setCurrentApi(api);
                                        setCurrentEndpoint(endpoint);
                                    }}
                                    as={Link}
                                    to={`/api/${api.uuid}/endpoint/${endpoint.uuid}`}
                                    className={
                                        endpoint.active
                                            ? "bg-green-200"
                                            : "bg-red-200"
                                    }
                                >
                                    {endpoint.name}

                                    {currentEndpoint?.uuid ===
                                        endpoint.uuid && (
                                        <span className="text-sm font-semibold text-gray-500">
                                            {" "}
                                            (Current)
                                        </span>
                                    )}
                                </Sidebar.Item>
                            ))}
                        </Sidebar.Collapse>
                    ))}
                    <Sidebar.Item className="flex flex-col align-middle">
                        <GenericModal
                            headerTitle={" Create Api"}
                            modelBody={
                                <CreateApiForm
                                    onCloseModal={() => console.log("close")}
                                />
                            }
                            modalActivator={
                                <FaPlus
                                    className="h-6 w-6"
                                    data-modal-target="create-api-modal"
                                    data-modal-toggle="create-api-modal"
                                />
                            }
                        />
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
