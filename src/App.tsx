import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./components/Signup";
import HomePage from "./components/HomePage"; // Assuming you have this
import LoginPage from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
