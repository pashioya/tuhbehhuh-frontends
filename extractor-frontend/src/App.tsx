import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Endpoint } from "./pages/Endpoint.tsx";
import ApisContextProvider from "./context/ApisContextProvider.tsx";
import EndpointContextProvider from "./context/EndpointContextProvider.tsx";
import { Api } from "./pages/Api.tsx";
import SecurityContextProvider from "./context/SecurityContextProvider.tsx";
import RouteGuard from "./components/RouteGuard.tsx";
import { SpeedInsights } from "@vercel/speed-insights/next";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SpeedInsights />
            <SecurityContextProvider>
                <ApisContextProvider>
                    <EndpointContextProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route
                                    path={"/"}
                                    element={
                                        <RouteGuard component={<Dashboard />} />
                                    }
                                />
                                <Route
                                    path={
                                        "/api/:apiUUID/endpoint/:endpointUuid"
                                    }
                                    element={
                                        <RouteGuard component={<Endpoint />} />
                                    }
                                />
                                <Route
                                    path={"/api/:apiUUID"}
                                    element={<RouteGuard component={<Api />} />}
                                />
                                <Route
                                    path="*"
                                    element={
                                        <RouteGuard component={<Dashboard />} />
                                    }
                                />
                            </Routes>
                        </BrowserRouter>
                    </EndpointContextProvider>
                </ApisContextProvider>
            </SecurityContextProvider>
        </QueryClientProvider>
    );
}

export default App;
