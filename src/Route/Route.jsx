import { createBrowserRouter } from "react-router-dom";
import HomeRoute from "./HomeRoute";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import Chatting from "../Page/Chatting/Chatting";
import PrivateRoute from "../Utils/PrivateRoute";
import Home from "../Page/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element:<HomeRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/chatting",
    element: (
      <PrivateRoute>
        <Chatting />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;
