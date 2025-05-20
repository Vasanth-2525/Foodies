import { motion } from "framer-motion";
import PageHeader from "../Components/PageHeader";
import { IoIosMail } from "react-icons/io";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  FaPhoneAlt,
  FaFacebookSquare,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPinterest,
  FaLocationArrow,
} from "react-icons/fa";

const SlideUp = (delay) => ({
  hidden: {
    y: "100%",
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: delay,
    },
  },
});

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_mz7jgpn', 'template_gi7vneo', form.current, {
        publicKey: 'isAR5Sy8Y4PABFBmC',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <div>
      <PageHeader title="Get in touch with us" curPage="Contact us" />

      <section className="max-w-7xl px-4 py-16 mx-[5%]">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
          <div className="group py-8 border flex flex-col items-center gap-2">
            <FaLocationArrow className="mt-1 text-xl group-hover:-translate-y-10 group-hover:text-3xl group-hover:text-orange-500 transition-all duration-700" />
            <p className="group-hover:tracking-[2px] text-center px-10 transition-all duration-700">
              82, 81, Mugappair Rd,
              Padi, Chennai, Tamil Nadu 600050
            </p>
          </div>

          <div className="group py-8 border flex flex-col items-center justify-center gap-2">
            <FaPhoneAlt className="mt-1 text-xl group-hover:-translate-y-10 group-hover:text-3xl group-hover:text-orange-500 transition-all duration-700" />
            <p className="group-hover:tracking-[2px] text-center px-10 transition-all duration-700">
              7550194445<br/>
              8110008918
            </p>
          </div>

          <div className="relative  group py-8 border flex  items-center justify-center gap-2">
            <FaFacebookSquare className="mt-1 text-xl group-hover:-translate-y-10 group-hover:text-3xl group-hover:text-orange-500 transition-all duration-700" />
            <FaTwitter className="mt-1 text-xl group-hover:-translate-y-10 group-hover:text-3xl group-hover:text-orange-500 transition-all duration-700"  />
            <FaLinkedin className="mt-1 text-xl group-hover:-translate-y-10 group-hover:text-3xl group-hover:text-orange-500 transition-all duration-700"  />
             <FaInstagram  className="mt-1 text-xl group-hover:-translate-y-10 group-hover:text-3xl group-hover:text-orange-500 transition-all duration-700" />
             <FaPinterest  className="mt-1 text-xl group-hover:-translate-y-10 group-hover:text-3xl group-hover:text-orange-500 transition-all duration-700" />
          <p className="absolute bottom-5 font-semibold text-xl opacity-0 group-hover:opacity-100 transition-all duration-700">Connect With Us</p>
          </div>
        </div>

        <div className="text-center mb-16">
          <motion.h3
            variants={SlideUp(0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl font-league font-semibold uppercase py-8"
          >
            GET IN TOUCH
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Map & Contact Info */}
          <div className="space-y-6 border p-2">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8835487708443!2d-73.971248!3d40.7982136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f630443e3be7%3A0xa8652506a7b80d58!2sHI%20New%20York%20City%20Hostel!5e0!3m2!1sen!2sus!4v1682731466014!5m2!1sen!2sus"
              className="w-full h-64 md:h-80 border-4 border-white shadow-md "
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-3">
                <FaLocationArrow /> 82, 81, Mugappair Rd,
                <br /> Padi, Chennai, Tamil Nadu 600050
              </p>
              <p className="flex items-center gap-3">
                <FaPhoneAlt /> 07550194445
              </p>
            </div>

            <div className="flex gap-4 pt-4 text-2xl text-gray-600 ">
              <button className="hover:text-orange-500">
                <FaFacebookSquare />
              </button>
              <button className="hover:text-orange-500">
                <FaTwitter />
              </button>
              <button className="hover:text-orange-500">
                <FaLinkedin />
              </button>
              <button className="hover:text-orange-500">
                <FaInstagram />
              </button>
              <button className="hover:text-orange-500">
                <FaPinterest />
              </button>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className=" p-8 border">
            <p className="text-xl font-semibold mb-4">Leave Us a Message</p>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="w-full bg-transparent border border-gray-300 p-3 focus:bg-white"
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full bg-transparent border border-gray-300 p-3 focus:bg-white"
              />
              <textarea
                rows="5"
                name="message"
                id="message"
                placeholder="Your message"
                className="w-full bg-transparent border border-gray-300 p-3 focus:bg-white"
              ></textarea>
              <button type="submit" className=" btn-secondary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
