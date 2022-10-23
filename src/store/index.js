import React, { createContext } from "react";
import { useDerivApi } from "components/hooks/use-deriv-api";

export const DtraderAirStore = createContext(null);

export const DtraderAirProvider = ({ children }) => {
  const deriv_api = useDerivApi();

  return (
    <DtraderAirStore.Provider
      value={{
        deriv_api,
      }}
    >
      {children}
    </DtraderAirStore.Provider>
  );
};

export const useDtraderAirWS = () => {
  const {
    deriv_api: { send },
  } = React.useContext(DtraderAirStore);

  return { send };
};
