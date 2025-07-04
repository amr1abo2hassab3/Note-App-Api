import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";
import ErrorHandler from "../Components/errors/ErrorHandler";
import ProtectedRoute from "../Components/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorHandler />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute redirectPath="/login" allowIfAuthenticated={true}>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute redirectPath="/" allowIfAuthenticated={false}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute redirectPath="/" allowIfAuthenticated={false}>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
