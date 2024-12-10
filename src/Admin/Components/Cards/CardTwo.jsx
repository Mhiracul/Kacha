import { SiWebmoney } from "react-icons/si";
const CardTwo = () => {
  return (
    <div>
      <div className="relative flex flex-col min-w-0 break-words bg-[#05070D] text-slate-200 shadow-lg shadow-[#272f4f]] rounded-2xl bg-clip-border">
        <div className="flex-auto p-4">
          <div className="flex flex-row -mx-3">
            <div className="flex-none w-2/3 max-w-full px-3">
              <div>
                <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                  Bonus
                </p>
                <h5 className="mb-0 font-bold inline-flex items-end gap-0">
                  $0.00
                  <span className="leading-normal text-[10px] font-weight-bolder text-[#1C5FCC]">
                    +0%
                  </span>
                </h5>
              </div>
            </div>
            <div className="px-3 flex justify-center items-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-tl from-[#1C5FCC] to-[#03317b] flex justify-center items-center">
                <i className="text-white">
                  <SiWebmoney size={20} />{" "}
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTwo;
