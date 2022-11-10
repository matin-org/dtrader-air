import React from "react";
import { DtraderAirStore } from "store";

const Header = () => {
  const { useSelectedAcc } = React.useContext(DtraderAirStore);
  const [selected_acc] = useSelectedAcc;
  const account_types = ["Real", "Demo"];

  const getClassname = (acc) => {
    if (!selected_acc.includes("VRTC") && acc !== "Demo")
      return "acc-type-selected";
  };

  return (
    <section className="header">
      <span className="title">DTRADER AIR</span>
      <div className="acc-selector">
        {account_types.map((item) => (
          <div key={item} className={`acc-type ${getClassname(item)}`}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Header;
