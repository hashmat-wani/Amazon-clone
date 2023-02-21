import React from "react";
import styled from "styled-components";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";

const CartTotal = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const getTotalPrice = () =>
    cartItems.reduce((ac, el) => ac + el.qty * el.price, 0);

  const getCartCount = () => cartItems.reduce((ac, el) => ac + el.qty, 0);

  return (
    <Container>
      <SubTotal>
        Subtotal ({getCartCount()} items):&nbsp;
        <strong>
          {getTotalPrice() ? <small>₹</small> : null}
          <NumericFormat
            displayType="text"
            value={getTotalPrice()}
            thousandsGroupStyle="lakh"
            thousandSeparator=","
            // prefix={"₹"}
          />
        </strong>
      </SubTotal>
      <CheckoutBtn>Proceed to Buy</CheckoutBtn>
    </Container>
  );
};

export default CartTotal;

const Container = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 0.25;
  flex-shrink: 0;
  padding: 20px;
`;

const SubTotal = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const CheckoutBtn = styled.button`
  background-color: #f0c14b;
  width: 100%;
  padding: 4px 8px;
  border: 2px solid #a88734;
  cursor: pointer;
  font-size: 14px;
  :hover {
    background-color: #ddb347;
  }
`;
