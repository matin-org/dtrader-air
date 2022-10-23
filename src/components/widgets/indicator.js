import React, { useEffect, useRef, useState } from "react";

const Indicator = ({ price, prices }) => {
  const [current_price, setPrice] = useState(price);
  const [current_prices, setPrices] = useState(prices);
  const price_ref = useRef();

  useEffect(() => {
    setPrice(price);
    setPrices(prices);
  }, [price, prices]);

  return (
    <div className="indicator-widget">
      <div className="graph-box">
        {current_prices.map((p, pk) => {
          const multiplier = 1;
          const pos = pk * multiplier;

          if (current_price === p && price_ref.current) {
            price_ref.current.style.top = `${pos}px`;
          }

          return (
            <span
              className="graph-item"
              key={`${p}-${pk}`}
              style={{
                top: `${pos}%`,
              }}
            >
              {p}
            </span>
          );
        })}

        {current_price && (
          <div className="price-box" ref={price_ref}>
            {current_price}
          </div>
        )}
      </div>
    </div>
  );
};

export default Indicator;
