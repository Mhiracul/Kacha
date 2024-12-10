import Logo from "./assets/logo.png";

const Loader = () => {
  return (
    <div className="loader-container flex justify-center items-center h-screen bg-gray-800">
      <div className="flex flex-col items-center text-center l">
        <div className="rounded-full p-6 bg-[#222] shadow-md border-white border w-32 h-32 flex justify-center items-center loader-circle">
          <img src={Logo} alt="Logo" className="w-16 loader-logo" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
