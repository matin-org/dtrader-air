import React from "react";
import { Header, Trade, Options } from "components/layout";
import { isMobile } from "helpers";

const App = () => {
  return (
    <section className="app">
      <Header />
      <section className="body-container">
        <Options />
        <Trade />
      </section>
    </section>
  );
};

export default App;
