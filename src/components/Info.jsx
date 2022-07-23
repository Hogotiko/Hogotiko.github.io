import React from "react";
import { useNavigate } from "react-router-dom";

export const Info = ({ cartClose, image, description, title }) => {
  const navigate = useNavigate();

  return (
    <div className="empty d-flex flex-column align-center  flex">
      <img src={image} alt="box" className="mb-20" width={120} />
      <h2>{title}</h2>
      <p>{description}</p>
      <button
        className="greenButton"
        onClick={cartClose ? cartClose : () => navigate("/")}
      >
        Հետ գնալ <img src="/img/arow-left.svg" alt="back" />
      </button>
    </div>
  );
};
