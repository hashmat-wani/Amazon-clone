import React from "react";
import styled from "styled-components";
import Product from "./Product";

const Home = () => {
  return (
    <Container>
      <Banner></Banner>
      <Content>
        <Product
          title="iPhone 14 128GB (Product) RED"
          price="₹79,900"
          src="https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/611mRs-imxL._AC_UY218_.jpg"
        />
        <Product
          title="Apple iPhone 13 Pro Max, 512GB, Gold - Unlocked (Renewed)"
          price="₹69,900"
          src="https://m.media-amazon.com/images/I/61OgrkMY4XL._AC_UY218_.jpg"
        />
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
