import { useEffect, useState, type ReactNode } from "react";
import type { IUserData } from "../../interfaces";
import { storageKey } from "../../data";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

interface IProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: IProps) => {
  const [token, setToken] = useState<string>(
    () => localStorage.getItem(storageKey) || ""
  );
  const [userData, setUserData] = useState<IUserData>({} as IUserData);
  const [notesCount, setNotesCount] = useState<number>(0);
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<IUserData>(token);
        setUserData(decoded);
      } catch (error) {
        console.error("Invalid token", error);
        setUserData({} as IUserData);
      }
    } else {
      setUserData({} as IUserData);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userData,
        setUserData,
        notesCount,
        setNotesCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
