import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import NavList from "./NavList";

const NavigationBar = styled.div`
  ${tw`
        width[100%]
        height[4vh]
        background-color[rgb(238, 238,238)]
        display[flex]
        justify-center
        items-center
    `}
`;

export default function Navbar() {
  return (
    <NavigationBar>
      <NavList />
    </NavigationBar>
  );
}
