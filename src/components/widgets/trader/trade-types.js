import React, { useEffect, useState } from "react";
import { Dropdown } from "components/widgets";
import { DtraderAirStore, useDtraderAirWS } from "store";

const TradeTypes = () => {
  const { send } = useDtraderAirWS();
  const { useSymbol, useToggleOptions } = React.useContext(DtraderAirStore);
  const [symbol] = useSymbol;
  const [contracts, setContracts] = useState([]);

  const [, setOptionsOpen] = useToggleOptions;

  // Fetch Contracts for symbol
  useEffect(() => {
    if (symbol) {
      send(
        {
          contracts_for: symbol,
          product_type: "basic",
        },
        (response) => {
          if (response.contracts_for) {
            const { contracts_for } = response;
            const { available } = contracts_for;

            const filtered_contracts = [
              ...new Set(available.map((c) => c.contract_category_display)),
            ];

            setContracts(filtered_contracts);
          }
        }
      );
    }
  }, [symbol]);

  return (
    <div className="trading-widget">
      <Dropdown
        options={contracts.map((e) => {
          return {
            label: e,
            value: e,
          };
        })}
        label="Trade Types"
        value={null}
        onChange={(e) => {
          setOptionsOpen(false);
        }}
      />
    </div>
  );
};

export default TradeTypes;
