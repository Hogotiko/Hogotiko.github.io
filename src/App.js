import { useEffect, useState } from "react";
import { Drawer } from "./components/drawer";
import { Header } from "./components/header";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Favorites } from "./pages/Favorites";
import { Orders } from "./pages/Orders";
import axios from "axios";
import AppContext from "./context";

function App() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [itemsInFavorite, setItemsInFavorite] = useState([]);
  const [itemsInOrder, setItemsInInOrder] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const cartResponse = await axios.get(
        //   "https://62d7eafc908831393586f2b7.mockapi.io/cart"
        // );
        // const favoritesResponse = await axios.get(
        //   "https://62d7eafc908831393586f2b7.mockapi.io/favorites"
        // );
        // const ordersResponse = await axios.get(
        //   "https://62d7eafc908831393586f2b7.mockapi.io/orders"
        // );
        // const goodsResponse = await axios.get(
        //   "https://62d7eafc908831393586f2b7.mockapi.io/goods"
        // );

        // Կարող ենք նաև գրել Promise all-ի միջոցով

        const [cartResponse, favoritesResponse, ordersResponse, goodsResponse] =
          await Promise.all([
            axios.get("https://62d7eafc908831393586f2b7.mockapi.io/cart"),
            axios.get("https://62d7eafc908831393586f2b7.mockapi.io/favorites"),
            axios.get("https://62d7eafc908831393586f2b7.mockapi.io/orders"),
            axios.get("https://62d7eafc908831393586f2b7.mockapi.io/goods"),
          ]);

        setItemsInCart(cartResponse.data);
        setItemsInFavorite(favoritesResponse.data);
        setItemsInInOrder(ordersResponse.data);
        setGoods(goodsResponse.data);
      } catch (error) {
        alert("Տվյալների հարցման սխալ");
      }
    };

    fetchData();
  }, []);

  const onAddCard = async (obj) => {
    try {
      if (itemsInCart.find((item) => item.id === obj.id)) {
        setItemsInCart((prev) => prev.filter((item) => item.id !== obj.id));
        await axios.delete(
          `https://62d7eafc908831393586f2b7.mockapi.io/cart/${obj.id}`
        );
      } else {
        setItemsInCart((prevState) => [...prevState, obj]);
        await axios.post(
          "https://62d7eafc908831393586f2b7.mockapi.io/cart",
          obj
        );
      }
    } catch (error) {
      alert("Չհաջողվեց ավելացնել զամբյուղի մեջ");
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://62d7eafc908831393586f2b7.mockapi.io/cart/${id}`);
      setItemsInCart((prevState) => prevState.filter((item) => item.id !== id));
    } catch (error) {
      alert("Տվյալների հեռացման սխալ");
    }
  };

  const onFavoriteCard = async (item) => {
    try {
      if (itemsInFavorite.find((obj) => +obj.id === +item.id)) {
        setItemsInFavorite((prev) => prev.filter((obj) => obj.id !== item.id));
        await axios.delete(
          `https://62d7eafc908831393586f2b7.mockapi.io/favorites/${item.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://62d7eafc908831393586f2b7.mockapi.io/favorites",
          item
        );
        setItemsInFavorite((prevState) => [...prevState, data]);
      }
    } catch (error) {
      alert("Չհաջողվեց ավելացնել ընտրանու մեջ");
    }
  };

  const onRemoveFavoriteCard = (id) => {
    try {
      setItemsInFavorite((prevState) =>
        prevState.filter((item) => item.id !== id)
      );
      axios.delete(
        `https://62d7eafc908831393586f2b7.mockapi.io/favorites/${id}`
      );
    } catch (error) {
      alert("Չհաջողվեց հեռացնել ընտրանուց");
    }
  };

  const searchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const cartClear = () => {
    setItemsInCart([]);
  };

  let totalPrice = itemsInCart
    .map(({ price }) => price)
    .reduce((akk, item) => (akk += item), 0);

  const isItemAdded = (id) => {
    return itemsInCart.some((obj) => +obj.id === +id);
  };

  const isFavoriteAdded = (id) => {
    return itemsInFavorite.some((obj) => +obj.id === +id);
  };

  return (
    <AppContext.Provider
      value={{
        goods,
        itemsInCart,
        itemsInFavorite,
        itemsInOrder,
        searchValue,
        totalPrice,
        cartClear,
        searchInput,
        onRemoveFavoriteCard,
        onFavoriteCard,
        setSearchValue,
        onAddCard,
        onRemoveItem,
        isItemAdded,
        isFavoriteAdded,
      }}
    >
      <div className="wrapper clear">
        <Drawer cartClose={() => setVisible(!visible)} visible={visible} />
        <Header cartOpen={() => setVisible(!visible)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
