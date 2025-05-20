import React, { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);  

 
  const addToFavorites = (product) => {
    if (!favorites.some((item) => item.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter((item) => item.id !== productId));
  };

  
  const addToCart = (product, quantity = 1) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      const updated = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  return (
    <StoreContext.Provider
      value={{
        favorites,
        setFavorites,
        cartItems,
        setCartItems,
        addToFavorites,
        removeFromFavorites,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
