import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

const Price = () => {
  return (
    <div className="bg-[#1b1b1b] w-full font-outfit text-white py-20">
      <div className="px-10">
        {/* Section Title */}
        <div className="flex items-center flex-col gap-20 mb-12">
          <div className="bg-[#f5b754] w-[1px] h-16"></div>
        </div>

        {/* Process Steps */}
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-9 md:px-20 px-0">
          {[
            {
              step: "$120",
              title: "Standard Plan",
              subtitle: "Per Day",
              description: (
                <ul className="custom-list flex flex-col gap-4">
                  <li>Lorem isum amet in the mis</li>
                  <li>Vestibulum drana silver</li>
                  <li>Elentesue habitant farmen</li>
                  <li>Vivamus esse nis drana</li>
                </ul>
              ),
              button: (
                <a
                  href=""
                  className="bg-[#f5b754]  inline-flex gap-1  items-center text-[#000] hover:bg-[#fff] hover:text-black text-xs font-outfit px-6 py-3 rounded-full transition-all"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  Rent Now <MdOutlineArrowOutward />
                </a>
              ),
            },
            {
              step: "$150",
              title: "Pro Plan",
              subtitle: "Per Day",
              description: (
                <ul className="custom-list flex flex-col gap-4">
                  <li>Lorem isum amet in the mis</li>
                  <li>Vestibulum drana silver</li>
                  <li>Elentesue habitant farmen</li>
                  <li>Vivamus esse nis drana</li>
                </ul>
              ),
              button: (
                <a
                  href=""
                  className="bg-[#f5b754]  inline-flex gap-1  items-center text-[#000] hover:bg-[#fff] hover:text-black text-xs font-outfit px-6 py-3 rounded-full transition-all"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  Rent Now <MdOutlineArrowOutward />
                </a>
              ),
            },
            {
              step: "$180",
              title: "Premium Plan",
              subtitle: "Per Day",
              description: (
                <ul className="custom-list flex flex-col gap-4">
                  <li>Lorem isum amet in the mis</li>
                  <li>Vestibulum drana silver</li>
                  <li>Elentesue habitant farmen</li>
                  <li>Vivamus esse nis drana</li>
                </ul>
              ),
              button: (
                <a
                  href=""
                  className="bg-[#f5b754]  inline-flex gap-1  items-center text-[#000] hover:bg-[#fff] hover:text-black text-xs font-outfit px-6 py-3 rounded-full transition-all"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  Rent Now <MdOutlineArrowOutward />
                </a>
              ),
            },
          ].map((item, index) => (
            <div key={index} className="w-full group ">
              <div
                className={`relative bg-[#222] px-5 py-20 h-full transition-all duration-300 ${
                  index === 1 ? "" : "rounded-tl-lg rounded-tr-lg "
                }`}
                style={{
                  borderRadius:
                    index === 1 ? "20px 20px 20px 20px" : "20px 20px 20px 20px",
                }}
              >
                <div
                  className={`absolute top-0 right-0 ${
                    index === 1 ? "" : "hidden group-hover:block"
                  }`}
                >
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 w-full h-full"></div>
                    <div
                      className="relative bg-[#1b1b1b] p-4 z-10 text-2xl font-bold"
                      style={{
                        borderRadius: "0 40px 0 40px",
                        padding: "10px 10px 10px",
                      }}
                    >
                      <div
                        className={`bg-[#f5b754] text-black text-sm p-4 rounded-full ${
                          index === 1 ? "" : "hidden group-hover:block"
                        }`}
                      >
                        {item.step}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  <h5 className="text-xl font-medium">{item.title}</h5>
                  <div className="text-[#f5b754] font-extralight text-[9px] tracking-[0.2em] uppercase">
                    {item.subtitle}
                  </div>
                  <p className="mt-10 text-sm max-w-[310px] font-light text-[#999] ">
                    {item.description}
                  </p>
                  <div className="mt-10">{item.button}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice */}
      </div>
    </div>
  );
};

export default Price;
