import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import BannerPng from "../assets/food/banner.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Animation variant
const SlideUp = (delay) => ({
  hidden: {
    y: "100%",
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: delay,
    },
  },
});

// Slider settings
const settings = {
  dots: false,
  arrows: true, 
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

// Testimonial data
const TestimonialData = [
  {
    id: 1,
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti blanditiis ipsam, optio molestias sit itaque a. Sint, vero obcaecati. Ipsam.",
    img: "https://picsum.photos/id/237/200/300",
    name: "John Doe",
    role: "Founder, Example Co.",
  },
  {
    id: 2,
    content:
      "Quisquam vel reprehenderit dolorum illum magnam suscipit at accusantium eveniet, doloribus eius libero tempora.",
    img: "https://picsum.photos/id/238/200/300",
    name: "Jane Smith",
    role: "Designer, Pixel Co.",
  },
  {
    id: 3,
    content:
      "Nesciunt fugit placeat voluptatem porro dicta animi quae delectus amet, aliquid temporibus blanditiis.",
    img: "https://picsum.photos/id/239/200/300",
    name: "Alice Johnson",
    role: "Developer, CodeCraft",
  },
];

const Testimonial = () => { 
  return (
    <div className="container pb-16  h-auto">
      <motion.h3
        variants={SlideUp(0.5)}
        initial="hidden"
        whileInView={"show"}
        className="text-4xl text-center font-league font-semibold uppercase py-8"
      >
        {" "}
        Our Client Review
      </motion.h3>
      <Slider {...settings}>
        {TestimonialData.map((testimonial, index) => (
          <div key={testimonial.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 place-items-center">
              {/* Text section */}
              <div className="space-y-5 lg:max-w-[400px]">
                <motion.p
                  variants={SlideUp(0.4)}
                  initial="hidden"
                  whileInView="show"
                  className="font-serif text-xl"
                >
                  "{testimonial.content}"
                </motion.p>

                <div className="flex items-center gap-3 mt-4">
                  <motion.img
                    variants={SlideUp(0.8)}
                    initial="hidden"
                    whileInView="show"
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <motion.div
                    variants={SlideUp(1.2)}
                    initial="hidden"
                    whileInView="show"
                  >
                    <h2 className="text-xl font-bold">{testimonial.name}</h2>
                    <p className="text-sm">{testimonial.role}</p>
                  </motion.div>
                </div>
              </div>

              {/* Image section */}
              <div className="relative">
                <motion.img
                  initial={{ opacity: 0, x: -100, y: 100 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  whileHover={{ scale: 1.2, rotate: 15, x: 50, y: -50 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    scale: { duration: 0.5 },
                  }}
                  src={BannerPng}
                  alt="Banner"
                  className="relative z-10 w-full lg:max-w-[350px] img-shadow"
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute top-[50%] right-[50%] transform translate-x-[50%] translate-y-[-50%] h-[400px] w-[400px] bg-lightYellow rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
