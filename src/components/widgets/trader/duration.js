import React, { useEffect, useState } from "react";
import { Dropdown, Number } from "components/widgets";
import { DtraderAirStore } from "store";

const Duration = ({ onValueChange, onDurationChange }) => {
  const { useToggleOptions } = React.useContext(DtraderAirStore);
  const [, setOptionsOpen] = useToggleOptions;
  const durations = [
    {
      label: "Ticks",
      value: "t",
    },
    {
      label: "Seconds",
      value: "s",
    },
    {
      label: "Minutes",
      value: "m",
    },
    {
      label: "Hours",
      value: "h",
    },
    {
      label: "Days",
      value: "d",
    },
  ];

  const [duration_type, setDurationType] = useState(durations[0]);

  return (
    <div className="trading-widget">
      <Dropdown
        options={durations}
        label="Duration"
        value={duration_type}
        onChange={(e) => {
          setDurationType(e);
          setOptionsOpen(false);

          if (onDurationChange) {
            onDurationChange(e);
          }
        }}
      />
      <Number
        onChange={(e) => {
          setOptionsOpen(false);

          if (onValueChange) {
            onValueChange(e);
          }
        }}
      />
    </div>
  );
};

export default Duration;
