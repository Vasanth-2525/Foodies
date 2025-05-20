import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop"; 

const App = () => {
  return (
    <div className="overflow-x-hidden bg-white2">
      <ScrollToTop /> 
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
