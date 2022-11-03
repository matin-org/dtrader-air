import React, { useEffect, useState } from "react";
import Select from "react-select";

const Number = ({ title, min = 1, max = 10, value = 1, onChange }) => {
  const [current_value, setValue] = useState(value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const updateNumber = (operation) => {
    let new_value = current_value;

    if (operation === "add") {
      new_value += 1;
    } else {
      new_value -= 1;
    }

    new_value = getValueLimits(new_value);

    onChange(new_value);
    setValue(new_value);
  };

  const getValueLimits = (value) => {
    value = value > max ? max : value;
    value = value < min ? min : value;

    return value;
  };

  return (
    <div className="input-widget">
      {title && <span className="input-header">{title}</span>}
      <div className="input-body">
        <span
          className="controls"
          onClick={() => {
            updateNumber("sub");
          }}
        >
          -
        </span>
        <input
          type="number"
          value={current_value}
          min={min}
          max={max}
          onChange={(e) => {
            let new_value = e.target.value;

            new_value = getValueLimits(new_value);

            setValue(new_value);

            onChange(new_value);
          }}
        />

        <span
          className="controls"
          onClick={() => {
            updateNumber("add");
          }}
        >
          +
        </span>
      </div>
    </div>
  );
};

export default Number;
