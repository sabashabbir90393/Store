import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/useCart";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#FCFBF7] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[65vh] max-w-4xl items-center justify-center">
          <div className="w-full rounded-3xl border border-[#E8E4D9] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0F3D35]/10 text-[#0F3D35]">
              <ShoppingBag size={34} />
            </div>

            <h1 className="mt-6 text-3xl font-black text-[#17201D]">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6B746F]">
              Looks like you haven't added anything to your cart yet.
              Explore SHOPHIVE and find something you'll love.
            </p>

            <Link
              to="/store/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0F3D35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#174F45]"
            >
              <ShoppingBag size={18} />
              Start Shopping
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
                Shopping Cart
              </h1>

              <p className="mt-2 text-sm text-[#6B746F]">
                {cartItems.length}{" "}
                {cartItems.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Cart Items */}
          <section className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-5 rounded-2xl border border-[#E8E4D9] bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                {/* Image */}
                <Link
                  to={`/store/product/${item._id}`}
                  className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-[#F1EFE7] sm:h-28 sm:w-28"
                >
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </Link>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/store/product/${item._id}`}
                    className="text-base font-bold text-[#17201D] transition hover:text-[#0F3D35]"
                  >
                    {item.name}
                  </Link>

                  <p className="mt-1 line-clamp-2 text-sm text-[#6B746F]">
                    {item.desc}
                  </p>

                  <p className="mt-3 text-base font-black text-[#0F3D35]">
                    PKR {Number(item.price || 0).toLocaleString()}
                  </p>
                </div>

                {/* Quantity + Remove */}
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="flex items-center rounded-xl border border-[#DDD9CE] bg-[#FCFBF7]">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.quantity - 1
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center text-[#0F3D35] transition hover:bg-[#EAE7DE]"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="w-9 text-center text-sm font-bold text-[#17201D]">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.quantity + 1
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center text-[#0F3D35] transition hover:bg-[#EAE7DE]"
                      aria-label="Increase quantity"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item._id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#8A615C] transition hover:text-red-600"
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl border border-[#E8E4D9] bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#C9A227]" />
              <h2 className="text-lg font-black text-[#17201D]">
                Order Summary
              </h2>
            </div>

            <div className="mt-6 space-y-4 border-b border-[#E8E4D9] pb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B746F]">
                  Subtotal
                </span>

                <span className="font-bold text-[#17201D]">
                  PKR {cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B746F]">
                  Delivery
                </span>

                <span className="font-bold text-[#0F3D35]">
                  Free
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-6">
              <span className="text-base font-bold text-[#17201D]">
                Total
              </span>

              <span className="text-2xl font-black text-[#0F3D35]">
                PKR {cartTotal.toLocaleString()}
              </span>
            </div>

            <Link
              to="/store/checkout"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F3D35] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#174F45]"
            >
              Proceed to Checkout
              <ShoppingBag size={17} />
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-[#8A918D]">
              Secure checkout • Easy shopping • SHOPHIVE
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;