import { useEffect, useState } from "react";
import { WishlistContext } from "./WishlistContext";

const WISHLIST_KEY = "shophive_wishlist";

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist =
        localStorage.getItem(WISHLIST_KEY);

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    } catch (error) {
      console.error("Wishlist loading error:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      WISHLIST_KEY,
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  const isFavorite = (productId) => {
    return wishlistItems.some(
      (item) => item._id === productId
    );
  };

  const toggleFavorite = (product) => {
    setWishlistItems((previousItems) => {
      const exists = previousItems.some(
        (item) => item._id === product._id
      );

      if (exists) {
        return previousItems.filter(
          (item) => item._id !== product._id
        );
      }

      return [...previousItems, product];
    });
  };

  const removeFavorite = (productId) => {
    setWishlistItems((previousItems) =>
      previousItems.filter(
        (item) => item._id !== productId
      )
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}