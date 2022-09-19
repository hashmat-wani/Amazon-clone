import React from "react";
import styled from "styled-components";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import { v4 as uuidv4 } from "uuid";

const Product = ({ title, price, rating, imageUrl }) => {
  let flag = rating % 1 !== 0 ? true : false;
  rating = Math.floor(rating);
  return (
    <Container>
      <Title>{title}</Title>
      <Price>₹ {price}</Price>
      <Rating>
        {Array(5)
          .fill()
          .map((_, idx) =>
            idx < rating ? (
              <StarIcon key={uuidv4()} style={{ fontSize: "medium" }} />
            ) : flag && idx == rating ? (
              <StarHalfIcon key={uuidv4()} style={{ fontSize: "medium" }} />
            ) : (
              <StarOutlineIcon key={uuidv4()} style={{ fontSize: "medium" }} />
            )
          )}
      </Rating>
      <Image src={imageUrl} />
      <ActionSection>
        <AddToCartBtn>Add to Cart</AddToCartBtn>
      </ActionSection>
    </Container>
  );
};

export default Product;

const Container = styled.div`
  background-color: white;
  z-index: 1;
  flex: 1;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span``;

const Price = styled.span`
  font-weight: 500;
  margin: 5px 0;
`;
const Rating = styled.div`
  color: #f90;
`;

const Image = styled.img`
  max-height: 300px;
  object-fit: contain;
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const AddToCartBtn = styled.button`
  width: 130px;
  height: 40px;
  background-color: #f0c14b;
  border: none;
  border-radius: 25px;
`;
