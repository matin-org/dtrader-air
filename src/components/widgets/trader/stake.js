import React, { useEffect, useState } from "react";
import { Number } from "components/widgets";
import { DtraderAirStore } from "store";

const Stake = ({ onChange, value = 1 }) => {
  const { useToggleOptions } = React.useContext(DtraderAirStore);
  const [, setOptionsOpen] = useToggleOptions;
  const [current_value, setValue] = useState(value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <div className="trading-widget">
      <Number
        title="Stake"
        value={current_value}
        onChange={(e) => {
          setOptionsOpen(false);

          if (onChange) {
            onChange(e);
          }
        }}
      />
    </div>
  );
};

export default Stake;
