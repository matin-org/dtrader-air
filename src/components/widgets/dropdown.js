import React, { useEffect, useState } from "react";
import Select from "react-select";

const Dropdown = ({ label = "", value = "", options = [], onChange }) => {
  const [current_value, setValue] = useState(value);
  const [current_options, setOptions] = useState(options);

  useEffect(() => {
    setValue(value);
    setOptions(options);
  }, [value, options]);

  return (
    <div className="dropdown-widget">
      <label>{label}</label>
      <Select
        options={current_options}
        value={current_value}
        onChange={onChange}
      />
    </div>
  );
};

export default Dropdown;
