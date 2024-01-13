
import {
    createBrowserRouter,
    
  } from "react-router-dom";
import HomeRoute from "./HomeRoute";

  
  
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
  ]);
export default router  