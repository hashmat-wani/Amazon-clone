import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CartItem from "./CartItem";
const { v4: uuidv4 } = require("uuid");

const CartItems = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);

  return (
    <Container>
      <Title>Shopping Cart</Title>
      <hr />
      <ItemsContainer>
        {cartItems.map((item) => (
          <CartItem key={uuidv4()} {...item} />
        ))}
      </ItemsContainer>
    </Container>
  );
};

export default CartItems;

const Container = styled.div`
  background: white;
  flex: 0.75;
  padding: 20px;
  padding: 14px 18px 0 18px;
  align-items: start;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  margin-bottom: 8px;
`;

const ItemsContainer = styled.div``;
