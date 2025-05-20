import React, { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Context/StoreContext";

const CheckOutPage = () => {
  const navigate = useNavigate();
  const { setCartItems } = useStore();

  const [checkoutData, setCheckoutData] = useState(null);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    Extra_recipes: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (data) {
      setCheckoutData(JSON.parse(data));
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkoutData) return;

    localStorage.setItem("deliveryAddress", JSON.stringify(address));
    localStorage.setItem("orderSummary", JSON.stringify(checkoutData));

    const existingOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    const newOrder = {
      orderID: "ORD" + Date.now(),
      orderDate: new Date().toISOString(),
      deliveryAddress: address,
      orderSummary: checkoutData,
    };


    // Push new order to the beginning of the array
    localStorage.setItem(
      "allOrders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    const options = {
      key: "rzp_test_yTS52rDf4bQQKY",
      amount: checkoutData.total * 100,
      currency: "INR",
      name: "STARTUP_PROJECTS",
      description: "Order Payment",
      handler: function (response) {
        localStorage.removeItem("cart");
        localStorage.removeItem("checkoutData");
        setCartItems([]);
        navigate("/delivery");
      },
      prefill: {
        name: address.name,
        email: "vasanthlogan2525@gmail.com",
        contact: address.phone,
      },
      notes: {
        address: `${address.street}, ${address.city}, ${address.state}, ${address.zip}`,
        extra: address.Extra_recipes,
      },
      theme: {
        color: "#3399cc",
      },
    };

    if (window.Razorpay) {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      alert("Razorpay SDK failed to load.");
    }
  };
  console.log(Date.now());

  return (
    <>
      <PageHeader title="Check Out Page" curPage="CheckOut" />

      <div className="p-4 sm:p-8 pt-28 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">
          Checkout
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          <form onSubmit={handleSubmit} className="flex-1 grid gap-4 w-full">
            {["name", "street", "city", "state", "zip", "phone", "Extra_recipes"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={
                  field === "zip"
                    ? "ZIP Code"
                    : field === "Extra_recipes"
                    ? "Any extra recipe notes?"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                onChange={handleChange}
                value={address[field]}
                className="p-2 border rounded w-full"
                required={field !== "Extra_recipes"}
              />
            ))}
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Place Order
            </button>
          </form>

          {checkoutData && (
            <div className="flex-1 bg-gray-100 p-4 rounded shadow w-full">
              <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
              <ul className="space-y-4 mb-4">
                {checkoutData.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-b pb-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-orange-600 font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="text-right text-lg font-semibold">
                Total: ₹{checkoutData.total.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
