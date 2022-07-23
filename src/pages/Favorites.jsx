import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/card";
import { Info } from "../components/Info";
import AppContext from "./../context";

export const Favorites = () => {
  const { itemsInFavorite, onAddCard } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex  align-center mb-40">
        <Link to={"/"}>
          <img src="img/back.svg" alt="back" className="mr-20 " />
        </Link>
        <h1>{itemsInFavorite.length ? "Իմ ընտրանին" : null}</h1>
      </div>

      <div className="d-flex flex-wrap">
        {itemsInFavorite.length ? (
          itemsInFavorite?.map((item) => (
            <Card
              card={item}
              key={item.id}
              favorited={true}
              onClickAdd={(item) => onAddCard(item)}
            />
          ))
        ) : (
          <Info
            image={"img/smile.svg"}
            title={"Ընտրանին դատարկ է :("}
            description={"Դուք ոչինչ չեք ավելացրել"}
          />
        )}
      </div>
    </div>
  );
};
