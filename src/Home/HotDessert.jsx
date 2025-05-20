import Food1 from "../assets/food/food.png";
import Food2 from "../assets/food/food2-plate.png";
import Food3 from "../assets/food/banner.png";
import { motion } from "framer-motion";

// Animation variant
const SlideUp = (delay) => {
  return {
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
  };
};


const HotDessertData = [
  {
    id: 1,
    name: "Hot Cake",
    img: Food1,
    price: 80,
    delay: 0.4,
  },
  {
    id: 2,
    name: "Hot Cake",
    img: Food2,
    price: 110,
    delay: 0.8,
  },
  {
    id: 3,
    name: "Hot Cake",
    img: Food3,
    price: 200,
    delay: 1.2,
  },
];

const HotDessert = () => {
  return (
    <section className="h-auto px-[4%] py-14 bg-cream">
      <div className="container mx-auto px-4">
        <h3 className="text-green-600 text-2xl font-bold uppercase mb-8">
          Hot Desserts
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HotDessertData.map((item) => (
            <motion.div
              key={item.id}
              variants={SlideUp(item.delay)}
              initial="hidden"
              whileInView="show"
              className="group bg-white shadow-md p-6 flex items-center gap-4 "
            >
              <img
                src={item.img}
                alt={`Image of ${item.name}`}
                className="w-20 h-20 rounded-full img-shadow transition-transform duration-700 group-hover:scale-125 group-hover:rotate-[50deg]"
              />
              <div>
                <h4 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h4>
                <p className="text-yellow-600 font-bold">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotDessert;
