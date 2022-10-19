import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { unsetAccessToken } from "../../store/sclices/authSlice";
import { unsetUserCart } from "../../store/sclices/cartSlice";
import { unsetUser } from "../../store/sclices/userSlice";
import NavItem from "./NavItem";

const NavListContainer = styled.ul`
  ${tw`
        list-style[none]
        width[500px]
        height[100%]
        flex
        justify-center
        items-center
    `}
`;

export default function NavList() {
  const router = useRouter();
  const user = useSelector((state: any) => state.user.user) as any;
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(unsetAccessToken());
    dispatch(unsetUser());
    dispatch(unsetUserCart());
  };

  return (
    <NavListContainer>
      <NavItem itemName="Home" path="/" />
      {user && <NavItem itemName="Add Product" path="/NewProduct" />}
      {user && <NavItem itemName="Products" />}
      {user && <NavItem itemName="About Us" />}
      {!user && <NavItem itemName="Login" path="/Login" />}
      {!user && <NavItem itemName="Signup" path="/Signup" />}
      {user && <NavItem itemName="Logout" clearStorage={logout} path="/" />}
      {/* CART  */}
    </NavListContainer>
  );
}
