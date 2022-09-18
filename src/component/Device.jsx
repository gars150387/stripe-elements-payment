import React from "react";
import { useState } from "react";

export const Device = () => {
  const [device, setDevice] = useState(0);

  const handleAdd = () => {
    return setDevice(device + 1);
  };

  const handleReduce = () => {
    return setDevice(device - 1);
  };

  return (
    <div>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleReduce}>Reduce</button>
      <strong>{device}</strong>
    </div>
  );
};


