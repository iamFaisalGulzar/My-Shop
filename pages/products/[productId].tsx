import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { addItemToCart } from "../../store/sclices/cartSlice";
import Header from "../components/header";
import Navbar from "../components/Navbar";
import CartModal from "../components/utils/cartModal";
import LoginModal from "../components/utils/loginModal";

const HomeContainer = styled.div`
  ${tw`
      width[100%]
      height[100vh]
      background-color[rgba(128,128,128,0.1)]
      display[flex]
      items-center
      justify-center
  `}
`;

const DetailContainer = styled.div`
  ${tw`
      width[92%]
      height[80%]
      background-color[white]
      display[flex]
  `}
`;

const DetailSection = styled.div`
  ${tw`
      width[70%]  
      height[100%]
      display[flex]
      `}
`;

const DetailSectionLeft = styled.div`
  ${tw`
      width[45%]
      height[100%]
      display[flex]
      flex-col
  `}
`;

const ProductImageContainer = styled.div`
  ${tw`
      width[100%]
      height[60%]
      flex
      items-center
      justify-center
  `}
  img {
    ${tw`
        height[95%]
        width[auto]
        object-fit[fill]
    `}
  }
`;

const DetailSectionRight = styled.div`
  ${tw`
      width[55%]
      height[100%]
      background-color[white]
      user-select[none]
  `}
  .description-block {
    ${tw`
        width[100%]
        height[auto]
        min-height[100px]
        padding[10px]
        font-size[14px]
    `}
    .title-block {
      ${tw`
          font-size[20px]
          font-weight[500]
          width[100%]
          height[auto]
      `}
    }
  }
  .inStock {
    ${tw`
        width[75px]
        height[30px]
        margin[10px]
        font-size[13px]
        display[flex]
        justify-between
        items-center
        opacity-70
    `}
  }
  .price-block {
    ${tw`
          margin[10px]
          font-size[25px]
          color[#F57222]
          display[inline-block]
      `}
  }
  .action-container {
    ${tw`
        width[100%]
        height[120px]
        display[flex]
        flex-col
    `}
    .quantity {
      ${tw`
          width[60%]
          height[40%]
          display[flex]
          justify-between
          items-center
          padding[0px 10px]
      `}
      div {
        ${tw`
            width[100px]
            display[flex]
            justify-between
        `}
        .action {
          ${tw`
          text-2xl flex justify-center items-center w-7 opacity-50 cursor-pointer bg-gray-300
          hover:bg-gray-400
          user-select[none]
          `}
        }
        span {
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input {
            ${tw`
                width[30px]
                text-align[center]
            `}
          }
        }
      }
    }
    .action-buttons {
      ${tw`
          width[100%]
          height[60%]
          display[flex]
          justify-between
          items-center
          padding[10px]
          color[white]
      `}
      button {
        ${tw`
            width[48%]
            height[70%]
            border-radius[3px]
            cursor-pointer
        `}
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
  }
`;

const ProductDetailContainer = styled.div`
  ${tw`
        height[100vh]
        width[100vw]
        margin[0px auto]
    `}
`;

const DeliverySection = styled.div`
  ${tw`
      width[30%]
      height[100%]
      background-color[#e7e7e7]
  `}
`;

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

const ADD_CART_ITEM = gql`
  mutation createCart($productId: String!, $quantity: Int!) {
    createCart(cartInput: { productId: $productId, quantity: $quantity }) {
      _id
      cartItems {
        quantity
        cartItem {
          title
          description
          price
          imageUrl
          quantity
          category
          userId
        }
      }
      numberOfItems
      totalPrice
      userId
    }
  }
`;

export default function ProductDetail() {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state: any) => state.user.user) as any;
  const dispatch = useDispatch();

  const router = useRouter();
  const prodId = router.query.productId as string;

  const { loading, data } = useQuery(GET_PRODUCT, {
    variables: { productId: prodId },
  });

  const [addCartItem] = useMutation(ADD_CART_ITEM, {
    variables: {
      productId: prodId,
      quantity: selectedQuantity,
    },
  });

  const modalHandler = (closed: boolean) => {
    setShowModal(closed);
  };

  const updateCart = async () => {
    console.log("update cart is called");
    if (selectedQuantity > data.getProductById.quantity) {
      console.log("Your selected quantity is more than available stock");
      return;
    }
    const getCartData = await addCartItem().catch((err) => console.log(err));
    console.log("Cart Data : ", getCartData);
    const cart = getCartData?.data.createCart;
    dispatch(
      addItemToCart({
        cart,
      })
    );
  };

  useEffect(() => {
    if (showModal && user) {
      updateCart();
    }
  }, [showModal, user]);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (showModal && user) {
    return (
      <CartModal />
      // <ProductDetailContainer tw="flex flex-col items-center">
      //   <Navbar />
      //   <Header />
      //   <DetailContainer tw="flex justify-center items-center">
      //     <div tw="width[80%] height[400px] background-color[rgb(238,238,238)]">
      //       Your Product is added to cart.
      //     </div>
      //   </DetailContainer>
      // </ProductDetailContainer>
    );
  }

  return (
    <ProductDetailContainer>
      {showModal && !user && <LoginModal showHandler={modalHandler} />}
      <Navbar />
      <Header />
      <HomeContainer>
        <DetailContainer>
          <DetailSection>
            <DetailSectionLeft>
              <ProductImageContainer>
                <img
                  src={data.getProductById.imageUrl}
                  alt={data.getProductById.title}
                />
              </ProductImageContainer>
            </DetailSectionLeft>
            <DetailSectionRight>
              <div className="description-block">
                <div className="title-block">{data.getProductById.title}</div>
                {data.getProductById.description}
              </div>
              <div className="w-full flex justify-between h-200 mt-5 mb-5">
                <span className="inStock select-none">
                  <span>In stock</span>
                  <span className="text-red-500 select-none">
                    {data.getProductById.quantity}
                  </span>
                </span>
                <span className="price-block select-none">
                  ${data.getProductById.price}
                </span>
              </div>
              <div className="action-container">
                <div className="quantity">
                  <span className="opacity-50 mr-4 select-none">Quantity</span>
                  <div className="cursor-not-allowed">
                    <button
                      className="action"
                      style={
                        selectedQuantity <= 1
                          ? {
                              opacity: "0.30",
                              pointerEvents: "none",
                            }
                          : {}
                      }
                      onClick={() => {
                        setSelectedQuantity(selectedQuantity - 1);
                      }}
                    >
                      -
                    </button>
                    <span className="bg-white w-12 flex justify-center items-center select-none">
                      <input
                        step={1.0}
                        type="number"
                        value={selectedQuantity}
                        onChange={() => {}} // to remove input error
                      />
                    </span>
                    <button
                      className="action"
                      style={
                        selectedQuantity >= 5
                          ? {
                              opacity: "0.30",
                              pointerEvents: "none",
                            }
                          : {}
                      }
                      onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="action-buttons">
                  <button
                    onClick={() => setShowModal(true)}
                    tw="background-color[#2abbe8] hover:background-color[#21a3cb]"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    tw="background-color[#f57224] hover:background-color[#db631b] "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </DetailSectionRight>
          </DetailSection>
          <DeliverySection>Delivery Section</DeliverySection>
        </DetailContainer>
      </HomeContainer>
    </ProductDetailContainer>
  );
}
