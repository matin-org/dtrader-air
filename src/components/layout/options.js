import React, { useEffect, useState } from "react";
import { useDtraderAirWS } from "store";
import { Dropdown, Indicator, Loader } from "components/widgets";

const Options = () => {
  const [is_loading, setLoading] = useState(true);
  const [markets, setMarkets] = useState({});
  const [symbol, setSymbol] = useState(null);
  const [selected_market, setSelectedMarket] = useState(null);
  const [selected_submarket, setSelectedSubMarket] = useState(null);
  const [selected_instruments, setSelectedInstruments] = useState(null);
  const [price, setPrice] = useState(null);
  const [prices, setPrices] = useState([]);
  const [subscription, setSubscription] = useState(null);

  const { send } = useDtraderAirWS();

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
          count: 99,
          end: "latest",
          start: 1,
          style: "ticks",
        },
        (response) => {
          if (response.history) {
            const { prices } = response.history;
            setPrices(prices);
          }
        }
      );
    }
  }, [symbol]);

  useEffect(() => {
    const new_prices = [...prices];

    if (new_prices.length) {
      new_prices.push(price);

      new_prices.shift();

      new_prices.sort(function (a, b) {
        return b - a;
      });

      setPrices(new_prices);
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

    if (selected_market) {
      const subs = markets[selected_market.value].submarkets;

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

    if (selected_market && selected_submarket) {
      const instruments =
        markets[selected_market.value].submarkets[selected_submarket.value]
          .instruments;

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

  if (is_loading) {
    return (
      <section className="common-container loading-container">
        <Loader />
        <Indicator price={price} prices={prices} />
      </section>
    );
  }
  return (
    <section className="common-container options-container">
      <Dropdown
        options={getMarketOptions()}
        label="Markets"
        value={selected_market}
        onChange={(e) => {
          setSelectedMarket(e);
          setSelectedSubMarket(null);
        }}
      />
      {selected_market && (
        <Dropdown
          options={getSubMarketOptions()}
          label="Sub Market"
          value={selected_submarket}
          onChange={(e) => {
            setSelectedSubMarket(e);
            setSelectedInstruments(null);
          }}
        />
      )}
      {selected_submarket && (
        <Dropdown
          options={getIntrumentOptions()}
          label="Intruments"
          value={selected_instruments}
          onChange={(e) => {
            setSelectedInstruments(e);
            setSymbol(e.value);
            setPrices([]);
            setPrice(null);
          }}
        />
      )}
      <Indicator price={price} prices={prices} />
    </section>
  );
};

export default Options;
