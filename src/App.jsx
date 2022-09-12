import "./App.css";
import Header from "./Components/Header";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: #eaeded;
`;
