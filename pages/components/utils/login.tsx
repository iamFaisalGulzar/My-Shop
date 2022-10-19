import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const clientId =
  "145790727684-6r3ksbglv5l3rp8t9ngva06nhp20ck6q.apps.googleusercontent.com";

interface ILoginProps {
  onSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline): void;
}

export default function Login(props: ILoginProps) {
  //   const onSuccess = (res: any) => {
  //     console.log("[Login Success] currentUser:", res);
  //   };

  //   const onFaliure = (res: any) => {
  //     console.log("[Login failed] res:", res);
  //   };
  return (
    <GoogleLogin
      clientId={clientId}
      render={(renderProps) => (
        <button
          //   style={{ color: "red" }}
          tw="background-color[#d34836] hover:background-color[#cf4331]"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Google
        </button>
      )}
      buttonText="Login"
      onSuccess={props.onSuccess}
      //   onFailure={onFaliure}
      cookiePolicy={"single_host_origin"}
    />
  );
}
