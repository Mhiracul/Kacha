const WhatWeDo = () => {
  return (
    <div className="bg-[#1b1b1b] w-full] font-outfit text-white py-20">
      <div className=" px-10">
        {/* Section Title */}
        <div className="flex items-center flex-col gap-20 mb-12">
          <div className="text-[#f5b754] text-[10px] tracking-[0.3em] uppercase">
            What we do
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-9 md:px-20 px-0">
          {[
            {
              step: "01",
              title: "Daily Car Rental",
              description:
                "Lorem ipsum dolor sit amet the consectetur adipiscing elit entesque hendrerit elit nisan lacinia feugiat nunc eu aucton.",
            },
            {
              step: "02",
              title: "Monthly Car Rental",
              description:
                "Lorem ipsum dolor sit amet the consectetur adipiscing elit entesque hendrerit elit nisan lacinia feugiat nunc eu aucton.",
            },
            {
              step: "03",
              title: "Annual Car Rental",
              description:
                "Lorem ipsum dolor sit amet the consectetur adipiscing elit entesque hendrerit elit nisan lacinia feugiat nunc eu aucton.",
            },
          ].map((item, index) => (
            <div key={index} className="w-full">
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
                        padding: "10px 10px 10px",
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
      </div>
    </div>
  );
};

export default WhatWeDo;
