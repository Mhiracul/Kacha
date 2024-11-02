import React from "react";
import { MdInfo } from "react-icons/md";

const CarRentalProcess = () => {
  return (
    <div className="bg-[#1b1b1b] w-full] font-outfit text-white py-20">
      <div className=" px-10">
        {/* Section Title */}
        <div className="flex items-center flex-col gap-20 mb-12">
          <div className="bg-[#f5b754] w-[1px] h-16"></div>
          <div>
            <div className="text-[rgb(245,183,84)] text-center text-sm uppercase tracking-widest mb-2">
              Steps
            </div>
            <div className="text-4xl text-center font-bold">
              Car Rental <span className="text-[#f5b754]">Process</span>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="flex lg:flex-row flex-col flex-wrap -mx-4">
          {[
            {
              step: "01",
              title: "Choose A Car",
              description:
                "View our range of cars, find your perfect car for the coming days.",
            },
            {
              step: "02",
              title: "Come In Contact",
              description:
                "Our advisor team is ready to help you with the booking process or any questions.",
            },
            {
              step: "03",
              title: "Enjoy Driving",
              description:
                "Receive the key and enjoy your car. We treat all our cars with respect.",
            },
          ].map((item, index) => (
            <div key={index} className="w-full lg:w-1/3 px-4 mb-8">
              <div
                className="relative bg-[#222]  p-2 py-10 h-64  "
                style={{
                  borderRadius: "20px 20px 20px 0px", // Applying the custom border-radius directly
                }}
              >
                <div className="absolute bottom-0 left-0  ">
                  <div className="relative w-12 h-12  flex items-center justify-center">
                    <div className="absolute inset-0  w-full h-full"></div>
                    <div
                      className="relative bg-[#1b1b1b] p-7  z-10 text-2xl font-bold"
                      style={{
                        borderRadius: "0 40px 0 0",
                      }}
                    >
                      <div className="bg-[#222] text-sm p-4 rounded-full">
                        {item.step}.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  <h5 className="text-xl font-medium">{item.title}</h5>
                  <p className="mt-10 text-sm max-w-[310px] font-light text-[#999] ">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="text-center mt-12">
          <p className="text-xs">
            <MdInfo className="inline-block mr-2 text-[#f5b754]" />
            If you{"'"}ve never rented a car before, we{"'"}ll guide you through
            the process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarRentalProcess;
