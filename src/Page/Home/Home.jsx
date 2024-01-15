import { Helmet } from "react-helmet-async";
import Banner from "./Banner";


const Home = () => {
    return (
        <div>
          <Helmet>
        <title>Home</title>
      </Helmet>
          Home
          <Banner />
        </div>
    );
};

export default Home;