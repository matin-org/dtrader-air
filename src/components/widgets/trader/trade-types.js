import React, { useEffect, useState } from "react";
import { Dropdown } from "components/widgets";
import { DtraderAirStore, useDtraderAirWS } from "store";
import { getContractTypesConfig } from "helpers";

const TradeTypes = () => {
  const { send } = useDtraderAirWS();
  const { useContract, useContracts, useSymbol, useToggleOptions } =
    React.useContext(DtraderAirStore);
  const [contract, setContract] = useContract;
  const [contracts, setContracts] = useContracts;
  const [symbol] = useSymbol;
  const [, setOptionsOpen] = useToggleOptions;

  let available_contract_types = {};
  let contract_types;

  // Fetch Contracts for symbol
  useEffect(() => {
    contract_types = getContractTypesConfig(symbol);

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

            available.forEach((contract) => {
              const type = Object.keys(contract_types).find(
                (key) =>
                  contract_types[key].trade_types.indexOf(
                    contract.contract_type
                  ) !== -1 &&
                  (typeof contract_types[key].barrier_count === "undefined" ||
                    +contract_types[key].barrier_count === contract.barriers) // To distinguish betweeen Rise/Fall & Higher/Lower
              );

              if (!type) return; // ignore unsupported contract types

              if (!available_contract_types[type]) {
                // populate available contract types (Dirty deep cloning though)
                available_contract_types[type] = JSON.parse(
                  JSON.stringify(contract_types[type])
                );
              }
            });

            setContracts(
              Object.keys(available_contract_types).map((key) => {
                return available_contract_types[key];
              })
            );
          }
        }
      );
    }
  }, [symbol]);

  return (
    <div className="trading-widget">
      <Dropdown
        options={contracts.map((c) => {
          return {
            label: c.title,
            value: c,
          };
        })}
        label="Trade Types"
        value={contract}
        onChange={(e) => {
          setContract(e.value);
          setOptionsOpen(false);
        }}
      />
    </div>
  );
};

export default TradeTypes;
