import React from "react";
import Logo from "../assets/food/logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { MdMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-lightYellow rounded-t-3xl"
    >
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/*brand info*/}
          <div className="space-y-3 lg:max-w-[300px]">
            <img src={Logo} alt="" className="w-24" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus cumque perspiciatis, illo in veritatis. Temporibus
              doloribus, error, nisi ab nobis omnis sint .
            </p>
            <a href="#" className="inline-block mt-6 text-sm">
              Contact@food.com
            </a>
          </div>
          {/* Quick link */}

          <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h1 className="text-xl font-semibold">Quick Link</h1>
              <ul className="space-y-3 mt-6">
                <li className="footer-link flex items-center gap-1">
                  <IoIosArrowForward className="text-xl  font-bold" />{" "}
                  <Link to="/">Home</Link>
                </li>
                <li className="footer-link flex items-center gap-1">
                  <IoIosArrowForward className="text-xl  font-bold" />
                  <Link to="/about"> About</Link>
                </li>
                <li className="footer-link flex items-center gap-1">
                  <IoIosArrowForward className="text-xl  font-bold" />
                  <Link to="/menu">Menu</Link>
                </li>
                <li className="footer-link flex items-center gap-1">
                  <IoIosArrowForward className="text-xl  font-bold" />{" "}
                  <Link to="/contact">Contact us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Menu List</h1>
              <ul className="space-y-3 mt-6">
                <li className="footer-link flex items-center gap-1">
                  <IoIosArrowForward className="text-xl  font-bold" />
                  Meals
                </li>
                <li className="footer-link flex items-center gap-1">
                  <IoIosArrowForward className="text-xl  font-bold" /> Hot
                  Dessert
                </li>
                <li className="footer-link flex items-center gap-1">
                  <IoIosArrowForward className="text-xl  font-bold" /> Hot Cake
                </li>
                <li className="footer-link flex items-center gap-1">
                  <IoIosArrowForward className="text-xl  font-bold" /> Salad
                </li>
              </ul>
            </div>

            <div>
              <h1 className="text-xl font-semibold">Address</h1>
              <ul className="space-y-3 mt-6">
                <li className="footer-link flex items-center gap-2">
                  <FaLocationDot className="text-xl " /> 121/New Street,
                  Tirupattur
                </li>
                <li className="footer-link flex items-center gap-2">
                  <FaPhone className="text-xl" /> +91 4567899799
                </li>
                <li className="footer-link flex items-center gap-2">
                  <MdMail className="text-xl" /> Foodies@gmail.com
                </li>
                <li className="footer-link flex items-center gap-2">
                  <TbWorld className="text-xl" /> www.Foodies.com
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
