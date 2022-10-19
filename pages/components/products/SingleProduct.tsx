import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

// interface ProductInput {
//   productId: string;
// }

const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: String!) {
    deleteProduct(productId: $productId) {
      _id
      title
    }
  }
`;

export default function SingleProduct({ product, updateList }: any) {
  const router = useRouter();
  const user = useSelector((state: any) => state.user.user) as any;
  // const deleteProduct = deleteProductById(product._id)

  const [deleteProduct, { error, loading }] = useMutation(DELETE_PRODUCT, {
    variables: {
      productId: product._id,
    },
  });

  const deleteProductHandler = async () => {
    await deleteProduct();
    updateList();
  };

  return (
    <>
      <SingleProductContainer
        onClick={
          !user ? () => router.push(`/products/${product._id}`) : undefined
        }
        key={product._id}
      >
        <ImageContainer>
          <img src={product.imageUrl} />
        </ImageContainer>
        <ProductBody>
          <UperBody>
            <div>{product.title}</div>
          </UperBody>
          <LowerBody>
            <div>${product.price}</div>
            <div>
              <span className="text-xs mr-1 text-red-400">in stock</span>
              {product.quantity}
            </div>
          </LowerBody>
          {user && (
            <ActionsContainer>
              {error && (
                <span className="text-red-400 text-xs mr-2">
                  {error.message}
                </span>
              )}
              <div>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => {
                    router.push({
                      pathname: "/NewProduct",
                      query: { update: true, productId: product._id },
                    });
                  }}
                />
              </div>
              <div>
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} />
                ) : (
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={deleteProductHandler}
                  />
                )}
              </div>
            </ActionsContainer>
          )}
        </ProductBody>
      </SingleProductContainer>
    </>
  );
}

const SingleProductContainer = styled.li`
  ${tw`
      width[220px]
      height[280px]
      rounded
      overflow-hidden
      margin[10px 10px]
      cursor-pointer
      hover:box-shadow[0 0 11px rgba(33,33,33,.2)] 
  `}
`;

const ImageContainer = styled.div`
  ${tw`
    width[100%]
    height[70%]
    border-bottom[1px solid rgb(0, 0, 0, 0.5)]
  `}
  img {
    ${tw`
        width[100%]
        height[100%]
    `}
  }
`;

const ProductBody = styled.div`
  ${tw`
        display[flex]
        flex-col
        width[100%]
        height[30%]
        background-color[white]
        padding[6px]
    `}
`;

const UperBody = styled.div`
  ${tw`
        width[100%]
        height[50%]
        overflow-hidden
  `}
`;

const LowerBody = styled.div`
  ${tw`
        width[100%]
        height[50%]
        display[flex]
        items-center
        justify-between
        font-size[12px]
  `}
`;

const ActionsContainer = styled.div`
  ${tw`
      width[100%]
      height[30px]
      display[flex]
      justify-end
      items-center
      color[black]
  `}

  div {
    ${tw`
        hover:color[red]
        cursor-pointer
        margin[0px 4px]
    `}
  }
`;
