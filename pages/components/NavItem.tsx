import Link from "next/link";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const NavItemContainer = styled.li`
  ${tw`
        padding[2px 6px]
        color[black]
        margin[0px 6px]
        font-weight[400]
        hover:text-gray-600
        hover:cursor-pointer
    `}
`;

export default function NavItem(props: any) {
  return (
    <NavItemContainer key={props.pathname} onClick={props.clearStorage}>
      <Link href={`${props.path}`}>{props.itemName}</Link>
    </NavItemContainer>
  );
}
