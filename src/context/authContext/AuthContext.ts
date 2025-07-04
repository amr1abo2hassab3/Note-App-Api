import { createContext } from "react";
import type { IAuthContextValue } from "../../interfaces";

export const AuthContext = createContext<IAuthContextValue>(
  {} as IAuthContextValue
);
