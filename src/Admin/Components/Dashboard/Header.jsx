import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = (props) => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolling = window.scrollY > 0;
      setScrolling(isScrolling);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`px-6 w-full sticky top-0 z-[99999] ${
        scrolling ? "" : "bg-[#05070D] backdrop-blur-lg"
      }`}
    >
      <main
        className={`ease-soft-in-out  h-full rounded-xl transition-all duration-200 sticky top-[1%] bg-[#05070D] backdrop-blur-lg shadow-md shadow-[#191e31] z-[110]`}
      >
        <nav
          className={`relative flex items-center justify-between px-4 py-3 mx-auto transition-all shadow-none duration-250 ease-soft-in rounded-2xl`}
        >
          <div className="flex items-center">
            <nav>
              <h1 className="font-medium capitalize text-slate-200">
                Admin Page
              </h1>

              <h6 className="mb-0 font-bold text-[#1C5FCC] capitalize">
                Dashboard
              </h6>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sidebar toggle button */}
            <div
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="lg:hidden"
            >
              <a className="block text-slate-300">
                {props.sidebarOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </a>
            </div>

            {/* Settings icon */}
            {/* Add settings icon if needed */}

            {/* Notifications */}
            {/* Add notifications icon if needed */}
          </div>
        </nav>
      </main>
    </div>
  );
};

Header.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Header;
