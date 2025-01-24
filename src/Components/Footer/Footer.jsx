import React from "react";
import logo from "../../assets/logo.png";
import {
  FaEnvelope,
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import { LuDot } from "react-icons/lu";

import { PiPhoneCall } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import {
  MdOutlineArrowCircleLeft,
  MdOutlineArrowLeft,
  MdOutlineArrowOutward,
} from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#1b1b1b] font-outfit text-white py-8">
      <div className="container mx-auto lg:px-20 md:px-10 px-10">
        {/* First Footer Section */}
        <div className="mb-8 py-10 ">
          <div className="flex border border-[#282828] rounded-lg w-full py-5 container mx-auto lg:px-10  px-2  flex-col lg:flex-row justify-between">
            <div className="flex  w-full flex-col lg:flex-row space-y-4 md:space-y-0 md:space-x-8">
              {/* Contact Links */}
              <div className="flex lg:flex-row flex-col w-full justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 items-center  bg-[#f5b754] p-4 rounded-full">
                    <PiPhoneCall className="text-xl text-black" />
                  </div>
                  <div>
                    <h6 className="font-bold text-sm">Call us</h6>
                    <p>
                      <a
                        href="tel:+2348124985138"
                        className="hover:underline text-[#999] text-sm"
                      >
                        +2348124985138
                      </a>
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-600 my-4"></div>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 items-center  bg-[#f5b754] p-4 rounded-full">
                    <FaEnvelope className="text-xl text-black" />
                  </div>
                  <div>
                    <h6 className="font-bold text-sm">Write to us</h6>
                    <p>
                      <a
                        href="mailto:info@kacha.com"
                        className="hover:underline text-[#999] text-sm"
                      >
                        info@kacha.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-600 my-4"></div>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 items-center  bg-[#f5b754] p-4 rounded-full">
                    <CiLocationOn className="text-xl text-black" />
                  </div>
                  <div>
                    <h6 className="font-bold text-sm">Address</h6>
                    <p>
                      <a
                        href="https://www.google.com/maps"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-[#999] text-sm"
                      >
                        Lagos, Nigeria.
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Footer Section */}
        <div className="flex w-full flex-col md:flex-row md:items-center items-start justify-between">
          <div className=" mb-8 md:mb-0">
            <div className="footer-logo mb-4">
              <a href="">
                <img src={logo} alt="Kacha" className="w-28" />
              </a>
            </div>
            <p
              className="mb-4 max-w-xs  font-extralight text-sm"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              Rent a car with ease and enjoy a seamless and convenient
              experience with our premium service.
            </p>
            <div className="social-icons">
              <ul className="flex space-x-4">
                <li className="border border-[#f5b754] rounded-full p-4">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white"
                  >
                    <FaFacebookF />{" "}
                  </a>
                </li>
                <li className="border border-[#f5b754] rounded-full p-4">
                  <a
                    href="https://www.instagram.com/kacha_autos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white  hover:text-white"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li className="border border-[#f5b754] rounded-full p-4">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white"
                  >
                    <FaTiktok />{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className=" mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul
              className=" font-extralight  text-sm"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              <li>
                <a
                  href="/about"
                  className="hover:underline inline-flex items-center gap-[0.4px]"
                >
                  <LuDot className="text-[#f5b754] text-3xl" />
                  About
                </a>
              </li>
              <li>
                <a
                  href="/car-sales"
                  className="hover:underline inline-flex items-center gap-[0.4px]"
                >
                  <LuDot className="text-[#f5b754] text-3xl" />
                  Cars
                </a>
              </li>

              <li>
                <a
                  href="/FAQ"
                  className="hover:underline inline-flex items-center gap-[0.4px]"
                >
                  <LuDot className="text-[#f5b754] text-3xl" />
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:underline inline-flex items-center gap-[0.4px]"
                >
                  <LuDot className="text-[#f5b754] text-3xl" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="text-lg font-bold mb-4">Subscribe</h3>
            <form
              id="mc4wp-form-1"
              className="mc4wp-form"
              method="post"
              data-id="1212"
              data-name="Demo Form"
            >
              <div className="mc4wp-form-fields font-light max-w-xs text-[#999] text-sm">
                <p className="mb-4">
                  Want to be notified about our services? Just sign up and we'll
                  send you a notification by email.
                </p>
                <div className="border border-[#f5b754] rounded-full w-full flex items-center justify-between px-2">
                  <input
                    type="email"
                    name="EMAIL"
                    placeholder="Your email address"
                    required
                    className="p-4  bg-transparent outline-none "
                  />
                  <button
                    type="submit"
                    className="bg-[#f5b754] text-black p-4 rounded-full hover:bg-blue-700"
                  >
                    <MdOutlineArrowOutward />
                  </button>
                </div>
              </div>
              <div className="mc4wp-response"></div>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 border-t border-[#282828] pt-4">
          <div className="text-left text-xs font-light">
            <p
              className="mb-0 text-[#999] "
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              ©2024{" "}
              <a
                href="/"
                className="hover:underline underline  underline-[#f5b754] text-white"
              >
                Kacha
              </a>
              . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
