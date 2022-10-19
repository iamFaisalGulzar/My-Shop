import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { setItemName, unsetItemName } from "../../../store/sclices/searchItem";
import Logo from "../Logo";

const HeaderContainer = styled.div`
  ${tw`
        height[12vh]
        width[100%]
        background-color[white]
        position[sticky]
        top[0px]
        display[flex]
        justify-around
        items-center
        z-20
    `}
`;

const SearchInputContainer = styled.form`
  ${tw`
        width[600px]
        height[45px]
        border-radius[5px]
        background-color[#F57222]
        overflow-hidden
        display[flex]
        justify-between
    `}
`;

const Input = styled.input`
  ${tw`
        height[100%]
        width[90%]
        background-color[rgb(238, 238,238)]
        padding[0px 20px]
        focus:outline-none
    `}
`;

const SerachIconContainer = styled.div`
  ${tw`
        width[10%]
        height[100%]
        display[flex]
        justify-center
        items-center
        cursor-pointer
        font-size[18px]
        color[white]
    `}
`;

const CartContainer = styled.div`
  ${tw`
      position[relative]
      font-size[18px]
  `}
`;

const CartCount = styled.span`
  ${tw`
      position[absolute]
      background-color[red]
      top[-12px] 
      right[-16px]
      width[20px]
      height[20px]
      border-radius[50%]
      border[none]
      display[flex]
      justify-center
      items-center
      color[white]
      font-size[14px]
  `}
`;

export default function Header() {
  const [searchedItem, setSearchedItem] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const disptach = useDispatch();
  const cart = useSelector((state: any) => state.cart.cart) as any;

  const searchHandler = (
    e: ChangeEvent<HTMLInputElement> | MouseEvent<SVGSVGElement>
  ) => {
    if (timeoutId) clearTimeout(timeoutId);

    let inputValue = "";
    if (e.type === "click") {
      inputValue = searchedItem;
    } else if (e.type === "change") {
      inputValue = (e.target as HTMLInputElement)?.value;
    }

    setSearchedItem(inputValue);

    const tId = setTimeout(() => {
      if (inputValue.length > 1) {
        disptach(setItemName(searchedItem));
      }
    }, 500);
    setTimeoutId(tId);

    if (inputValue.length <= 1) {
      disptach(unsetItemName());
    }
  };

  return (
    <HeaderContainer>
      <Logo />
      <SearchInputContainer>
        <Input placeholder="Search Items" onChange={searchHandler} />
        <SerachIconContainer>
          <FontAwesomeIcon
            type="submit"
            onClick={searchHandler}
            icon={faSearch}
          />
        </SerachIconContainer>
      </SearchInputContainer>
      <CartContainer>
        <CartCount>{cart.numOfItems}</CartCount>
        <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
      </CartContainer>
    </HeaderContainer>
  );
}
