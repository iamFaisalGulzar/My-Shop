import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styled from "styled-components";
import tw from "twin.macro";

const SlideCaption = styled.div`
  ${tw`
        width[auto]
        padding[0px 6px]
        display[flex]
        justify-center
        color[white]
        background-color[rgba(0, 0, 0, 0.5)]
    `}
`;

const slideImages = [
  {
    url: "https://img.freepik.com/free-vector/people-shopping-grocery-store-supermarket-customer-vector-illustration_169479-476.jpg?w=2000",
    caption: "Mart",
  },
  {
    url: "https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg",
    caption: "Slide 2",
  },
  {
    url: "https://media.cnn.com/api/v1/images/stellar/prod/ulta-spring-haul-lead.jpg?c=16x9&q=h_270,w_480,c_fill",
    caption: "Slide 3",
  },
];

export const Slideshow = () => {
  return (
    <div className="slide-container">
      <Fade duration={1800}>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide h-82" key={index}>
            <div
              className="h-full w-full flex items-end justify-center pb-3"
              style={{
                backgroundImage: `url(${slideImage.url})`,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "100%",
              }}
            >
              <SlideCaption>{slideImage.caption}</SlideCaption>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};
