import React from "react";

export default function Button({ config = {}, handleClick, children }) {
  console.log("the config for the button is", config);
  return (
    <button
      className={`button ${config.class}`}
      type={`${config.type ? config.type : "button"}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
