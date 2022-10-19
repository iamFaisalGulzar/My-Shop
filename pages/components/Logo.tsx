import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import logoImage from "../../assests/images/logo-small.png";

const LogoContainer = styled.div`
  ${tw`
    display[flex]
    items-center
    hover:cursor-pointer
    `}
`;

const LogoText = styled.div`
  ${tw`
        font-size[20px]
        font-bold
        text-black
        m-1
    `}
`;

const LogoImage = styled.div`
  ${tw`
        width[auto]
        flex
        items-center
    `}
  img {
    ${tw`
            width[auto]
            height[100%]
        `}
  }
`;

export default function Logo() {
  const router = useRouter();
  return (
    <LogoContainer onClick={() => router.push("/")}>
      <LogoImage>
        <Image src={logoImage}></Image>
      </LogoImage>
      <LogoText>YourShop.</LogoText>
    </LogoContainer>
  );
}
