import { gql } from "@apollo/client";
import { client } from "../../_app";

const GET_PRODUCT = gql`
  query getProductById($productId: String!) {
    getProductById(productId: $productId) {
      title
      description
      price
      imageUrl
      category
      quantity
    }
  }
`;

export const getProducById = async (productId: string) => {
  const { data } = await client.query({
    query: GET_PRODUCT,
  });
  return data;
};
