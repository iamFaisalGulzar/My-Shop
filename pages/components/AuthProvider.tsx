import { ElementType, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unsetAccessToken } from "../../store/sclices/authSlice";
import { setUser, unsetUser } from "../../store/sclices/userSlice";
import { getUser } from "./api/user";

export const AuthProvider: ElementType = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: any) => state.user.user) as any;
  const accessToken = useSelector(
    (state: any) => state.auth.accessToken
  ) as string;

  const disptach = useDispatch();

  const logout = () => {
    disptach(unsetAccessToken());
    disptach(unsetUser());
  };

  const loadUser = async () => {
    const user = await getUser();
    disptach(setUser(user));
    setIsLoading(false);
  };

  useEffect(() => {
    if (!user && accessToken) {
      loadUser().catch(() => {
        setIsLoading(false);
        logout();
      });
      return;
    }
    setIsLoading(false);
  }, []);

  //Loading you profile // in Main component
  if (isLoading) return <>Loading user profile...</>;

  // user is logged in
  return <>{children}</>;
};
