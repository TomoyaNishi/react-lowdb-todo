import { createContext, useEffect, useState } from "react";

const sessionToken = sessionStorage.getItem("token");

const initialState = {
  token: sessionToken,
  isAccess: sessionToken ? true : false,
};

export const UserContext = createContext(initialState);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
