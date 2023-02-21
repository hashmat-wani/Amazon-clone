import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import SavedItems from "../savedItems/SavedItems";
import CartItems from "./CartItems";
import CartTotal from "./CartTotal";

const Cart = () => {
  const { savedItems } = useSelector(
    (state) => state.savedItemsReducer,
    shallowEqual
  );

  return (
    <Container>
      <CartContainer>
        <CartItems />
        <CartTotal />
      </CartContainer>
      {savedItems.length > 0 && <SavedItems />}
    </Container>
  );
};

export default Cart;

const Container = styled.div`
  padding: 14px 18px 40px 18px;
  align-items: start;
`;

const CartContainer = styled.div`
  display: flex;
  gap: 18px;
  align-items: start;
  margin-bottom: 20px;
`;
