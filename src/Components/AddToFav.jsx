import React from "react";
import PageHeader from "./PageHeader";
import { useStore } from "../Context/StoreContext";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import bgImage from "../assets/food/empty-fav.webp";
import { useNavigate } from "react-router-dom";

const AddToFav = () => {
  const { favorites, removeFromFavorites } = useStore();
  const navigate = useNavigate();

  const getStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    return "⭐".repeat(fullStars);
  };

  const handlenavigate = () =>{
    navigate("/menu")
  }

  return (
    <div>
      <PageHeader title="Favorite Dishes" curPage="Add To Favorite" />

      <div className="mx-[5%] py-20">
        {favorites.length === 0 ? (
          <div
            className="relative cursor-pointer flex flex-col items-center justify-center text-center text-red-500 text-2xl"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
              minHeight: "70vh",
            }}
            onClick={handlenavigate}
          >
            <p className="absolute -top-10">No favorite dishes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="relative group text-center bg-white/70 shadow-xl p-6 rounded-2xl w-full max-w-xs hover:shadow-2xl transition duration-300"
              >
                <img
                  src={item.img || item.image}
                  alt={item.name || "Favorite Dish"}
                  className="w-44 h-44 rounded-full mx-auto img-shadow
                  group-hover:scale-x-110
                  group-hover:translate-y-[-50px]
                  group-hover:translate-x-10
                  group-hover:rotate-[50deg]
                  transition-all duration-700"
                />

                <button
                  onClick={() => removeFromFavorites(item.id)}
                  className="absolute top-4 left-4 p-2 rounded-full bg-red-700 text-white opacity-0 group-hover:opacity-100 transition duration-200"
                  title="Remove from Favorites"
                >
                  <MdDeleteOutline size={24} />
                </button>

                <Link to={`/menu/${item.id}`}>
                  <h4 className="text-lg font-semibold text-gray-900 hover:text-yellow-600 transition">
                    {item.name}
                  </h4>
                </Link>

                <p className="text-yellow-600 font-bold text-lg">
                  ₹{item.price?.toFixed(2) || "0.00"}
                </p>

                <p className="text-sm text-gray-600 mb-4">
                  {getStars(item.rating)} ({(item.rating || 0).toFixed(1)})
                </p>

                <Link to={`/menu/${item.id}`} className="mt-4 btn-primary inline-block">
                  Buy Now
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToFav;
