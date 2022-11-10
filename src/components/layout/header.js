import React from "react";

const Header = () => {
  const account_types = ["Real", "Demo"];

  return (
    <section className="header">
      <span className="title">DTRADER AIR</span>
      <div className="acc-selector">
        {account_types.map((item) => (
          <div key={item} className="acc-type">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Header;
