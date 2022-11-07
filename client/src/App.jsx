import "./App.css";
// import Header from "./Components/Header";
// import Cart from "./Components/cart/Cart";
// import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
// import Login from "./Components/Login";
import AddProduct from "./Components/product/AddProduct";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "./redux/productsSlice";
// import { fetchCartItems } from "./redux/cartSlice";
// import { fetchSavedItems } from "./redux/savedItemsSlice";

function App() {
  // const dispatch = useDispatch();
  //dispatching fetchProducts function to fetch products and store in redux store
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, []);

  // const { user } = useSelector((state) => state.authReducer);
  // const email = user ? user.email : null;

  //api call to fetch cart data
  // useEffect(() => {
  //   // dispatch(fetchCartItems(email));
  // }, []);

  //api call to fetch savedItem data
  // useEffect(() => {
  //   dispatch(fetchSavedItems());
  // }, []);

  return (
    <Container>
      {/* <Header /> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
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
