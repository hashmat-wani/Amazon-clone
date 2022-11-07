import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeCartItemQty, deleteFromCart } from "../../redux/cartSlice";
import { saveForLater } from "../../redux/savedItemsSlice";

const CartItem = (props) => {
  console.log(props);
  const { id, image, title, qty, price } = props;
  let options = [];
  for (let i = 1; i <= Math.max(qty, 20); i++) {
    options.push(
      <option key={i} value={i}>
        Qty: {i}
      </option>
    );
  }

  const { user } = useSelector((state) => state.authReducer);
  const email = user ? user.email : null;

  const dispatch = useDispatch();
  const changeQty = (newQty) => dispatch(changeCartItemQty(id, newQty, email));

  const deleteCartItem = () => dispatch(deleteFromCart(id, email));

  const saveItem = () => dispatch(saveForLater(props));

  return (
    <Container>
      <ImageContainer>
        <img alt="cart-avatar" src={image} />
      </ImageContainer>
      <CartItemInfo>
        <CartItemInfoTop>
          <h3>{title}</h3>
        </CartItemInfoTop>
        <CartItemInfoBottom>
          <CartItemQty>
            <select value={qty} onChange={(e) => changeQty(e.target.value)}>
              {options}
            </select>
          </CartItemQty>
          <CartItemDelBtn onClick={deleteCartItem}>Delete</CartItemDelBtn>
          <CartItemSaveLaterBtn onClick={saveItem}>
            Save for later
          </CartItemSaveLaterBtn>
        </CartItemInfoBottom>
      </CartItemInfo>
      <CartItemPrice>
        <small>₹</small> {price}
      </CartItemPrice>
    </Container>
  );
};

export default CartItem;

const Container = styled.div`
  display: flex;
  padding: 14px 0;
  border-bottom: 1px solid #ddd;
  gap: 12px;
`;

const ImageContainer = styled.div`
  width: 180px;
  height: 180px;
  flex-shrink: 0;
  flex-grow: 0;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;

const CartItemInfoTop = styled.div`
  color: #007185;
  h2 {
    font-size: 18px;
  }
`;

const CartItemInfoBottom = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CartItemQty = styled.div`
  select {
    border-radius: 8px;
    background-color: #f0f2f2;
    padding: 6px;
    box-shadow: 0 2px 5px rgba(15, 17, 17, 0.15);
    :focus {
      outline: none;
    }
  }
`;

const CartItemDelBtn = styled.div`
  cursor: pointer;
  color: #007185;
  &:hover {
    text-decoration: underline;
  }
`;

const CartItemSaveLaterBtn = styled.div`
  cursor: pointer;
  color: #007185;
  &:hover {
    text-decoration: underline;
  }
`;

const CartItemPrice = styled.div`
  width: 80px;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: flex-end;
  flex-grow: 0;
  flex-shrink: 0;
`;
