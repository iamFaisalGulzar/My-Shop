import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Slideshow } from "../slideShow";

const SliderContainer = styled.div`
  ${tw`
        width[100%]
        height[352px]
        background-color[cornflowerblue]
    `}
`;

export default function Slider() {
  return (
    <SliderContainer>
      <Slideshow />
    </SliderContainer>
  );
}
