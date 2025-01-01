import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
//import { logoutRedux, updateUser } from "../../../redux/userSlice";
//import { useDispatch, useSelector } from "react-redux";
//import toast from "react-hot-toast";
import { FaBox, FaCopy, FaPiggyBank } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
//import { logout } from "../../../Components/features/auth/authSlice";
import Logo from "../../../assets/logo.png";
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const navigate = useNavigate(); // Use useNavigate hook for navigation
  //const { isAuthenticated } = useSelector((state) => state.auth || {});

  // Example of a logout function
  /* const handleLogout = async () => {
    try {
      // Remove auth data
      localStorage.removeItem("auth");

      // Dispatch logout action and wait for it to complete
      await dispatch(logout());

      // Show success toast
      toast.success("Logout successful");

      // Navigate to sign-in page
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Logout failed: ", error);
      toast.error("Logout failed");
    }
  };
*/
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`fixed left-0 top-0 z-[999999] flex flex-col h-screen w-72 overflow-y-hidden bg-[#000] text-[#7e7e7e] shadow-md shadow-[#272f4f] duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen
          ? "translate-x-0 ml-4 my-4 rounded-2xl shadow-lg shadow-[#ccc]"
          : "-translate-x-full overflow-y-auto"
      }`}
    >
      <div className="flex flex-col flex-grow">
        <div className="max-w-62.5 overflow-hidden ease-nav-brand z-[990] fixed inset-y-0 my-4 ml-4 block w-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent">
          <div className="h-14">
            <div className="lg:hidden">
              <i
                ref={trigger}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                className="absolute top-0 right-0 block p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 lg:hidden"
              ></i>
            </div>
            <a
              className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-300"
              href=""
              target="_blank"
            >
              <div className="text-sm  flex gap-1 items-end font-bold text-[#1C5FCC]">
                <img className="w-28 rounded-full" src={Logo} alt="" />
              </div>
            </a>
          </div>

          <div className="items-center block w-auto flex-grow mt-20 max-h-screen overflow-auto h-sidenav  basis-full">
            <ul className="flex flex-col gap-6 pl-0 mb-0">
              <li className="mt-1.5 w-full">
                <Link
                  className="py-2.7 text-sm font-semibold ease-nav-brand my-0 mx-4 flex items-center text-[#7e7e7e]  whitespace-nowrap px-4 transition-colors"
                  to="/admin"
                >
                  <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg  bg-center stroke-0 text-center xl:p-2.5">
                    <FaPiggyBank />
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                    Add Cars
                  </span>
                </Link>
              </li>

              <li className="mt-1.5 w-full">
                <Link
                  className="py-2.7 text-sm font-semibold ease-nav-brand my-0 mx-4 flex items-center text-[#7e7e7e]  whitespace-nowrap px-4 transition-colors"
                  to="/traders"
                >
                  <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg  bg-center stroke-0 text-center xl:p-2.5">
                    <FaCopy />
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                    Inspections
                  </span>
                </Link>
              </li>

              <li className="mt-1.5 w-full">
                <Link
                  className="py-2.7 text-sm font-semibold ease-nav-brand my-0 mx-4 flex items-center text-[#7e7e7e]  whitespace-nowrap px-4 transition-colors"
                  to="/edit-car"
                >
                  <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg  bg-center stroke-0 text-center xl:p-2.5">
                    <FaCopy />
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                    Edit cars
                  </span>
                </Link>
              </li>

              <li className="mt-1.5 w-full">
                <Link
                  className="py-2.7 text-sm font-semibold ease-nav-brand my-0 mx-4 flex items-center text-[#7e7e7e]  whitespace-nowrap px-4 transition-colors"
                  to="/add-car-rent"
                >
                  <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg  bg-center stroke-0 text-center xl:p-2.5">
                    <FaCopy />
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                    Add Car Rentals
                  </span>
                </Link>
              </li>

              <li className="mt-1.5 w-full">
                <Link
                  className="py-2.7 text-sm font-semibold ease-nav-brand my-0 mx-4 flex items-center text-[#7e7e7e]  whitespace-nowrap px-4 transition-colors"
                  to="/rentals-booking"
                >
                  <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg  bg-center stroke-0 text-center xl:p-2.5">
                    <FaBox />
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                    Rentals Booking
                  </span>
                </Link>
              </li>

              <li className="mt-1.5 w-full">
                <Link
                  className="py-2.7 text-sm font-semibold ease-nav-brand my-0 mx-4 flex items-center text-[#7e7e7e]  whitespace-nowrap px-4 transition-colors"
                  to="/pending-requests"
                >
                  <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg  bg-center stroke-0 text-center xl:p-2.5">
                    <FaBox />
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                    Car Rentals
                  </span>
                </Link>
              </li>

              <li className="mt-0.5 w-full cursor-pointer" onClick="">
                <div className="py-2.7 text-sm font-semibold ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
                  <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg  bg-center stroke-0 text-center xl:p-2.5">
                    <IoLogIn />
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                    <button
                      type="button"
                      className="cursor-pointer font-semibold text-[#7e7e7e]"
                      onClick=""
                    >
                      Logout
                    </button>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};
Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;
