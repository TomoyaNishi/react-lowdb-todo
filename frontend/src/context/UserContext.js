import { createContext, useState } from "react";

const initialState = {
  name: "",
  email: "",
  isAccess: false,
};

export const UserContext = createContext(initialState);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ initialState });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
