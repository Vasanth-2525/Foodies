import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import productData from "../Product.json";
import { useStore } from "../Context/StoreContext";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const SinglePageMenu = () => {
  const { id } = useParams();
  const { addToCart, addToFavorites } = useStore();
  const product = productData.find((item) => item.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="text-center mt-10 text-lg">Product not found!</div>;
  }

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      />
    ));

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <PageHeader
        title={product.name}
        SubTitle="Menu"
        curPage="Single Dishes"
      />

      {/* Product Info */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 p-8 py-28">
        <div className="w-full max-w-md">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-96 object-cover rounded shadow-md"
          />
        </div>

        <div className="w-full max-w-2xl bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>

          <p className="text-justify">
            A delicious dish loved by everyone. Try it with our signature
            sauces! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Aliquid labore voluptates quaerat, quas obcaecati similique
            perspiciatis nemo praesentium fuga quasi?
          </p>

          <div className="flex items-center gap-2">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-500">({product.rating})</span>
          </div>

          <p className="text-xl text-yellow-600 font-semibold">
            ₹{product.price.toFixed(2)}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <div className="flex items-center shadow rounded">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 text-xl hover:bg-orange-500 hover:text-white"
              >
                -
              </button>
              <span className="px-4 py-2 text-sm">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 text-xl hover:bg-orange-500 hover:text-white"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => {
                addToCart(product, quantity);
                setQuantity(1);
              }}
              className="btn-primary"
            >
              Add to Cart
            </button>
            <button
              onClick={() => addToFavorites(product)}
              className="btn-secondary"
            >
              Add to Favorites
            </button>
          </div>
        </div>
      </div>

      {/* Review Slider */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="slider-container max-w-6xl mx-auto px-4 pb-20">
          <motion.h3
            variants={SlideUp(0.5)}
            initial="hidden"
            whileInView="show"
            className="text-2xl font-bold mb-4 text-center"
          >
            Customer Reviews
          </motion.h3>
          <Slider {...settings}>
            {product.reviews.map((review, index) => (
              <div key={index} className="px-3">
                {" "}
                {/* Add padding here */}
                <div className="p-6 bg-white rounded shadow text-center h-full">
                  <img
                    src={review.avatar}
                    alt={review.user}
                    className="mx-auto mb-4 w-16 h-16 rounded-full object-cover border"
                  />
                  <p className="italic text-gray-600 mb-2">
                    "{review.comment}"
                  </p>
                  <div className="flex justify-center mb-1">
                    {renderStars(review.rating)}
                  </div>
                  <p className="mt-2 font-semibold text-gray-800">
                    - {review.user}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default SinglePageMenu;
