import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/card";
import AppContext from "./../context";
import { Info } from "./../components/Info";

export const Orders = () => {
  const { itemsInOrder } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex  align-center mb-40">
        <Link to={"/"}>
          <img src="img/back.svg" alt="back" className="mr-20 " />
        </Link>
        <h1>{itemsInOrder.length ? "Իմ գնումները" : null}</h1>
      </div>

      <div className="d-flex flex-wrap">
        {itemsInOrder.length ? (
          itemsInOrder.map((item) =>
            item.orders.map((order) => (
              <Card
                card={order}
                key={order.id}
                favorited={false}
                disabled={true}
              />
            ))
          )
        ) : (
          <Info
            image={"img/smile2.svg"}
            title={"Դուք չունեք պատվերներ"}
            description={"Դուք քձիպ եք՞, գոնե մի բան պատվիրեք"}
          />
        )}
      </div>
    </div>
  );
};
