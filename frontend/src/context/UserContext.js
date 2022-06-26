import { createContext, useEffect, useState } from "react";

const sessionName = sessionStorage.getItem("name");
const sessionEmail = sessionStorage.getItem("email");

const initialState = {
  name: sessionName,
  email: sessionEmail,
  isAccess: sessionName && sessionEmail ? true : false,
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
