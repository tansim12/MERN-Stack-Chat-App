import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const HomeRoute = () => {
  return (
    <div>
      {/* nav bar  */}
      <div>
        <Navbar />
      </div>
      {/* Outlet  */}
      <div className="min-h-[60vh]">
        <Outlet />
      </div>
      {/* footer  */}
      <div>
      <Footer />
      </div>
    </div>
  );
};

export default HomeRoute;
