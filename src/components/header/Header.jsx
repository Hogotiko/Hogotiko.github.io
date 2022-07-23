import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "./../../context";

export const Header = ({ cartOpen }) => {
  const { totalPrice } = useContext(AppContext);

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to={"/"}>
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.svg" alt="Close" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Լավագույն բոթասների խանութ</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex align-center">
        <li className="mr-30" onClick={cartOpen} title="Զամբյուղ">
          <img
            width="20"
            height="15"
            src="img/card.svg"
            alt="card"
            className="card"
          />
          <span className="ml-10">{totalPrice}դր․</span>
        </li>
        <li className="mr-30" title="Ընտրանի">
          <Link to={"/favorites"}>
            <img width="20" height="20" src="img/heart.svg" alt="favorites" />
          </Link>
        </li>
        <li title="Պրոֆիլ">
          <Link to={"/orders"}>
            <img width="20" height="20" src="img/user.svg" alt="user" />
          </Link>
        </li>
      </ul>
    </header>
  );
};
