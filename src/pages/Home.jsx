import React from "react";
import Popular from "../components/Popular";
import Vegetable from "../components/Vegetable";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <Vegetable />
      <Popular />
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export default Home;
