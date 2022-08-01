import { createContext, useState } from "react";

const sessionToken = sessionStorage.getItem("token");
const sessionName = sessionStorage.getItem("name");

const initialState = {
  token: sessionToken,
  name: sessionName,
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
