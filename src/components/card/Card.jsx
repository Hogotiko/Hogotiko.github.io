import React, { useContext, useState } from "react";
import styles from "./card.module.scss";
import MyLoader from "./../MyLoader";
import AppContext from "./../../context";

export const Card = ({
  card,
  onClickAdd,
  onChecked,
  disabled,
  favorited = false,
  isloading = false,
}) => {
  const { onRemoveFavoriteCard, isItemAdded } = useContext(AppContext);

  const { id, img, title, price } = card;

  const [isFavorite, setIsFavorite] = useState(favorited);

  const onAdd = () => {
    onClickAdd({ id, img, title, price });
  };

  const onFavorite = () => {
    onChecked({ id, img, title, price });
    setIsFavorite((prev) => !prev);
  };

  return (
    <>
      <div className={styles.card}>
        {isloading ? (
          <MyLoader />
        ) : (
          <>
            <div className={styles.favorite}>
              {!disabled && (
                <img
                  onClick={
                    isFavorite ? () => onRemoveFavoriteCard(id) : onFavorite
                  }
                  src={
                    isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"
                  }
                  alt="fav"
                />
              )}
            </div>
            <img src={img} alt="sneakers" width={133} height={112} />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span className="text-uppercase opacity-5">Գինը ՝</span>
                <b>{price} դր․</b>
              </div>

              {!disabled && (
                <img
                  className={styles.add}
                  src={isItemAdded(id) ? "img/add-checked.svg" : "img/add.svg"}
                  alt="add"
                  onClick={onAdd}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
