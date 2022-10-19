import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import Spinner from "../loader";
import SingleProduct from "./SingleProduct";

const ProductListContainer = styled.ul`
  ${tw`
      width[100%]      
      height[auto]
      background-color[rgb(245, 247, 250)]
      display[flex]
      justify-center
      flex-direction[row]
      flex-wrap[wrap]
      items-center
  `}
`;

const GET_PRODUCTS = gql`
  query getAllProducts($searchedItem: String, $category: String) {
    getAllProducts(searchedItem: $searchedItem, category: $category) {
      _id
      title
      description
      price
      imageUrl
      quantity
      userId
    }
  }
`;

export default function ProductList() {
  const router = useRouter();
  const searchedCategory = router.query.category;
  const [isLoading, setIsLoading] = useState(false);
  const searchedItem = useSelector(
    (state: any) => state.search.itemName
  ) as any;
  const user = useSelector((state: any) => state.user.user);
  const {
    loading,
    data: products,
    refetch,
  } = useQuery(GET_PRODUCTS, {
    variables: {
      searchedItem: searchedItem,
      category: searchedCategory,
    },
    // fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch();
  }, [user]);

  const refetchHandler = async () => {
    setIsLoading(true);
    await refetch();
    setIsLoading(false);
  };

  return (
    <ProductListContainer>
      {(loading || isLoading) && <Spinner />}
      {products?.getAllProducts.length > 0 ? (
        products.getAllProducts.map((product: any) => (
          <SingleProduct
            product={product}
            updateList={refetchHandler}
          ></SingleProduct>
        ))
      ) : (
        <div className="m-auto text-2xl pt-8 pb-8 font-bold">
          No Products available
        </div>
      )}
    </ProductListContainer>
  );
}
