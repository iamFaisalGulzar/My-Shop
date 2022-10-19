import React from "react";
import styled from "styled-components";

const Loader = styled.div`
  display: block;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  backgroundcolor: black;
  z-index: 2002;
`;

const Loading = styled.div`
  border: 4px solid #ccc;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border-top-color: #1ecd97;
  border-left-color: #1ecd97;
  animation: spin 1s infinite ease-in;
  z-index-2001;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Spinner() {
  return (
    <>
      <Loader>
        <Loading />
      </Loader>
    </>
  );
}
