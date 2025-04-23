import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./components/Signup";
import HomePage from "./components/HomePage"; // Assuming you have this
import LoginPage from "./components/Login";
import DonorDashboard from "./components/DonorDashboard";
import AssociationDashboard from "./components/AssociationDashboard";

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
  {
    path: "/donor-dashboard",
    element: <DonorDashboard />,
  },
  {
    path: "/association-dashboard",
    element: <AssociationDashboard />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
