import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useRouter } from "next/router";
import SingleCategory from "./singleCategory";
import martImage from "../../../assests/images/categoryImages/mart.png";
import fashionImage from "../../../assests/images/categoryImages/fashion.png";
import beautyImage from "../../../assests/images/categoryImages/beauty.png";
import electronicsImage from "../../../assests/images/categoryImages/electronics.jpeg";

const CategoryContainer = styled.div`
  ${tw`
        width[100%]
        height[70px]
        display[flex]
        background-color[rgba(128,128,128,0.1)]
        justify-around
        items-center
    `}
`;

// const SingleCategory = styled.div`
//   ${tw`
//         width[350px]
//         height[42px]
//         border-radius[20px]
//         background-color[white]
//         display[flex]
//         items-center
//         cursor-pointer
//         hover:text-green-500
//         hover:box-shadow[0px 1px 2px 0px rgba(0,0,0,0.5)]
//     `}
//   .icon {
//     ${tw`
//          hover:opacity-50
//         `}
//   }
// `;

export default function Category() {
  const router = useRouter();

  const categoryClickHander = (category: string) => {
    router.push({
      pathname: "/",
      search: `?category=${category}`,
    });
  };

  return (
    <CategoryContainer>
      <SingleCategory
        imageUrl={martImage}
        categoryName="Mart"
        onClickCategory={categoryClickHander}
      />
      <SingleCategory
        imageUrl={fashionImage}
        categoryName="Fashion"
        onClickCategory={categoryClickHander}
      />
      <SingleCategory
        imageUrl={electronicsImage}
        categoryName="Electronic Devices"
        onClickCategory={categoryClickHander}
      />
      <SingleCategory
        imageUrl={beautyImage}
        categoryName="Beauty"
        onClickCategory={categoryClickHander}
      />
    </CategoryContainer>
  );
}
