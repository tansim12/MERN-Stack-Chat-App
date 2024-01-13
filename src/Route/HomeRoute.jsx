import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const HomeRoute = () => {
  return (
    <div>
      {/* nav bar  */}
      <div>
        <Navbar />
      </div>
      {/* Outlet  */}
      <div>
        <Outlet />
      </div>
      {/* footer  */}
      <div>
        <p>footer</p>
      </div>
    </div>
  );
};

export default HomeRoute;
