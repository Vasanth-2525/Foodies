import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CiHeart } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { useStore } from "../Context/StoreContext";
import { useState } from "react";

// Sample product data
const products = [
  {
    id: 1,
    name: "Cheeseburger",
    category: "Burger",
    price: 299,
    img: "/src/assets/food/p1.jpeg",
    rating: 4,
    reviews: [],
  },
  {
    id: 2,
    name: "Chocolate Ice Cream",
    category: "Dessert",
    price: 199,
    img: "/src/assets/food/p2.jpeg",
    rating: 5,
    reviews: [],
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 399,
    img: "/src/assets/food/p3.jpeg",
    rating: 3,
    reviews: [],
  },
  {
    id: 5,
    name: "Sushi Platter",
    category: "Sushi",
    price: 499,
    img: "/src/assets/food/p5.jpeg",
    rating: 5,
    reviews: [],
  },
];

const SlideUp = (delay) => ({
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay },
  },
});
const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  return "⭐".repeat(fullStars);
};

const PopularRecipes = () => {
  const { addToFavorites } = useStore();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleNavigate = () => {
    navigate("/menu");
  };

  return (
    <section className="bg-cream px-4 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <motion.h3
          variants={SlideUp(0.5)}
          initial="hidden"
          whileInView="show"
          className="text-4xl font-league font-semibold uppercase"
        >
          Our Popular Recipes
        </motion.h3>

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === cat
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-800 hover:bg-yellow-100"
              } transition-all`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid justify-center items-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="group relative w-60 bg-white shadow-xl p-4 rounded-xl text-center transition-all duration-300 hover:shadow-2xl"
          >
            <div className="w-48 h-48 relative mb-4 flex items-center justify-center">
              <img
                src={item.img}
                alt={item.name}
                className="w-44 h-44 rounded-full  img-shadow
            group-hover:scale-x-110
            group-hover:translate-y-[-50px]
            group-hover:translate-x-10
            group-hover:rotate-[50deg]
            transition-all duration-700"
              />

              <button
                onClick={() => addToFavorites(item)}
                className="absolute top-5 left-0 p-2 rounded-full bg-red-700 text-white opacity-0 group-hover:opacity-100 transition-all duration-700"
                title="Add to Favorites"
              >
                <CiHeart size={25} />
              </button>

              <Link
                to={`/menu/${item.id}`}
                className="absolute top-16 left-0 p-2 rounded-full bg-red-700 text-white opacity-0 group-hover:opacity-100 transition-all duration-700"
                title="View Details"
              >
                <FaRegEye size={25} />
              </Link>
            </div>

            <h4 className="text-xl font-semibold text-gray-900">{item.name}</h4>
            <p className="text-yellow-600 font-bold text-lg">
              ₹{typeof item.price === "number" ? item.price.toFixed(2) : "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              {typeof item.rating === "number"
                ? `${getStars(item.rating)} (${item.rating.toFixed(1)})`
                : "No rating"}
            </p>
            <button
              onClick={handleNavigate}
              className="btn-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRecipes;
