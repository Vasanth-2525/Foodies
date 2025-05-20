import { useEffect, useState } from "react";
import PageHeader from "../Components/PageHeader";
import { RiDeleteBin5Line } from "react-icons/ri";

const Delivery = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("allOrders")) || [];
    setAllOrders(orders);
  }, []);

  // ✅ Delete specific order by ID
  const orderDelete = (orderID) => {
    const updatedOrders = allOrders.filter((item) => item.orderID !== orderID);
    setAllOrders(updatedOrders);
    localStorage.setItem("allOrders", JSON.stringify(updatedOrders));
  };

  return (
    <>
      <PageHeader title="Delivery Summary" curPage="Delivery" />
      <div className="p-4 sm:p-8 pt-28 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          All Order & Delivery Details
        </h2>

        {allOrders.length > 0 ? (
          <div className="grid gap-10">
            {allOrders.map((order) => (
              <div
                key={order.orderID}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded shadow bg-white"
              >
                {/* Delivery Address */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Delivery Address
                  </h3>
                  <h3 className="font-bold text-xl">
                    Order ID: {order.orderID}
                  </h3>
                  <p className="mb-1 font-medium ">
                    {order.deliveryAddress.name}
                  </p>
                  <p className="mb-1 ">
                    {order.deliveryAddress.street}
                  </p>
                  <p className="mb-1 ">
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} -{" "}
                    {order.deliveryAddress.zip}
                  </p>
                  <p className="mb-1">Phone: {order.deliveryAddress.phone}</p>
                  {order.deliveryAddress.Extra_recipes && (
                    <p className="mt-2 italic text-sm text-gray-600">
                      Extra Instructions: {order.deliveryAddress.Extra_recipes}
                    </p>
                  )}
                  {order.orderDate && (
                    <p className="mt-2 text-sm text-gray-500">
                      Order Date: {new Date(order.orderDate).toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-100 p-4 rounded">
                  <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                  <ul className="space-y-3 mb-4">
                    {order.orderSummary.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between border-b pb-2"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-right font-semibold text-lg">
                    Total: ₹{order.orderSummary.total.toFixed(2)}
                  </p>
                </div>

                {/* Delete Button */}
                <div className="md:col-span-2 flex justify-end">
                  <button
                    onClick={() => orderDelete(order.orderID)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <RiDeleteBin5Line size={20}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500 text-lg">No orders found.</p>
        )}
      </div>
    </>
  );
};

export default Delivery;
