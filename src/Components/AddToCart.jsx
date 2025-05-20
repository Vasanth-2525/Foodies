import React from "react";
import PageHeader from "./PageHeader";
import { useStore } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import bgImage from "../assets/food/empty-cart.png";

const AddToCart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useStore();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const cartSummary = {
      items: cartItems,
      total: totalPrice,
    };
    localStorage.setItem("checkoutData", JSON.stringify(cartSummary));
    navigate("/checkoutpage");
  };
  const handlenavigate = () =>{
    navigate("/menu")
  }

  return (
    <div>
      <PageHeader title="Add To Cart" curPage="Cart" />
      <div className="p-8 max-w-6xl mx-auto">
        {cartItems.length === 0 ? (
          <p
            className="relative cursor-pointer h-[50vh] text-red-500 flex items-center justify-center text-3xl"
            style={{
              backgroundImage: `url(${bgImage})`,
              minHeight: "70vh",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "30%",
            }}
            onClick={handlenavigate}
          >
            <span className="absolute top-0">Your cart is empty.</span>
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                  <div className="flex items-center gap-4 w-full sm:w-1/2">
                    <img
                      src={`${item.img}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-full shadow"
                    />
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6 w-full sm:w-1/2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg"
                      >
                        -
                      </button>
                      <span className="font-semibold px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg"
                      >
                        +
                      </button>
                    </div>
                    <p>
                      <span className="font-semibold">Price:</span> ₹
                      {item.price.toFixed(2)}
                    </p>
                    <p className="text-yellow-700 font-semibold">
                      <span className="text-gray-900">Total:</span> ₹
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 bg-orange-600 hover:bg-orange-700 rounded-full text-white"
                      title="Remove"
                    >
                      <MdDeleteOutline size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Total + Checkout */}
            <div className="mt-10 p-6 bg-gray-100 rounded shadow flex flex-col sm:flex-row justify-between items-center">
              <h3 className="text-xl font-semibold mb-4 sm:mb-0">
                Cart Total: ₹{totalPrice.toFixed(2)}
              </h3>
              <button
                onClick={handleCheckout}
                className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 font-semibold rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
