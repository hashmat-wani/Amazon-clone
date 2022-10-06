import "./App.css";
import Header from "./Components/Header";
import Cart from "./Components/cart/Cart";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { db } from "./db/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import Login from "./Components/Login";
import AddProduct from "./Components/product/AddProduct";

function App() {
  // to keep user logged in always.
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [products, setProducts] = useState([]);

  //api call to fetch products data
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const productsColl = collection(db, "products");
    getDocs(productsColl).then((snapshot) =>
      setProducts(
        snapshot.docs.map((pro) => ({
          id: pro.id,
          ...pro.data(),
        }))
      )
    );
  };

  const [cartItems, setCartItems] = useState([]);
  const cartColl = collection(db, "cartitems");
  //api call to fetch cart data
  useEffect(() => {
    getCartItems();
  }, []);
  const getCartItems = () => {
    getDocs(cartColl).then((snapshot) => {
      setCartItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  return (
    <Container>
      <Header cartItems={cartItems} user={user} />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route
          path="/addproduct"
          element={<AddProduct products={products} />}
        />
      </Routes>
    </Container>
  );
}

export default App;

const Container = styled.div`
  min-height: 100vh;
  background-color: #eaeded;
`;
