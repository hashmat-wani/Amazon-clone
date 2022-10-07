import React from "react";
import styled from "styled-components";
import Product from "./product/Product";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux";

const Home = () => {
  // fetching products from redux store
  const { products } = useSelector((state) => state.productsReducer);

  return (
    <Container>
      <Banner>
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
        >
          <div>
            <img loading="lazy" src="https://i.imgur.com/SYHeuYM.jpg" alt="" />
          </div>
          <div>
            <img
              loading="lazy"
              src="https://m.media-amazon.com/images/I/71XPVEk+IPL._SX3000_.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              loading="lazy"
              src="https://m.media-amazon.com/images/I/711X8K9QXeL._SX3000_.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              loading="lazy"
              src="https://m.media-amazon.com/images/I/71ZKO6wehwL._SX3000_.jpg"
              alt=""
            />
          </div>
        </Carousel>
      </Banner>

      <Content className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`;

const Content = styled.div`
  padding: 0 10px;
  margin-top: -22%;
`;
