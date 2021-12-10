import React from "react";

const initState = {
  role: "user",
  isLoggedIn: false,
  userId: "",
  name: "",
  token: "",
  isAdmin: false,
};

interface IUserState {
  role?: string;
  isLoggedIn?: boolean;
  userId?: string;
  name?: string;
  token?: string;
  isAdmin?: boolean;
}

interface IUserAction extends IUserState {
  handleLogin?: (params: IUserState) => void;
  handleLogout?: (params: IUserState) => void;
}

export const GlobalContext = React.createContext<IUserAction>({
  ...initState,
});

export const Global: React.FC = ({ children }) => {
  const [state, setState] = React.useState<IUserAction>(initState);

  const handleLogin = (params: IUserState) => {
    setState({ ...params, isLoggedIn: true });
  };

  const handleLogout = () => {
    setState({ ...initState });
  };
  const value = {
    ...state,
    handleLogin,
    handleLogout,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
