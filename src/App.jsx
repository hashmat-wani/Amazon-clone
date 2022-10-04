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
import ResponsiveAppBar from "./ResponsiveAppBar";

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
      {/* <Header cartItems={cartItems} user={user} /> */}
      <ResponsiveAppBar />
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
  height: 100vh;
`;
