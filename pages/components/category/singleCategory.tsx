import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Image from "next/image";

const SingleCategoryContainer = styled.div`
  ${tw`
        min-width[250px]
        width[auto]
        margin[0px 10px]
        height[42px]
        border-radius[20px]
        background-color[white]
        display[flex]
        items-center
        cursor-pointer
        hover:text-green-500
        hover:box-shadow[0px 0.5px 0.5px 0px rgba(0,0,0,0.5)]
    `}
  .icon {
    ${tw`
         hover:opacity-70   
        `}
  }
`;

export default function SingleCategory(props: any) {
  return (
    <SingleCategoryContainer
      onClick={() => props.onClickCategory(props.categoryName.trim())}
    >
      <span className="rounded-full w-10 h-10 ml-1 flex items-center justify-center">
        <Image
          className="rounded-full w-full h-full object-cover"
          src={props.imageUrl}
        />
      </span>
      <div className="icon pr-2 ml-4 w-72 text-lg flex justify-between items-center">
        <span className="text-lg opacity-70">{props.categoryName}</span>
        <FontAwesomeIcon opacity={0.5} icon={faAngleRight} />
      </div>
    </SingleCategoryContainer>
  );
}
