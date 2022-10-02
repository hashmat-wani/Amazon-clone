import "./App.css";
import Header from "./components/Header";
import Cart from "./components/cart/Cart";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { db } from "./db/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [cartItems, setCartItems] = useState([]);
  const cartColl = collection(db, "cartitems");

  const getCartItems = () => {
    getDocs(cartColl).then((snapshot) => {
      setCartItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  useEffect(() => {
    getCartItems();
  }, [cartItems]);
  return (
    <Container>
      <Header cartItems={cartItems} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
      </Routes>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: #eaeded;
  height: 100vh;
`;
