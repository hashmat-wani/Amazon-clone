import "./App.css";
import Header from "./Components/Header";
import Cart from "./Components/cart/Cart";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import Login from "./Components/Login";
import AddProduct from "./Components/product/AddProduct";
import { fetchProducts } from "./redux/productsSlice";
import { fetchCartProducts } from "./redux/cartSlice";
import { useDispatch } from "react-redux";

function App() {
  // to keep user logged in always.
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const dispatch = useDispatch();
  //dispatching fetchProducts function to fetch products and store in redux store
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // const [cartItems, setCartItems] = useState([]);
  //api call to fetch cart data
  useEffect(() => {
    dispatch(fetchCartProducts());
  }, []);

  return (
    <Container>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </Container>
  );
}

export default App;

const Container = styled.div`
  min-height: 100vh;
  background-color: #eaeded;
`;
