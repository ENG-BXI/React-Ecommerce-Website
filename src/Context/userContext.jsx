import { createContext, useState } from "react";

export let userContext = createContext();

export function ProviderUserContext({ children }) {
    let [user, setUser] = useState({});
  return  <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>
}