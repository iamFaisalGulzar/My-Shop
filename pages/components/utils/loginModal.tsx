import { gql, useMutation } from "@apollo/client";
import { faCross, faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { store } from "../../../store";
import { setAccessToken } from "../../../store/sclices/authSlice";
import { setUser } from "../../../store/sclices/userSlice";
import { getUser } from "../api/user";
import Spinner from "../loader";
import Login from "./login";
import { GoogleLoginResponse } from "react-google-login";

const ModalContainer = styled.div`
  .modal-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    pointer-events: all;
    transition: opacity 250ms ease;
  }

  .modal {
    margin: auto;
    width: 60vw;
    height: auto;
    background-color: white;
    border-radius: 0.2rem;
    padding: 30px 20px 30px 30px;
  }

  .modal-content div {
    ${tw`
            width[50%]
            display[flex]
            flex-col
      `}
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
  }

  .right-section button {
    ${tw`
            width[100%]
            margin[10px 0px]
            padding[8px]
            border-radius[4px]
            font-size[16px]
            color[white]
      `}
  }
`;

const LOGIN_MUTATION = gql`
  mutation getLogin(
    $username: String
    $password: String
    $accessToken: String
  ) {
    getLogin(
      userLoginData: {
        username: $username
        password: $password
        accessToken: $accessToken
      }
    ) {
      access_token
    }
  }
`;

export default function LoginModal({ showHandler }: any) {
  const modalcloseHandler = (e: any) => {
    if (e.target.className === "modal-container") {
      showHandler(false);
    }
  };

  const [login, { error, data, loading }] = useMutation(LOGIN_MUTATION);

  const successHandler = (res: GoogleLoginResponse) => {
    login({
      variables: {
        accessToken: res.accessToken,
      },
      onCompleted: async (data) => {
        store.dispatch(setAccessToken(data.getLogin.access_token));
        const user = await getUser();
        store.dispatch(setUser(user));
      },
    });
  };

  if (loading) {
    console.log("Loading....");
  }

  return (
    <ModalContainer>
      {loading && <Spinner />}
      <div className="modal-container" onClick={modalcloseHandler}>
        <section className="modal">
          <header className="modal-header">
            <div className="main-heading" tw="flex flex-col line-height[40px]">
              <h2 className="modal-title text-xl">
                Welcome! Please Login to continue.
              </h2>
              <p tw="font-size[14px] color[#1a9cb7]">
                New member?{" "}
                <span tw="underline hover:cursor-pointer hover:color[#0ccdf7]">
                  Register
                </span>{" "}
                here.
              </p>
            </div>
            <button
              onClick={() => showHandler(false)}
              className="modal-close flex items-start"
            >
              <FontAwesomeIcon
                className="close text-xl hover:text-gray-500"
                icon={faXmark}
              />
            </button>
          </header>
          <div
            className="modal-content"
            tw="padding-right[20px] height[85%] flex"
          >
            <div className="left-section mr-4 mt-8">
              <label tw="font-size[14px] opacity-70 mb-1.5" htmlFor="email">
                Phone Number or Emial*
              </label>
              <input
                type="text"
                id="email"
                tw="border[1px solid lightgray] padding[8px 12px] font-size[15px] focus:outline-none margin-bottom[30px]"
                placeholder="Please enter your Phone Number or Email"
              />
              <label tw="font-size[14px] opacity-70 mb-1.5" htmlFor="password">
                Password*
              </label>
              <input
                type="password"
                id="password"
                tw="border[1px solid lightgray] padding[8px 12px] font-size[15px] focus:outline-none margin-bottom[20px]"
                placeholder="Please enter your Password"
              ></input>
              <span tw="font-size[14px] color[#1a9cb7] text-align[end] underline hover:cursor-pointer hover:color[#0ccdf7]">
                Forget Password?
              </span>
            </div>
            <div className="right-section mt-8">
              <button tw="background-color[#f57224] hover:background-color[#ed6717]">
                LOGIN
              </button>
              <span tw="font-size[13px] opacity-60">or, login with</span>
              <button tw="background-color[#3b5998] hover:background-color[#364f83]">
                FaceBook
              </button>
              {/* <button tw="background-color[#d34836] hover:background-color[#cf4331]">
                Google
              </button> */}
              <Login onSuccess={successHandler} />
            </div>
          </div>
        </section>
      </div>
    </ModalContainer>
  );
}
