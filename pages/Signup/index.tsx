import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { AuthRoute } from "../components/AuthRoute";
import Navbar from "../components/Navbar";

const HomeContainer = styled.div`
  ${tw`
        width[100%]
        height[95vh]
        display[flex]
        items-center
        justify-center
        flex-col
        background-color[gray]
    `}
`;

const SignupContainer = styled.div`
  ${tw`
        width[600px]
        height[400px]
        border-radius[10px]
        background-color[aquamarine]
        display[flex]
        flex-col
        justify-center
        items-center
    `}
`;

const SIGNUP_MUTATION = gql`
  mutation getSignUp($username: String, $password: String) {
    getSignUp(userSignupData: { username: $username, password: $password }) {
      username
    }
  }
`;

const Signup = () => {
  const router = useRouter();
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");

  const [getSignUp, { loading, data, error, called }] = useMutation(
    SIGNUP_MUTATION,
    {
      variables: {
        username: enteredEmail,
        password: enteredPassword,
      },
    }
  );

  if (data) {
    router.push("/Login");
  }

  return (
    <>
      <Navbar />
      <HomeContainer>
        <SignupContainer>
          <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
          {error && <p className="text-red-500">{error.message}</p>}
          <div className="flex flex-col mb-3">
            <label htmlFor="username">Username</label>
            <input
              className="pt-1 pb-1 pl-2 rounded outline-none"
              type="text"
              id="username"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="email">Email</label>
            <input
              className="pt-1 pb-1 pl-2 rounded outline-none"
              type="text"
              id="email"
              value={enteredEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="password">Password</label>
            <input
              className="pt-1 pb-1 pl-2 rounded outline-none"
              type="text"
              id="password"
              value={enteredPassword}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="pt-2 pb-2 pl-6 mb-2 pr-6 mt-1 rounded bg-zinc-50 hover:bg-black hover:text-white font-medium"
            onClick={() => getSignUp().catch(() => {})}
          >
            Signup
          </button>
          <p>
            Already have account ?
            <span className="text-red-500 hover:underline hover:text-red-700">
              <Link href={"/Login"}> Login</Link>
            </span>
          </p>
        </SignupContainer>
      </HomeContainer>
    </>
  );
};

export default AuthRoute(Signup, false, "/");
