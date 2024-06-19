import { ReactElement, useState } from "react";
import { Endpoint } from "../model/Endpoint.ts";
import EndpointContext from "./EndpointContext.ts";

interface WithChildren {
  children: ReactElement | ReactElement[];
}

export default function EndpointContextProvider({ children }: WithChildren) {
  const [currentEndpoint, setCurrentEndpoint] = useState<Endpoint | undefined>(
    undefined,
  );

  return (
    <EndpointContext.Provider
      value={{
        currentEndpoint: currentEndpoint,
        setCurrentEndpoint: setCurrentEndpoint,
      }}
    >
      {children}
    </EndpointContext.Provider>
  );
}
