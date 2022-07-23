import React, { useContext, useState } from "react";
import styles from "./drawer.module.scss";
import AppContext from "./../../context";
import { Info } from "./../Info";
import axios from "axios";

export const Drawer = ({ cartClose, visible }) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { onRemoveItem, itemsInCart, totalPrice, cartClear } =
    useContext(AppContext);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onClickOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://62d7eafc908831393586f2b7.mockapi.io/orders",
        { orders: itemsInCart }
      );
      setOrderId(data.id);
      setIsOrdered(true);
      for (let i = 0; i < itemsInCart.length; i++) {
        const item = itemsInCart[i];
        await axios.delete(
          `https://62d7eafc908831393586f2b7.mockapi.io/cart/${item.id}`
        );
        await delay(1000);
      }
      cartClear();
    } catch (error) {
      alert("Չհաջողվեց ձևակերպել պատվեր");
    }
    setLoading(false);
  };

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.overlayVisible : null}`}
    >
      <div className={styles.drawer}>
        <div className="mb-30 d-flex justify-between align-center">
          <h2>Զամբյուղ</h2>
          {/* <button
            className="greenButton"
            style={{
              width: "150px",
              height: "40px",
              backgroundColor: "violet",
            }}
            onClick={cartClear}
          >
            Մաքրել զամբյուղը
          </button> */}
          <img
            src="img/delete.svg"
            alt=""
            className="remove-btn"
            onClick={cartClose}
          />
        </div>
        {itemsInCart.length ? (
          <>
            <div className={styles.items}>
              {itemsInCart.map(({ id, title, img, price }) => (
                <div className="d-flex align-center cart-item mb-20" key={id}>
                  <div
                    className="cart-item-img"
                    style={{ backgroundImage: `url(${img})` }}
                  ></div>
                  <div className="mr-20">
                    <p className="mb-5">{title}</p>
                    <b>{price}</b>
                  </div>
                  <img
                    src="img/delete.svg"
                    alt="remove"
                    className="remove-btn"
                    onClick={() => onRemoveItem(id)}
                  />
                </div>
              ))}
            </div>
            {loading && (
              <h2
                style={{ color: "violet" }}
                className="d-flex align-center justify-center"
              >
                Պատվերը կատարվում է
              </h2>
            )}
            <div className="cart-total-block">
              <ul>
                <li>
                  <span>Ընդհանուր ՝</span>
                  <div></div>
                  <b>{totalPrice} դր․</b>
                </li>
                <li>
                  <span>ԱԱՀ 5% ՝</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} դր․</b>
                </li>
              </ul>

              <button
                disabled={loading}
                className="greenButton"
                onClick={onClickOrder}
              >
                Ձևակերպել պատվեր <img src="img/arrow.svg" alt="" />
              </button>
            </div>
          </>
        ) : (
          <Info
            cartClose={cartClose}
            image={isOrdered ? "img/order.svg" : "img/box-empty.svg"}
            title={isOrdered ? "Պատվերը ձևակերպվեց" : "Զամբյուղը դատարկ է"}
            description={
              isOrdered
                ? `Ձեր ${orderId}-րդ համարի պատվերը շուտով կփոխանցվի առաքման ծառայությանը`
                : "Պատվեր կատարելու համար գոնե մի երկու զույգ ավելացրեք"
            }
          />
        )}
      </div>
    </div>
  );
};
