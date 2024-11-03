import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const AccordionItem = ({ number, title, content, isOpen, toggle }) => (
  <li className="accordion block mb-4">
    {" "}
    {/* Margin between items */}
    <div
      className={`acc-btn cursor-pointer p-8 flex justify-between items-center ${
        isOpen ? "bg-[#f5b754] rounded-t-[20px]" : "bg-[#222] rounded-[20px]"
      }`}
      onClick={toggle}
    >
      <div className="flex items-center">
        <span
          className={`count mr-2 text-base font-bold ${
            isOpen ? "text-black" : "text-[#f5b754]"
          }`}
        >
          {number}.
        </span>
        <span
          className={`${
            isOpen ? "text-black font-bold" : "text-white font-bold"
          }`}
        >
          {title}
        </span>
      </div>
      {isOpen ? (
        <MdKeyboardArrowDown className="text-black font-light" />
      ) : (
        <MdKeyboardArrowRight className="text-[#f5b754] font-light" />
      )}
    </div>
    <div
      className={`acc-content transition-all duration-300 ${
        isOpen ? "max-h-40" : "max-h-0 overflow-hidden"
      }`}
    >
      <div className="content">
        <div className="text p-4 bg-[#222] text-[#999] rounded-b-[20px]">
          <p className="text-sm py-5  font-light">{content}</p>
        </div>
      </div>
    </div>
  </li>
);

const TheFaq = () => {
  const [openIndex1, setOpenIndex1] = useState(null);
  const [openIndex2, setOpenIndex2] = useState(null);

  const accordionData1 = [
    {
      number: 1,
      title: "Age and responsibility",
      content:
        "Driver must be 25+ years old to drive economy, luxury cars and supercars.",
    },
    {
      number: 2,
      title: "Deposit",
      content:
        "70% payment will be made for the duration of 24 days, cash deposits are also accepted. This amount will be used only for fines and toll road charges. terms & conditions apply.",
    },
    {
      number: 3,
      title: "Documents",
      content:
        "A Passport copy is required, Valid Driving License, Mobile number, Email address and Location and Time of delivery.",
    },
  ];

  const accordionData2 = [
    {
      number: 4,
      title: "Car Delivery",
      content:
        "At the time of Delivery our team will contact And Deliver the car to your Location. On spot, You will check the car, Sign the contract & receive the key. Enjoy your ride!",
    },
    {
      number: 5,
      title: "Enquire Now",
      content:
        "You can contact us for a quotation & our team will assist you with the booking process. You can use the contact methods available on this page.",
    },
    {
      number: 6,
      title: "Payment Methods",
      content:
        "We offer a variety of payment methods. We accept cash, Crypto and the majority of credit cards such as Visa, and MasterCard.",
    },
  ];

  const toggleAccordion = (index, setOpenIndex, openIndex) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full h-full font-outfit bg-[#1b1b1b]">
      <div className="container mx-auto xl:px-20 lg:px-20 px-10 py-20">
        <div className="flex w-full xl:flex-row lg:flex-row flex-col items-center lg:space-y-0 space-y-8 lg:space-x-8 xl:space-x-8">
          {/* First Accordion */}
          <div className="rounded-lg">
            <ul className="accordion-box">
              {accordionData1.map((item, index) => (
                <AccordionItem
                  key={item.number}
                  {...item}
                  isOpen={openIndex1 === index}
                  toggle={() =>
                    toggleAccordion(index, setOpenIndex1, openIndex1)
                  }
                />
              ))}
            </ul>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="https://webredox.net/demo/wp/renax/demo12/wp-content/uploads/sites/12/2024/04/about2.png"
              alt="About"
              className="w-full max-w-4xl rounded-lg"
            />
          </div>

          {/* Second Accordion */}
          <div className="p-6 rounded-lg">
            <ul className="accordion-box">
              {accordionData2.map((item, index) => (
                <AccordionItem
                  key={item.number}
                  {...item}
                  isOpen={openIndex2 === index}
                  toggle={() =>
                    toggleAccordion(index, setOpenIndex2, openIndex2)
                  }
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheFaq;
