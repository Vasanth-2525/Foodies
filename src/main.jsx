import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Home from "./Home/Home.jsx";
import About from "./About/About.jsx";
import Menu from "./Menu/Menu.jsx";
import { StoreProvider } from "./Context/StoreContext.jsx";
import AddToCart from "./Components/AddToCart.jsx";
import AddToFav from "./Components/AddToFav.jsx";
import SinglePageMenu from "./Menu/SinglePageMenu.jsx";
import Contact from "./ContactUs/Contact.jsx";
import ErroePage from "./Components/ErroePage.jsx";
import CheckOutPage from "./Components/CheckOutPage.jsx";
import Delivery from "./Delivery/Delivery.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErroePage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/addtocart",
        element: <AddToCart/>,
      },
      {
        path: "/addtofav",
        element: <AddToFav/>,
      },
      {
        path: "/menu/:id",
        element: <SinglePageMenu/>,
      },
      {
        path: "/contact",
        element: <Contact/>,
      },
      {
        path: "/checkoutpage",
        element: <CheckOutPage/>,
      },
      {
        path: "/delivery",
        element: <Delivery/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider>
    <RouterProvider router={router} />
  </StoreProvider>
);
