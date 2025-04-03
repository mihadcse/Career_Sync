import React from "react";

const Button = (onClickHandler, value, title) => {
  return (
    <button
      onClick={onClickHandler}
      value={value}
      className={
        "bg-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4"
      }
    >
      {value} {title}
    </button>
  );
};

export default Button;
