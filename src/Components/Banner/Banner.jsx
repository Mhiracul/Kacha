import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Car1 from "../../assets/Car1.png";
import Car2 from "../../assets/Car4.jpg";
import Car3 from "../../assets/Car3.png";
import { MdOutlineArrowOutward } from "react-icons/md";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: "20px", width: "100%" }}>
        <ul style={{ margin: "0px", padding: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          border: "1px solid #fff", // Empty border by default
          margin: "0 5px",
        }}
      ></div>
    ),
    dotsClass: "slick-dots custom-dots", // Custom class for active dot styling
  };

  const slides = [
    {
      background: Car2,
      title: "Car Rentals",
      price: "$600 ",
      viewDetailsLink: "/car-rentals",
      rentNowLink: "https://webredox.net/demo/wp/renax/demo12/car-listing/",
    },
    {
      background: Car1,
      title: "Car Sales",
      price: "$900",
      viewDetailsLink: "/car-sales",
      rentNowLink:
        "https://webredox.net/demo/wp/renax/demo12/product/aston-martin-dbx/",
    },
    {
      background: Car3,
      title: "Car Repaint",
      price: "$450",
      viewDetailsLink: "/car-repaint",
      rentNowLink:
        "https://webredox.net/demo/wp/renax/demo12/product/bugatti-mistral-w16/",
    },
  ];

  return (
    <div className="w-full h-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <section
            key={index}
            className="relative h-full font-outfit w-full flex flex-col items-center t"
          >
            {/* Background Image */}
            <img
              src={slide.background}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Header should appear on top of each slide */}

            {/* Slide Content */}
            <div className="relative z-10 flex flex-col justify-center h-[90vh] text-left text-white container mx-auto px-4">
              <h6 className="text-xs text-[#f5b754] font-light uppercase mb-2">
                * Premium
              </h6>
              <h1 className="md:text-7xl text-4xl font-bold mb-4">
                {slide.title}
              </h1>
              <h5 className="md:text-xl text-sm font-normal mb-6">
                {slide.subTitle}{" "}
              </h5>
              <div className="flex space-x-4">
                <a
                  href={slide.viewDetailsLink}
                  className="bg-[#f5b754] hover:bg-yellow-600 inline-flex gap-1  items-center text-black text-xs font-outfit px-6 py-3 rounded-full transition-all"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  View Details <MdOutlineArrowOutward />
                </a>
                {/*} <a
                  href=""
                  className="bg-transparent border border-[#f5b754] inline-flex gap-1  items-center text-[#f5b754] hover:bg-[#f5b754] hover:text-black text-xs font-outfit px-6 py-3 rounded-full transition-all"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  Rent Now <MdOutlineArrowOutward />
                </a> */}
              </div>
            </div>
          </section>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
