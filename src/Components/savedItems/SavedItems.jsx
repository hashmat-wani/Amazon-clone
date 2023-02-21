import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import SavedItem from "./SavedItem";
const { v4: uuidv4 } = require("uuid");

const SavedItems = () => {
  const { savedItems } = useSelector(
    (state) => state.savedItemsReducer,
    shallowEqual
  );
  return (
    <Container>
      <Title>
        Saved for later ({savedItems.length}{" "}
        {savedItems.length === 1 ? "item" : "items"})
      </Title>
      <hr />
      <ItemsContainer>
        {savedItems.map((item) => (
          <SavedItem key={uuidv4()} {...item} />
        ))}
      </ItemsContainer>
    </Container>
  );
};

export default SavedItems;

const Container = styled.div`
  background: white;
  /* flex: 0.75; */
  padding: 20px;
`;
const Title = styled.h3`
  margin-bottom: 8px;
`;

const ItemsContainer = styled.div``;
