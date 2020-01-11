import React from "react";
import "./ButtonStyle.scss";

const Button = ({ content, ...props }) => {
  return (
    <button className="button-default" {...props}>
      {content}
    </button>
  );
};

export default Button;
