import Car2 from "../../assets/3.jpg"; // Choose your desired image
import { MdOutlineArrowOutward } from "react-icons/md";

const Banner = () => {
  const slide = {
    background: Car2, // Set the background image here
    title: "Our Services",
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <section className="relative h-full font-outfit w-full flex flex-col items-center">
        {/* Background Image */}
        <img
          src={slide.background}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {/* Slide Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full py-44 text-left text-white container mx-auto px-4">
          <div className="text-[#f5b754] text-[10px] tracking-[0.3em] uppercase">
            What we do
          </div>
          <h1 className="md:text-5xl text-2xl py-6 font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="text-[#f5b754]">Services</span>
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Banner;
