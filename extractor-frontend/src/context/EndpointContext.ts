import { createContext } from "react";
import { Endpoint } from "../model/Endpoint.ts";

export interface EndpointContext {
  currentEndpoint: Endpoint | undefined;
  setCurrentEndpoint: (endpoint: Endpoint) => void;
}

export default createContext<EndpointContext>({
  currentEndpoint: undefined,
  setCurrentEndpoint: () => { },
});
