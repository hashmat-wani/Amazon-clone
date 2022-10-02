import React from "react";
import styled from "styled-components";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { v4 as uuidv4 } from "uuid";
import { db } from "../db/firebase";
import { setDoc, doc, getDoc, updateDoc, collection } from "firebase/firestore";

const Product = ({ id, title, price, rating, imageUrl }) => {
  let flag = rating % 1 !== 0 ? true : false;
  rating = Math.floor(rating);

  const cartColl = collection(db, "cartitems");

  const addToCart = (id) => {
    const cartItemDoc = doc(db, "cartitems", id);
    getDoc(cartItemDoc).then((docSnap) => {
      if (docSnap.exists()) {
        updateDoc(cartItemDoc, { qty: docSnap.data().qty + 1 });
      } else {
        setDoc(doc(cartColl, id), {
          title,
          price,
          imageUrl,
          qty: 1,
        });
      }
    });
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Price>
        <small>₹</small> {price}
      </Price>
      <Rating>
        {Array(5)
          .fill()
          .map((_, idx) =>
            idx < rating ? (
              <StarIcon key={uuidv4()} style={{ fontSize: "medium" }} />
            ) : flag && idx === rating ? (
              <StarHalfIcon key={uuidv4()} style={{ fontSize: "medium" }} />
            ) : (
              <StarOutlineIcon key={uuidv4()} style={{ fontSize: "medium" }} />
            )
          )}
      </Rating>
      <Image src={imageUrl} alt="ProductImage" />
      <ActionSection>
        <AddToCartBtn onClick={() => addToCart(id)}>Add to Cart</AddToCartBtn>
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
  cursor: pointer;
  width: 130px;
  height: 40px;
  background-color: #f0c14b;
  border: none;
  border-radius: 25px;
`;
