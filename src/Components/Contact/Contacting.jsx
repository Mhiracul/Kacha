import { MdEmail, MdLocationOn, MdAccessTime, MdPhone } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl:
    "https://webredox.net/demo/wp/renax/demo12/wp-content/uploads/sites/12/2024/08/mapmarker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const Contacting = () => {
  const position = [6.4281, 3.4204];
  const popupText = "Ikoyi, Lagos, Nigeria";

  return (
    <div className="bg-[#1b1b1b] w-full font-outfit text-white">
      <div className="py-20">
        <div className="flex justify-center items-center relative">
          <div className="container mx-auto md:px-10 px-4">
            <div className="px-6 py-10 relative z-10 -mt-60">
              <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-9">
                {/* Email Us */}
                <div className="contact-box">
                  <div className="item bg-[#222] py-14 px-8 relative z-10 leading-none text-left overflow-hidden transition-all duration-300 ease-in-out transform-gpu preserve-3d rounded-[20px] hover:bg-[#f5b754] hover:shadow-lg hover:scale-105 group">
                    <a
                      href="mailto:info@kacha.com"
                      className="flex flex-col items-start"
                    >
                      <span className="text-[35px] text-[#f5b754] leading-none mb-4 inline-block transition duration-500 group-hover:text-black">
                        <MdEmail className="icon" />
                      </span>
                      <h5 className="rx-info-box-title font-outfit text-lg font-bold transition duration-500 group-hover:text-black">
                        Email us
                      </h5>
                      <p className="text-[#999] text-sm font-light transition duration-500 group-hover:text-black">
                        info@kacha.com
                      </p>
                      <MdEmail
                        className="absolute bottom-[-20px] right-[-20px] text-[120px]"
                        style={{ color: "rgba(255, 255, 255, 0.1)" }}
                      />
                    </a>
                  </div>
                </div>

                {/* Our Address */}
                <div className="contact-box">
                  <div className="item bg-[#222] py-14 px-8 relative z-10 leading-none text-left overflow-hidden transition-all duration-300 ease-in-out transform-gpu preserve-3d rounded-[20px] hover:bg-[#f5b754] hover:shadow-lg hover:scale-105 group">
                    <a
                      href="https://www.google.com/maps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-start"
                    >
                      <span className="text-[35px] text-[#f5b754] leading-none mb-4 inline-block transition duration-500 group-hover:text-black">
                        <MdLocationOn className="icon" />
                      </span>
                      <h5 className="rx-info-box-title font-outfit text-lg font-bold transition duration-500 group-hover:text-black">
                        Our address
                      </h5>
                      <p className="text-[#999] text-sm font-light transition duration-500 group-hover:text-black">
                        Ikoyi, Lagos, Nigeria
                      </p>
                      <MdLocationOn
                        className="absolute bottom-[-20px] right-[-20px] text-[120px]"
                        style={{ color: "rgba(255, 255, 255, 0.1)" }}
                      />
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="contact-box">
                  <div className="item bg-[#222] py-14 px-8 relative z-10 leading-none text-left overflow-hidden transition-all duration-300 ease-in-out transform-gpu preserve-3d rounded-[20px] hover:bg-[#f5b754] hover:shadow-lg hover:scale-105 group">
                    <div className="flex flex-col items-start">
                      <span className="text-[35px] text-[#f5b754] leading-none mb-4 inline-block transition duration-500 group-hover:text-black">
                        <MdAccessTime className="icon" />
                      </span>
                      <h5 className="rx-info-box-title font-outfit text-lg font-bold transition duration-500 group-hover:text-black">
                        Opening Hours
                      </h5>
                      <p className="text-[#999] text-sm font-light transition duration-500 group-hover:text-black">
                        Mon-Sun: 8 AM - 9 PM
                      </p>
                      <MdAccessTime
                        className="absolute bottom-[-20px] right-[-20px] text-[120px]"
                        style={{ color: "rgba(255, 255, 255, 0.1)" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Call Us */}
                <div className="contact-box">
                  <div className="item bg-[#222] py-14 px-8 relative z-10 leading-none text-left overflow-hidden transition-all duration-300 ease-in-out transform-gpu preserve-3d rounded-[20px] hover:bg-[#f5b754] hover:shadow-lg hover:scale-105 group">
                    <a
                      href="tel:+2348124985138"
                      className="flex flex-col items-start"
                    >
                      <span className="text-[35px] text-[#f5b754] leading-none mb-4 inline-block transition duration-500 group-hover:text-black">
                        <MdPhone className="icon" />
                      </span>
                      <h5 className="rx-info-box-title font-outfit text-lg font-bold transition duration-500 group-hover:text-black">
                        Call us
                      </h5>
                      <p className="text-[#999] text-sm font-light transition duration-500 group-hover:text-black">
                        +234 81-2498-5138
                      </p>
                      <p className="text-[#999] text-sm font-light transition duration-500 group-hover:text-black">
                        +234 81-0922-0869
                      </p>
                      <MdPhone
                        className="absolute bottom-[-20px] right-[-20px] text-[120px]"
                        style={{ color: "rgba(255, 255, 255, 0.1)" }}
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="py-10 flex flex-col lg:flex-row xl:flex-row w-full items-center xl:gap-24 mt-10 lg:gap-20 gap-10 justify-between">
                <div className="w-full">
                  <h1 className="text-center">Get In Touch</h1>
                  <div className="flex flex-col xl:flex-col mt-5 space-y-8">
                    {/* Name and Email Fields */}
                    <div className="flex flex-col lg:flex-row xl:flex-row xl:space-y-0 lg:space-y-0  space-y-4 lg:space-x-4 xl:space-x-4 w-full">
                      <input
                        type="text"
                        name="name"
                        className="rounded-full placeholder:text-[#999] placeholder:text-xs placeholder:font-light w-full lg:w-1/2 xl:w-1/2 font-light text-sm py-4 px-5 text-[#999] bg-[#222] outline-none"
                        placeholder="Your Name *"
                      />
                      <input
                        type="email"
                        name="email"
                        className="rounded-full w-full lg:w-1/2 xl:w-1/2 placeholder:text-[#999] placeholder:text-xs placeholder:font-light font-light text-sm py-4 px-5 text-[#999] bg-[#222] outline-none"
                        placeholder="Your Email *"
                      />
                    </div>

                    {/* Phone Number and Subject Fields */}
                    <div className="flex flex-col lg:flex-row xl:flex-row  xl:space-y-0 lg:space-y-0  space-y-4 lg:space-x-4 xl:space-x-4 mt-4 md:mt-0 w-full">
                      <input
                        type="tel"
                        name="phone"
                        className="rounded-full w-full lg:w-1/2 xl:w-1/2 placeholder:text-[#999] placeholder:text-xs placeholder:font-light font-light text-sm py-4 px-5 text-[#999] bg-[#222] outline-none"
                        placeholder="Your Phone Number *"
                      />
                      <input
                        type="text"
                        name="subject"
                        className="rounded-full w-full lg:w-1/2 xl:w-1/2 placeholder:text-[#999] placeholder:text-xs placeholder:font-light font-light text-sm py-4 px-5 text-[#999] bg-[#222] outline-none"
                        placeholder="Subject *"
                      />
                    </div>
                  </div>

                  {/* Additional message field */}
                  <div className="mt-8">
                    <textarea
                      name="message"
                      className="rounded-lg w-full font-light placeholder:text-[#999] placeholder:text-xs placeholder:font-light text-sm py-4 px-5 text-[#999] bg-[#222] outline-none"
                      placeholder="Your Message *"
                      rows="4"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-5 text-left">
                    <button className="bg-[#f5b754] text-black font-light text-sm py-2 px-6 rounded-full transition duration-300 hover:bg-[#e5a053]">
                      Submit
                    </button>
                  </div>
                </div>
                <div
                  className="rounded-md"
                  id="map-single"
                  style={{
                    height: "350px",
                    width: "100%",
                    borderRadius: "20px", // Add border-radius here
                    overflow: "hidden",
                  }}
                >
                  <MapContainer
                    center={position}
                    zoom={15}
                    className="rounded-md"
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="//{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={markerIcon}>
                      <Popup>{popupText}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacting;
