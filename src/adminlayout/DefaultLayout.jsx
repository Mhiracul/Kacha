import { useEffect, useState } from "react";
//import { AiOutlineSetting } from "react-icons/ai";
import PropTypes from "prop-types";
import RingLoader from "react-spinners/RingLoader";
import Sidebar from "../Admin/Components/Dashboard/Sidebar";
import Header from "../Admin/Components/Dashboard/Header";
import Loader from "../Loader";

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating loading delay with a timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-screen w-full  bg-[#000]">
      <div className="  relative">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        {isLoading ? (
          <div className=" h-screen">
            <Loader />
          </div>
        ) : (
          <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col  overflow-x-hidden">
              {/* <!-- ===== Header Start ===== --> */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>
                <div className="mx-auto max-w-screen-2xl rounded-lg bg-[#000]  overflow-y-auto p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
        )}
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
