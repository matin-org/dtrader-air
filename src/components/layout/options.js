import React, { useEffect, useState, useRef } from "react";
import { useDtraderAirWS, DtraderAirStore } from "store";
import { Dropdown, Indicator, Loader } from "components/widgets";
import { MAX_PRICES_LENGTH, MAX_TICKS_HISTORY } from "helpers";

const Options = () => {
  const { send } = useDtraderAirWS();
  const { useMarket, useSubMarket, useInstrument } =
    React.useContext(DtraderAirStore);

  const [is_loading, setLoading] = useState(true);
  const [is_open, setOpen] = useState(true);
  const [markets, setMarkets] = useState({});
  const [symbol, setSymbol] = useState(null);
  const [market, setMarket] = useMarket;
  const [submarket, setSubMarket] = useSubMarket;
  const [instrument, setInstrument] = useInstrument;
  const [price, setPrice] = useState(null);
  const [subscription, setSubscription] = useState(null);
  let prices = useRef([]);

  useEffect(() => {
    send(
      {
        active_symbols: "brief",
        product_type: "basic",
      },
      (response) => {
        if (response.active_symbols) {
          const active_symbols = response.active_symbols;
          const new_markets = {};

          active_symbols.forEach(
            ({
              market,
              market_display_name,
              submarket,
              submarket_display_name,
              symbol,
              exchange_is_open,
              display_name,
            }) => {
              if (!new_markets[market]) {
                new_markets[market] = {
                  id: market,
                  market_display_name,
                  submarkets: {},
                };
              }

              if (!new_markets[market]?.submarkets[submarket]) {
                new_markets[market].submarkets[submarket] = {
                  id: submarket,
                  submarket_display_name,
                  instruments: [],
                };
              }

              new_markets[market].submarkets[submarket].instruments.push({
                symbol,
                exchange_is_open,
                submarket,
                market,
                display_name,
              });
            }
          );

          setMarkets(new_markets);
          setLoading(false);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (symbol) {
      if (subscription) {
        send({
          forget: subscription,
        });
      }

      send(
        {
          ticks: symbol,
          subscribe: 1,
        },
        (response) => {
          if (response.tick) {
            const { tick, subscription } = response;
            const { quote } = tick;
            const { id } = subscription;

            setSubscription(id);
            setPrice(quote);
          }
        }
      );

      send(
        {
          ticks_history: symbol,
          adjust_start_time: 1,
          count: MAX_TICKS_HISTORY,
          end: "latest",
          start: 1,
          style: "ticks",
        },
        (response) => {
          if (response.history) {
            const { prices: current_prices } = response.history;
            prices.current = current_prices;
          }
        }
      );
    }
  }, [symbol]);

  useEffect(() => {
    if (prices.current.length) {
      prices.current.push(price);

      prices.current.sort(function (a, b) {
        return b - a;
      });

      if (prices.current.length > MAX_PRICES_LENGTH) {
        prices.current.length = MAX_TICKS_HISTORY;
      }
    }
  }, [price]);

  const getMarketOptions = () => {
    const market_options = [];

    Object.keys(markets).forEach((k) => {
      const market = markets[k];

      const { id, market_display_name } = market;
      market_options.push({
        label: market_display_name,
        value: id,
      });
    });

    return market_options;
  };

  const getSubMarketOptions = () => {
    const submarket_options = [];

    if (market) {
      const subs = markets[market.value].submarkets;

      Object.keys(subs).forEach((k) => {
        const submarket = subs[k];

        const { id, submarket_display_name } = submarket;

        submarket_options.push({
          label: submarket_display_name,
          value: id,
        });
      });
    }

    return submarket_options;
  };

  const getIntrumentOptions = () => {
    const instrument_options = [];

    if (market && submarket) {
      const instruments =
        markets[market.value].submarkets[submarket.value].instruments;

      Object.keys(instruments).forEach((k) => {
        const instrument = instruments[k];

        const { symbol, display_name } = instrument;

        instrument_options.push({
          label: display_name,
          value: symbol,
        });
      });
    }

    return instrument_options;
  };

  const getMarketData = () => {
    if (market && submarket && instrument) {
      return markets[market.value].submarkets[submarket.value].instruments.find(
        ({ symbol }) => symbol === instrument.value
      );
    }

    return null;
  };

  if (is_loading) {
    return (
      <section className="common-container loading-container">
        <Loader />
        <Indicator price={price} prices={prices.current} />
      </section>
    );
  }
  return (
    <section
      className={`common-container options-container ${is_open ? "open" : ""}`}
    >
      <Dropdown
        options={getMarketOptions()}
        label="Markets"
        value={market}
        onChange={(e) => {
          setMarket(e);
          setSubMarket(null);
        }}
      />
      {market && (
        <Dropdown
          options={getSubMarketOptions()}
          label="Sub Market"
          value={submarket}
          onChange={(e) => {
            setSubMarket(e);
            setInstrument(null);
          }}
        />
      )}
      {submarket && (
        <Dropdown
          options={getIntrumentOptions()}
          label="Intruments"
          value={instrument}
          onChange={(e) => {
            setInstrument(e);
            setSymbol(e.value);
            setPrice(null);
            prices = [];
          }}
        />
      )}
      <Indicator
        price={price}
        prices={prices.current}
        instrument={getMarketData()}
      />
      <span className="toggle-btn" onClick={() => setOpen((e) => !e)}></span>
      <div className="option-banner">
        {instrument?.label || "Choose Market"}
      </div>
    </section>
  );
};

export default Options;
