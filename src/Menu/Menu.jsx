import { useState, useEffect } from "react";
import PageHeader from "../Components/PageHeader";
import productData from "../Product.json";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStore } from "../Context/StoreContext";
import { CiHeart } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";

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

const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  return "⭐".repeat(fullStars);
};

const Menu = () => {
  const { addToFavorites } = useStore();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setProducts(productData);
  }, []);

  const categories = [
    "All",
    ...new Set(productData.map((item) => item.category)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  return (
    <div>
      <PageHeader title="Just Taste Our Delicious Dishes" curPage="Menu" />

      <section className="bg-cream px-4 py-20 min-h-screen mx-[5%]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h3
            variants={SlideUp(0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl font-league font-semibold uppercase py-8"
          >
            Our Tasty Dishes
          </motion.h3>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border transition duration-300
                ${
                  selectedCategory === category
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-gray-800 hover:bg-yellow-100"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center">
          {filteredProducts.map((item, index) => (
            <div
              key={item.id}
              className="relative group space-y-3 text-center bg-white/70 shadow-xl p-4 rounded-2xl w-full max-w-xs transition duration-300 ease-in-out hover:shadow-2xl"
            >
              <img
                src={item.img}
                alt={item.name || "Food Image"}
                className="
                  w-44 h-44 rounded-full mx-auto img-shadow
                  group-hover:scale-x-110
                  group-hover:translate-y-[-50px]
                  group-hover:translate-x-10
                  group-hover:rotate-[50deg]
                  transition-all duration-700
                "
              />

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => addToFavorites(item)}
                  className="absolute top-5 left-5 p-2 rounded-full bg-red-700 text-white opacity-0 group-hover:opacity-100 transition-all duration-700"
                  title="Add to Favorites"
                >
                  <CiHeart size={25} />
                </button>
                <Link
                  to={`/menu/${item.id}`}
                  className="absolute top-16 left-5 p-2 rounded-full bg-red-700 text-white opacity-0 group-hover:opacity-100 transition-all duration-700"
                  title="View Details"
                >
                  <FaRegEye size={25} />
                </Link>
              </div>

              <Link to={`/menu/${item.id}`}>
                <h4 className="text-xl font-semibold text-gray-900 hover:text-yellow-600 transition">
                  {item.name}
                </h4>
              </Link>
              <p className="text-yellow-600 font-bold text-lg">
                ₹
                {typeof item.price === "number" ? item.price.toFixed(2) : "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                {typeof item.rating === "number"
                  ? `${getStars(item.rating)} (${item.rating.toFixed(1)})`
                  : "No rating"}
              </p>

              <br />
              <Link
                to={`/menu/${item.id}`}
                className="btn-primary opacity-0 my-10 group-hover:opacity-100 transition-opacity duration-300"
              >
                Buy Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;
