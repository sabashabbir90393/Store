import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { getProductById } from "../services/productService";
import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";
import Loader from "../components/Loader";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useWishlist();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((previous) => previous + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((previous) =>
      previous > 1 ? previous - 1 : 1
    );
  };

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  if (loading) {
    return <Loader text="Loading product..." />;
  }

  if (error || !product) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#FCFBF7] px-4 py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#E8E4D9] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-[#17201D]">
            Product Not Found
          </h1>

          <p className="mt-3 text-sm text-[#6B746F]">
            {error || "This product is no longer available."}
          </p>

          <Link
            to="/store/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0F3D35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#174F45]"
          >
            <ArrowLeft size={17} />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const favorite = isFavorite(product._id);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FCFBF7]">

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          to="/store/shop"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#6B746F] transition hover:text-[#0F3D35]"
        >
          <ArrowLeft size={17} />
          Back to Shop
        </Link>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Image */}
          <div className="overflow-hidden rounded-3xl border border-[#E8E4D9] bg-white shadow-sm">
            <div className="aspect-square overflow-hidden bg-[#F1EFE7]">
              <img
                src={product.imageURL}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">

            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
              SHOPHIVE COLLECTION
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-[#17201D] sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={17}
                    fill="#C9A227"
                    className="text-[#C9A227]"
                  />
                ))}
              </div>

              <span className="text-sm font-semibold text-[#6B746F]">
                5.0
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-3xl font-black text-[#0F3D35]">
                PKR {Number(product.price || 0).toLocaleString()}
              </span>
            </div>

            {/* Description */}
            <div className="mt-7 border-t border-[#E8E4D9] pt-7">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#17201D]">
                Product Description
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#6B746F]">
                {product.desc || "No description available for this product."}
              </p>
            </div>

            {/* Quantity + Favorite */}
            <div className="mt-8 flex flex-wrap items-center gap-4">

              <div className="flex items-center overflow-hidden rounded-xl border border-[#DCD8CC] bg-white">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="flex h-11 w-11 items-center justify-center text-[#0F3D35] transition hover:bg-[#F1EFE7]"
                  aria-label="Decrease quantity"
                >
                  <Minus size={17} />
                </button>

                <span className="flex h-11 min-w-12 items-center justify-center border-x border-[#E8E4D9] text-sm font-black text-[#17201D]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-11 w-11 items-center justify-center text-[#0F3D35] transition hover:bg-[#F1EFE7]"
                  aria-label="Increase quantity"
                >
                  <Plus size={17} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => toggleFavorite(product)}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                  favorite
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-[#DCD8CC] bg-white text-[#59635E] hover:border-red-200 hover:text-red-500"
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

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#0F3D35] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#0F3D35]/10 transition hover:bg-[#174F45] hover:shadow-xl sm:w-auto sm:min-w-64"
            >
              <ShoppingBag size={19} />
              Add {quantity > 1 ? `${quantity} Items` : "to Cart"}
            </button>

            {/* Trust Info */}
            <div className="mt-8 grid gap-3 border-t border-[#E8E4D9] pt-7 sm:grid-cols-3">
              <div>
                <p className="text-xs font-black text-[#17201D]">
                  Secure Shopping
                </p>
                <p className="mt-1 text-xs text-[#6B746F]">
                  Safe checkout
                </p>
              </div>

              <div>
                <p className="text-xs font-black text-[#17201D]">
                  Quality Products
                </p>
                <p className="mt-1 text-xs text-[#6B746F]">
                  Carefully selected
                </p>
              </div>

              <div>
                <p className="text-xs font-black text-[#17201D]">
                  Easy Ordering
                </p>
                <p className="mt-1 text-xs text-[#6B746F]">
                  Simple & quick
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;