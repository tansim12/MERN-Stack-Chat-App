import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import useAuthContext from "./useAuthContext";



const PrivateRoute = ({ children }) => {
  const { user, userLoading } = useAuthContext();
  const loc = useLocation();
  if (userLoading) {
    return (
      <div>
    
        
        <Loader></Loader>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to={"/login"} state={loc.pathname} replace={true}></Navigate>
    );
  }

  return children;
};

export default PrivateRoute;
