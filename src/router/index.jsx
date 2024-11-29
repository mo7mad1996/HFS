import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components || Pages
import Register from "@/Pages/Register";
import NewLogin from "@/Pages/Newlogin"; // Import NewLogin component
import Login from "@/Pages/Login";
import Layout from "@/Pages/Layout";
import Home from "@/Pages/Home";
import Dashboard from "@/Pages/Dashboard";
import Membership from "@/Pages/Membership";
import MembershipTier from "@/Pages/MembershipTier";
import Network from "@/Pages/Network";
import CustomCard from "@/Pages/WalletCard";
import AllTransactions from "@/Pages/AllTransaction";
import Test from "@/Pages/Test";
import Tank from "@/Pages/Tank";

// routes
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/Membership", element: <Membership /> },
      { path: "/MembershipTier", element: <MembershipTier /> },
      { path: "/network", element: <Network /> },
      { path: "/Transactions", element: <AllTransactions /> },
      { path: "/wallet", element: <CustomCard /> },
      { path: "/tank", element: <Tank /> },
    ],
  },
  { path: "/register", element: <Register /> },
  { path: "/newlogin", element: <NewLogin /> },
  { path: "/login", element: <Login /> },
  { path: "/test", element: <Test /> },
]);
const Router = () => <RouterProvider router={router} />;

export default Router;
