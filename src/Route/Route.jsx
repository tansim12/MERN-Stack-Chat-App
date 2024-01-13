
import {
    createBrowserRouter,
    
  } from "react-router-dom";
import HomeRoute from "./HomeRoute";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";

  
  
  const router = createBrowserRouter([
    {
      path: "/",
      children:[
        {
            index:true,
            element:<HomeRoute />
        }
      ]
    },
    {
      path:"/login",
      element:<Login />
    },
    {
      path:"/register",
      element:<Register />
    }
  ]);
export default router  