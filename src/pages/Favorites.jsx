import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";

function Favorites() {
  const { addToCart } = useCart();

  const {
    wishlistItems,
    removeFavorite,
  } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#FCFBF7] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[65vh] max-w-4xl items-center justify-center">
          <div className="w-full rounded-3xl border border-[#E8E4D9] bg-white px-6 py-16 text-center shadow-sm">
            
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
              <Heart size={34} />
            </div>

            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
              SHOPHIVE
            </p>

            <h1 className="mt-2 text-3xl font-black text-[#17201D]">
              Your Favorites Are Empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6B746F]">
              Save products you love by tapping the heart icon.
              They'll appear here for easy access later.
            </p>

            <Link
              to="/store/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0F3D35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#174F45]"
            >
              <ShoppingBag size={18} />
              Explore Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FCFBF7] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <Link
            to="/store/shop"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#6B746F] transition hover:text-[#0F3D35]"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
                SHOPHIVE
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-[#17201D] sm:text-4xl">
                My Favorites
              </h1>

              <p className="mt-2 text-sm text-[#6B746F]">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1
                  ? "product"
                  : "products"}{" "}
                saved
              </p>
            </div>

            <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#0F3D35]/10 text-[#0F3D35] sm:flex">
              <Heart size={22} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((product) => (
            <div
              key={product._id}
              className="group overflow-hidden rounded-2xl border border-[#E8E4D9] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,61,53,0.12)]"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[#F1EFE7]">
                <Link
                  to={`/store/product/${product._id}`}
                  className="block h-full w-full"
                >
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    removeFavorite(product._id)
                  }
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-red-500 shadow-md backdrop-blur transition hover:scale-105"
                  aria-label="Remove from favorites"
                >
                  <Heart
                    size={19}
                    fill="currentColor"
                  />
                </button>
              </div>

              {/* Info */}
              <div className="p-5">
                <Link
                  to={`/store/product/${product._id}`}
                >
                  <h2 className="line-clamp-1 text-base font-bold text-[#17201D] transition hover:text-[#0F3D35]">
                    {product.name}
                  </h2>
                </Link>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[#6B746F]">
                  {product.desc}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-lg font-black text-[#0F3D35]">
                    PKR{" "}
                    {Number(
                      product.price || 0
                    ).toLocaleString()}
                  </span>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-2 rounded-xl bg-[#0F3D35] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#174F45]"
                  >
                    <ShoppingBag size={17} />
                    Add
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeFavorite(product._id)
                  }
                  className="mt-4 flex w-full items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A615C] transition hover:text-red-600"
                >
                  <Trash2 size={14} />
                  Remove Favorite
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Favorites;

