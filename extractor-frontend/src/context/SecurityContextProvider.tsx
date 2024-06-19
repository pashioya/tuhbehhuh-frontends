import { ReactNode, useState, useEffect } from "react";
import SecurityContext from "./SecurityContext";
import {
    addAccessTokenToAuthHeader,
    removeAccessTokenFromAuthHeader,
} from "../services/Auth";
import { isExpired } from "react-jwt";
import Keycloak from "keycloak-js";

interface IWithChildren {
    children: ReactNode;
}

const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
};
const keycloak: Keycloak = new Keycloak(keycloakConfig);

export default function SecurityContextProvider({ children }: IWithChildren) {
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(
        undefined,
    );
    const [kcInitialized, setKcInitialized] = useState(false);

        // TODO: This useEffect runs twice causing the keycloack initialised twice error.

        //  possible fix is using useRef instead of useState. runs fine as long as strict mode is off. should run perfect when we build for production. even with strict mode on*
    useEffect(() => {
        const initKeycloak = async () => {
            if (!kcInitialized) {
                keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
                    setKcInitialized(authenticated);
                });
            }
        };
        initKeycloak();
    }, [kcInitialized]);

    keycloak.onAuthSuccess = () => {
        addAccessTokenToAuthHeader(keycloak.token);
        setLoggedInUser(keycloak.idTokenParsed?.name);
    };

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader();
    };

    keycloak.onAuthError = () => {
        removeAccessTokenFromAuthHeader();
    };

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(function() {
            addAccessTokenToAuthHeader(keycloak.token);
            setLoggedInUser(keycloak.idTokenParsed?.name);
        });
    };

    function logout() {
        const logoutOptions = { redirectUri: import.meta.env.VITE_REACT_APP_URL };
        keycloak.logout(logoutOptions).then(() => console.log("logged out"));
    }

    function isAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token);
        else return false;
    }

    return (
        <SecurityContext.Provider
            value={{
                isAuthenticated,
                loggedInUser,
                logout,
            }}
        >
            {children}
        </SecurityContext.Provider>
    );
}
