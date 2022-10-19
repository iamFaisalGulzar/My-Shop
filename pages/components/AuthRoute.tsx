import { ElementType } from "react";
import { useSelector } from "react-redux";

export const AuthRoute =
  (Page: ElementType, allowForLoggedIn = true, errorPath = "/Login") =>
  (props: any) => {
    const user = useSelector((state: any) => state.user.user) as any;
    // To prevent from server side rendering
    // MAY BE UNCOMMENT
    if (typeof window === "undefined") return null;

    if ((!user && allowForLoggedIn) || (!allowForLoggedIn && user)) {
      window.location.pathname = errorPath;
      return null;
    }

    // user is logged in
    return <Page {...props} />;
  };
