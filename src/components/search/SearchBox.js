import React from "react";

export default function SearchBox({ getInputData }) {
  function handleInput(key, val) {
    getInputData({
      key,
      value: val
    });
  }
  return (
    <div>
      Search Box:
      <br />
      <input
        type="text"
        placeholder="pick up"
        onChange={handleInput.bind(this, "pickUp")}
      />
      <br />
      <input
        type="text"
        placeholder="drop off"
        onChange={handleInput.bind(this, "dropOff")}
      />
    </div>
  );
}
