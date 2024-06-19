import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { FcFilingCabinet } from "react-icons/fc";
import { FiAlignLeft } from "react-icons/fi";
import { useContext } from "react";
import SecurityContext from "../context/SecurityContext.ts";

export function Header() {
    const { isAuthenticated, logout } = useContext(SecurityContext);
    return (
        <Navbar fluid rounded border={true}>
            <Navbar.Brand as={Link} href="/">
                <div className="w-64 md:block hidden cursor"></div>
                <Button
                    color={"gray"}
                    size="md"
                    className="md:hidden mr-4"
                    data-drawer-target="sidebar"
                    data-drawer-toggle="sidebar"
                    aria-controls="sidebar"
                    type={"button"}
                >
                    <FiAlignLeft />
                </Button>
                <FcFilingCabinet />
                <span className="text-xl font-semibold dark:text-white">
                    Extractor Configurator
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="gap-3">
                <Button as={Link} to={"/settings"}>
                    Settings
                </Button>
                {isAuthenticated() && (
                    <Button type={"submit"} onClick={logout}>
                        Logout
                    </Button>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}
