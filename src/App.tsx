import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/authContext/AuthContextProvider";

function App() {
  return (
    <main>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthContextProvider>
    </main>
  );
}

export default App;
