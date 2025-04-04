import React from "react";

const Button = ({ onClickHandler, value, title }) => {
  return (
    <button
      onClick={onClickHandler}
      value={value}
      className={"py-1 px-4 border text-base hover:bg-blue hover:text-white"}
    >
      {title}
    </button>
  );
};

export default Button;
