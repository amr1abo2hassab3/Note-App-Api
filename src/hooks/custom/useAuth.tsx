import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";

export const useAuth = () => useContext(AuthContext);
