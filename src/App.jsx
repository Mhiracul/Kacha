import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Pricing from "./Pages/Pricing";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";
import Cart from "./Pages/Cart";
import AboutM from "./Pages/AboutM";
import CarGrid from "./Pages/CarGrid";
import CarDetails from "./Pages/CarDetails";
import CarRegistration from "./Pages/CarRegistration";
import CarRepaint from "./Pages/CarRepaint";
import CarRentals from "./Pages/CarRentals";
import AddCars from "./Admin/Page/AddCars";
import AdminLogin from "./Admin/AdminLogin";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import EditCar from "./Admin/Page/EditCar";
import AddCarRent from "./Admin/Page/AddCarRent";
import ConfirmationPage from "./Pages/ConfirmationPage";
import AdminBookings from "./Admin/Page/AdminBooking";
import EditCarRents from "./Admin/Page/EditCarRents";

const getToken = () => localStorage.getItem("adminToken");

function App() {
  const [token, setToken] = useState(getToken());
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate a loading process or any other async operation
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after a certain time or when content is ready
    }, 2000); // For demo purposes, change the duration as needed

    if (!token) {
      // Handle token absence, maybe redirect to login if needed
    }
  }, [token]);

  return (
    <Router>
      {isLoading ? (
        <Loader /> // Show loader while loading
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AdminLogin setToken={setToken} />} />
          <Route
            path="/admin"
            element={token ? <AddCars /> : <AdminLogin setToken={setToken} />}
          />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing-plan" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<AboutM />} />
          <Route path="/car-sales" element={<CarGrid />} />
          <Route path="/car-registration" element={<CarRegistration />} />
          <Route path="/car-repaint" element={<CarRepaint />} />
          <Route path="/car-rentals" element={<CarRentals />} />
          <Route path="/car-details/:carName" element={<CarDetails />} />
          <Route path="/edit-car" element={<EditCar />} />
          <Route path="/edit-car-rents" element={<EditCarRents />} />
          <Route path="/add-car-rent" element={<AddCarRent />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/rentals-booking" element={<AdminBookings />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
