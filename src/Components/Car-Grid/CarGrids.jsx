import React from "react";
import Pics from "../../assets/7.jpg";
const CarGrids = () => {
  return (
    <div className="bg-[#1b1b1b] w-full font-outfit text-white py-20">
      <div className="md:px-20 px-10">
        {/* Section Title */}
        <div className="flex items-center flex-col gap-20 mb-12">
          <div className="bg-[#f5b754] w-[1px] h-16"></div>
        </div>

        <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 xl:gap-9 gap-20 md:px-20 px-0">
          <div className="relative ">
            <img src={Pics} alt="" className="rounded-3xl h-full" />

            <div className="absolute mx-auto -bottom-10  max-w-lg rounded-2xl left-0 right-0 bg-[#222] p-4">
              <div className="flex md:flex-row flex-row justify-between items-center">
                <div>
                  <div className="text-white md:text-lg text-sm md:font-semibold font-medium mb-2">
                    <a href="" className="hover:underline">
                      name
                    </a>
                  </div>
                  <div className="text-gray-300 md:text-sm text-xs mb-2">
                    details
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <a
                    href=""
                    className="block text-sm w-full text-center bg-yellow-500 text-black rounded-full py-2 px-6  hover:bg-yellow-600"
                  >
                    Details
                  </a>
                  <div className="items-center">
                    <span className="text-[#f5b754] text-lg font-semibold">
                      $price
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative ">
            <img src={Pics} alt="" className="rounded-3xl h-full" />

            <div className="absolute mx-auto -bottom-10  max-w-lg rounded-2xl left-0 right-0 bg-[#222] p-4">
              <div className="flex md:flex-row flex-row justify-between items-center">
                <div>
                  <div className="text-white md:text-lg text-sm md:font-semibold font-medium mb-2">
                    <a href="" className="hover:underline">
                      name
                    </a>
                  </div>
                  <div className="text-gray-300 md:text-sm text-xs mb-2">
                    details
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <a
                    href=""
                    className="block text-sm w-full text-center bg-yellow-500 text-black rounded-full py-2 px-6  hover:bg-yellow-600"
                  >
                    Details
                  </a>
                  <div className="items-center">
                    <span className="text-[#f5b754] text-lg font-semibold">
                      $price
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative ">
            <img src={Pics} alt="" className="rounded-3xl h-full" />

            <div className="absolute mx-auto -bottom-10  max-w-lg rounded-2xl left-0 right-0 bg-[#222] p-4">
              <div className="flex md:flex-row flex-row justify-between items-center">
                <div>
                  <div className="text-white md:text-lg text-sm md:font-semibold font-medium mb-2">
                    <a href="" className="hover:underline">
                      name
                    </a>
                  </div>
                  <div className="text-gray-300 md:text-sm text-xs mb-2">
                    details
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <a
                    href=""
                    className="block text-sm w-full text-center bg-yellow-500 text-black rounded-full py-2 px-6  hover:bg-yellow-600"
                  >
                    Details
                  </a>
                  <div className="items-center">
                    <span className="text-[#f5b754] text-lg font-semibold">
                      $price
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative ">
            <img src={Pics} alt="" className="rounded-3xl h-full" />

            <div className="absolute mx-auto -bottom-10  max-w-lg rounded-2xl left-0 right-0 bg-[#222] p-4">
              <div className="flex md:flex-row flex-row justify-between items-center">
                <div>
                  <div className="text-white md:text-lg text-sm md:font-semibold font-medium mb-2">
                    <a href="" className="hover:underline">
                      name
                    </a>
                  </div>
                  <div className="text-gray-300 md:text-sm text-xs mb-2">
                    details
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <a
                    href=""
                    className="block text-sm w-full text-center bg-yellow-500 text-black rounded-full py-2 px-6  hover:bg-yellow-600"
                  >
                    Details
                  </a>
                  <div className="items-center">
                    <span className="text-[#f5b754] text-lg font-semibold">
                      $price
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarGrids;
