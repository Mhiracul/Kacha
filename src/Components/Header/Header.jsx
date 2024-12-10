import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { PiPhoneCallLight } from "react-icons/pi";
import logo from "../../assets/logo.png";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [showCarsDropdown, setShowCarsDropdown] = useState(false);

  const handleClick = () => {
    setNav(!nav);
  };

  return (
    <header className="w-full font-outfit bg-[#1b1b1b] text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-10">
        {/* Logo */}
        <div className="flex items-center text-xl font-bold text-[#ffb400]">
          <img className="w-28 rounded-full" src={logo} alt="Logo" />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-8 text-sm font-light items-center">
          <Link to="/" className="hover:text-[#f5b754] font-light">
            Home
          </Link>
          <Link to="/about" className="hover:text-[#f5b754] ">
            About
          </Link>
          <Link to="/services" className="hover:text-[#f5b754] ">
            Services
          </Link>

          {/* Cars Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setShowCarsDropdown(!showCarsDropdown)}
              className="flex items-center hover:text-[#f5b754] "
            >
              Cars <RiArrowDropDownLine className="ml-1" />
            </button>
            {showCarsDropdown && (
              <div className="absolute left-0 mt-2 bg-[#222] z-20 text-white min-w-48 p-4 rounded-md shadow-lg">
                <Link
                  to="/car-sales"
                  className="block py-1 hover:text-[#f5b754]"
                >
                  Car Sales
                </Link>
                <Link
                  to="/car-rentals"
                  className="block py-1 hover:text-[#f5b754]"
                >
                  Car Rentals
                </Link>
                <Link
                  to="/car-repaint"
                  className="block py-1 hover:text-[#f5b754]"
                >
                  Car Repaint
                </Link>
                <Link
                  to="/car-details"
                  className="block py-1 hover:text-[#f5b754]"
                >
                  Car Details
                </Link>
              </div>
            )}
          </div>

          <Link to="/contact" className="hover:text-[#f5b754] ">
            Contact
          </Link>

          <div className="flex space-x-6 items-center">
            {/* Cart Icon */}
            {/*  <a className="cart-mini-uri nav-link" href="/cart">
              <TiShoppingCart className="text-lg cursor-pointer" />
            </a>
*/}
            {/* Contact Section */}
            <div className="flex items-center space-x-2">
              {/* Phone Icon */}
              <a
                href="tel:+2348124985138"
                className="flex items-center space-x-2"
              >
                <div className="border-[#f5b754] hover:bg-[#f5b754] border rounded-full p-2">
                  <PiPhoneCallLight className="text-lg" />
                </div>
                <div className="text-left">
                  <p className="text-xs">Need help?</p>
                  <h5 className="text-sm text-[#f5b754]">
                    <a href="tel:+2348124985138">81 2498 5138</a>
                  </h5>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="lg:hidden" onClick={handleClick}>
          {nav ? <FaTimes color="#FFF" /> : <FaBars color="#FFF" />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-1/2 z-[99999] bg-[#1b1b1b] transition-transform transform duration-300 ease-in-out ${
          nav ? "translate-y-16 " : "-translate-y-full"
        }`}
      >
        <ul className="text-white container mx-auto  px-16 text-sm font-light py-4">
          <li>
            <Link to="/" className="block py-2">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="block py-2">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="block py-2">
              Services
            </Link>
          </li>
          <li>
            <button
              onClick={() => setShowCarsDropdown(!showCarsDropdown)}
              className="py-2 flex justify-between items-center w-full"
            >
              Cars <RiArrowDropDownLine />
            </button>
            {showCarsDropdown && (
              <div className="bg-[#222] text-white px-4 py-2">
                <Link
                  to="/car-sales"
                  className="block py-1 hover:text-[#f5b754]"
                >
                  Car Sales
                </Link>
                <Link
                  to="/car-rentals"
                  className="block py-1 hover:text-[#f5b754]"
                >
                  Car Rentals
                </Link>
                <Link
                  to="/car-repaint"
                  className="block py-1 hover:text-[#f5b754]"
                >
                  Car Repaint
                </Link>
                <Link
                  to="/car-details"
                  className="block py-1 hover:text-[#f5b754]"
                >
                  Car Details
                </Link>
              </div>
            )}
          </li>
          <li>
            <Link to="/contact" className="block py-2">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
