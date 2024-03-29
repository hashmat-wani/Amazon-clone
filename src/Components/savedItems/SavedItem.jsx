import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToCart } from "../../redux/cartSlice";
import { remove } from "../../redux/savedItemsSlice";

const SavedItem = (props) => {
  const { id, image, title, price } = props;

  const dispatch = useDispatch();
  const removeSavedItem = () => dispatch(remove(id));

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
          <CartItemDelBtn onClick={removeSavedItem}>Remove</CartItemDelBtn>
          <CartItemSaveLaterBtn
            onClick={() => {
              dispatch(addToCart(props));
              removeSavedItem();
            }}
          >
            Add to cart
          </CartItemSaveLaterBtn>
        </CartItemInfoBottom>
      </CartItemInfo>
      <CartItemPrice>
        <small>₹</small> {price}
      </CartItemPrice>
    </Container>
  );
};

export default SavedItem;

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
