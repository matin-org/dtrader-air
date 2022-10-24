import React, { createContext, useEffect, useState } from "react";
import { useDerivApi } from "components/hooks/use-deriv-api";

export const DtraderAirStore = createContext(null);

export const DtraderAirProvider = ({ children }) => {
  const deriv_api = useDerivApi();

  const [market, setMarket] = useState(null);
  const [submarket, setSubMarket] = useState(null);
  const [instrument, setInstrument] = useState(null);

  return (
    <DtraderAirStore.Provider
      value={{
        deriv_api,
        useMarket: [market, setMarket],
        useSubMarket: [submarket, setSubMarket],
        useInstrument: [instrument, setInstrument],
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
