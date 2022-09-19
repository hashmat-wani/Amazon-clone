import React, { useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { db } from "../db/firebase";
import { useEffect } from "react";

//used for new way only
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  //old way to fetch data from firebase
  // const getProducts = () => {
  //   db.collection("products").onSnapshot((products) =>
  //     setProducts(
  //       products.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }))
  //     )
  //   );
  // };

  //new way to fetch data from firebase
  const getProducts = () => {
    getDocs(collection(db, "products")).then((products) =>
      setProducts(
        products.docs.map((pro) => ({
          id: pro.id,
          ...pro.data(),
        }))
      )
    );
  };

  return (
    <Container>
      <Banner></Banner>
      <Content>
        {products.map((pro) => (
          <Product {...pro} key={pro.id} />
        ))}
      </Content>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;

const Banner = styled.div`
  background-image: url("https://i.imgur.com/SYHeuYM.jpg");
  min-height: 600px;
  background-position: center;
  background-size: cover;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`;

const Content = styled.div`
  padding: 0 10px;
  margin-top: -350px;
  display: flex;
`;
