import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AvailableFoods from "../pages/AvailableFoods/AvailableFoods";
import PrivateRoute from "./PrivateRoute";
import AddFood from "../pages/Dashboard/AddFood";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import ManageMyFoods from "../pages/ManageMyFoods/ManageMyFoods";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner";
import MyRequests from "../pages/Dashboard/MyRequests";
import DashboardLayout from "../layout/DashboardLayout";
import Overview from "../pages/Dashboard/Overview";
import Profile from "../pages/Dashboard/Profile";
import ManageFoods from "../pages/Dashboard/ManageFoods";
import AdminOverview from "../pages/Dashboard/AdminOverview";
import UserManagement from "../pages/Dashboard/UserManagement";
import Contact from "../components/Contact";
import About from "../components/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods />,
        loader: () =>
          fetch("https://plate-share-server-polish.vercel.app/foods"),
      },

      {
        path: "/foods/:id",
        element: <FoodDetails />,
        loader: ({ params }) =>
          fetch(
            `https://plate-share-server-polish.vercel.app/foods/${params.id}`,
          ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "admin-overview",
            element: <AdminOverview />,
          },
          {
            path: "users",
            element: <UserManagement />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "manage-foods",
            element: <ManageFoods />,
          },
          {
            path: "add-food",
            element: <AddFood />,
          },
          {
            path: "my-requests",
            element: <MyRequests />,
            loader: () =>
              fetch("https://plate-share-server-polish.vercel.app/foods"),
          },
        ],
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);
