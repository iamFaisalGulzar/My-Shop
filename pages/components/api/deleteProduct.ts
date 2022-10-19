import { gql, useMutation } from "@apollo/client";

const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: String) {
    deleteProduct(productId: $productId) {
      _id
      title
    }
  }
`;

export const deleteProductById = async (productId: string) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT, {
    variables: {
      productId,
    },
  });
};
