import React, { createContext, useState } from "react";
import { useDerivApi } from "components/hooks/use-deriv-api";

export const DtraderAirStore = createContext(null);

export const DtraderAirProvider = ({ children }) => {
  const deriv_api = useDerivApi();

  const [market, setMarket] = useState(null);
  const [submarket, setSubMarket] = useState(null);
  const [instrument, setInstrument] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [symbol, setSymbol] = useState(null);
  const [is_options_open, setOptionsOpen] = useState(true);

  return (
    <DtraderAirStore.Provider
      value={{
        deriv_api,
        useMarket: [market, setMarket],
        useSubMarket: [submarket, setSubMarket],
        useInstrument: [instrument, setInstrument],
        useAccounts: [accounts, setAccounts],
        useSymbol: [symbol, setSymbol],
        useToggleOptions: [is_options_open, setOptionsOpen],
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
