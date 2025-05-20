import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/food/logo.png";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../Context/StoreContext";
import { FaArrowUp } from "react-icons/fa";

const SlideDown = (delay) => ({
  initial: {
    y: "-100%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: delay,
    },
  },
});

const Navmenu = [
  { id: 1, title: "Home", path: "/", delay: 0.1 },
  { id: 2, title: "About", path: "/about", delay: 0.2 },
  { id: 3, title: "Menu", path: "/menu", delay: 0.3 },
  { id: 4, title: "Delivery", path: "/delivery", delay: 0.4 },
  { id: 5, title: "Contact Us", path: "/contact", delay: 0.5 },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems, favorites } = useStore();

  const handleCart = () => navigate("/addtocart");
  const handleFav = () => navigate("/addtofav");

  const totalItems = cartItems.length;
  const totalfavitems = favorites.length;

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200); // show after 300px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="px-[4%] font-league bg-white2">
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed z-50 right-6 bottom-6 p-3  hover:bg-yellow-500  rounded-full shadow-lg transition duration-300"
          title="Back to Top"
        >
          <FaArrowUp size={20} />
        </button>
      )}

      <nav className="container mx-auto flex justify-between items-center text-2xl px-4 lg:px-6 relative">
        {/* Logo */}
        <div className="flex items-center">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            src={logo}
            alt="Logo"
            className="w-36"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-10 items-center">
          {Navmenu.map((item) => (
            <motion.div
              key={item.id}
              variants={SlideDown(item.delay)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <Link
                to={item.path}
                className="text-dark hover:text-lightYellow transition-all duration-300"
              >
                {item.title}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Cart + Fav + Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={handleCart}
            variants={SlideDown(0.8)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative bg-dark text-white p-3 rounded-full hover:bg-lightYellow transition"
          >
            <IoCartOutline size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-1 px-2 py-[1px] rounded-full bg-red-500 text-xs font-bold">
                {totalItems}
              </span>
            )}
          </motion.button>

          <motion.button
            onClick={handleFav}
            variants={SlideDown(1)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative bg-dark text-white p-3 rounded-full hover:bg-lightYellow transition"
          >
            <CiHeart size={18} />
            {totalfavitems > 0 && (
              <span className="absolute -top-2 -right-1 px-2 py-[1px] rounded-full bg-red-500 text-xs font-bold">
                {totalfavitems}
              </span>
            )}
          </motion.button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden focus:outline-none"
          >
            {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full bg-white2 text-center border-t border-gray-200 py-4 px-6 lg:hidden overflow-hidden z-40"
            >
              {Navmenu.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="block py-2 text-dark hover:text-lightYellow transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
