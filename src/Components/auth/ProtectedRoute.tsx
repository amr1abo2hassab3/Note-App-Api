import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../hooks/custom/useAuth";

interface IProps {
  children: ReactNode;
  redirectPath: string;
  allowIfAuthenticated: boolean;
}

const ProtectedRoute = ({
  children,
  redirectPath,
  allowIfAuthenticated,
}: IProps) => {
  const { token } = useAuth();
  const location = useLocation();
  const isAuthenticated = !!token;

  if (allowIfAuthenticated !== isAuthenticated) {
    return (
      <Navigate to={redirectPath} replace state={{ from: location.pathname }} />
    );
  }

  return children;
};

export default ProtectedRoute;
