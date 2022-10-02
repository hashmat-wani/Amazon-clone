import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";

const CartItems = ({ cartItems }) => {
  return (
    <Container>
      <Title>Shopping Cart</Title>
      <hr />
      <ItemsContainer>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
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
`;

const Title = styled.h1`
  margin-bottom: 8px;
`;

const ItemsContainer = styled.div``;
