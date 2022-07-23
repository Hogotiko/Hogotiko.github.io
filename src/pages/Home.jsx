import React, { useContext } from "react";
import { Card } from "../components/card";
import AppContext from "./../context";

export const Home = () => {
  const {
    goods,
    searchValue,
    searchInput,
    setSearchValue,
    onFavoriteCard,
    onAddCard,
  } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>
          {searchValue.length
            ? `Փնտրվում է ՝ ${searchValue}`
            : "Բոլոր բոթասները"}
        </h1>
        <div className="d-flex align-center search-block pos-r">
          <img src="img/search.svg" alt="" onClick={() => null} />
          <input
            type="text"
            value={searchValue}
            placeholder="Փնտրել ..."
            onChange={searchInput}
          />
          {searchValue && (
            <button
              style={{
                cursor: "pointer",
                position: "absolute",
                right: 7,
                border: "none",
                backgroundColor: "white",
              }}
              onClick={() => setSearchValue("")}
            >
              X
            </button>
          )}
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {goods
          ?.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((card) => (
            <Card
              card={card}
              key={card.id}
              onClickAdd={(item) => onAddCard(item)}
              onChecked={(item) => onFavoriteCard(item)}
            />
          ))}
      </div>
    </div>
  );
};
