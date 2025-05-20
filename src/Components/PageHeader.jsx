import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SlideUp = (delay) => ({
  hidden: {
    y: "-100%",
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

const PageHeader = ({ title, SubTitle, curPage }) => {
  // Sanitize and format subtitle
  const formattedSubTitle =
    SubTitle && typeof SubTitle === "string"
      ? SubTitle.charAt(0).toLowerCase() + SubTitle.slice(1)
      : "";

  return (
    <div className="relative bg-white2 h-[50vh] flex items-center justify-center px-4 overflow-hidden">
      <span className="absolute -right-28 -bottom-20 w-[300px] h-[300px] rounded-full bg-lightYellow z-0" />
      <span className="absolute -left-28 -top-20 w-[300px] h-[300px] rounded-full bg-lightYellow z-0" />

      {/* Content */}
      <div className="text-center z-10">
        <motion.h3
          variants={SlideUp(0.5)}
          initial="hidden"
          whileInView="show"
          className="uppercase text-3xl md:text-4xl font-bold text-gray-800 mb-2"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={SlideUp(0.5)}
          initial="hidden"
          whileInView="show"
          className="text-gray-700 text-sm md:text-base"
        >
          <Link to="/" className="hover:underline text-gray-600">
            Home
          </Link>{" "}
          /
          {SubTitle && (
            <>
              <Link
                to={`/${formattedSubTitle}`}
                className="hover:underline text-gray-600"
              >
                {SubTitle}
              </Link>{" "}
              /{" "}
            </>
          )}
          <span className="text-gray-800 font-medium">{curPage}</span>
        </motion.p>
      </div>
    </div>
  );
};

export default PageHeader;
