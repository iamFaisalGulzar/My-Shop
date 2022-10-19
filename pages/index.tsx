import type { NextPage } from "next";
import styled from "styled-components";
import tw from "twin.macro";
import Category from "./components/category";
import Header from "./components/header";
import Navbar from "./components/Navbar";
import ProductList from "./components/products/ProductList";
import Slider from "./components/slider";

const HomeContainer = styled.div`
  ${tw`
      width[100%]
      min-height[100vh]
  `}
`;

const ProductListContainer = styled.div`
  ${tw`
      width[95%]
      min-height[96vh]
      padding[10px 0px]
      display[flex]
      justify-center
      items-start
      margin[50px auto]
  `}
`;

const Home: NextPage = () => {
  return (
    <HomeContainer>
      <Navbar />
      <Header />
      <Slider />
      <Category />
      <ProductListContainer>
        <ProductList />
      </ProductListContainer>
    </HomeContainer>
  );
};

export default Home;
