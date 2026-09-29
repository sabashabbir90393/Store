import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const {
    isFavorite,
    toggleFavorite,
  } = useWishlist();

  const favorite = isFavorite(product._id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleFavorite = () => {
    toggleFavorite(product);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E8E4D9] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,61,53,0.12)]">

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-[#F1EFE7]">

        <img
          src={product.imageURL}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Favorite */}
        <button
          type="button"
          onClick={handleFavorite}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur transition hover:scale-105 ${
            favorite
              ? "text-red-500"
              : "text-[#59635E] hover:text-red-500"
          }`}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Heart
            size={19}
            fill={favorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5">

        <Link to={`/store/product/${product._id}`}>
          <h3 className="line-clamp-1 text-base font-bold text-[#17201D] transition hover:text-[#0F3D35]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[#6B746F]">
          {product.desc}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">

          <span className="text-lg font-black text-[#0F3D35]">
            PKR {Number(product.price || 0).toLocaleString()}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center gap-2 rounded-xl bg-[#0F3D35] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#174F45]"
          >
            <ShoppingBag size={17} />
            Add
          </button>

        </div>

        <Link
          to={`/store/product/${product._id}`}
          className="mt-4 block text-center text-xs font-bold uppercase tracking-wider text-[#C9A227] transition hover:text-[#0F3D35]"
        >
          View Details
        </Link>

      </div>
    </div>
  );
}

export default ProductCard;