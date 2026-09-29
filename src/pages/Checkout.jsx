import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/useCart";
import { createOrder } from "../services/orderService";

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      setError("Please complete all shipping information.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setPlacingOrder(true);
      setError("");

      const orderItems = cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        price: Number(item.price || 0),
        quantity: item.quantity,
        imageURL: item.imageURL,
      }));

      await createOrder({
        items: orderItems,
        shippingInfo: formData,
        paymentMethod,
        totalAmount: cartTotal,
      });

      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error("Order Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to place order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (orderPlaced) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#FCFBF7] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[65vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-[#E8E4D9] bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0F3D35]/10 text-[#0F3D35]">
              <CheckCircle2 size={42} />
            </div>

            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
              SHOPHIVE
            </p>

            <h1 className="mt-2 text-3xl font-black text-[#17201D] sm:text-4xl">
              Order Placed Successfully
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#6B746F]">
              Thank you for shopping with SHOPHIVE. Your order has been
              successfully placed and will be processed shortly.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/store/orders"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F3D35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#174F45]"
              >
                <PackageCheck size={18} />
                View Orders
              </Link>

              <Link
                to="/store/shop"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D8D4C9] px-6 py-3 text-sm font-bold text-[#0F3D35] transition hover:bg-[#F1EFE7]"
              >
                <ShoppingBag size={18} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#FCFBF7] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[65vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-[#E8E4D9] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0F3D35]/10 text-[#0F3D35]">
              <ShoppingBag size={34} />
            </div>

            <h1 className="mt-6 text-3xl font-black text-[#17201D]">
              Your Cart Is Empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6B746F]">
              Add some products to your cart before proceeding to checkout.
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
        <div className="mb-10">
          <Link
            to="/store/cart"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#6B746F] transition hover:text-[#0F3D35]"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </Link>

          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
            SHOPHIVE
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#17201D] sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-[#6B746F]">
            Complete your details to place your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <form
            onSubmit={handlePlaceOrder}
            className="space-y-6"
          >
            <section className="rounded-2xl border border-[#E8E4D9] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F3D35]/10 text-[#0F3D35]">
                  <MapPin size={20} />
                </div>

                <div>
                  <h2 className="font-black text-[#17201D]">
                    Shipping Information
                  </h2>
                  <p className="mt-0.5 text-xs text-[#6B746F]">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-bold text-[#17201D]"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-[#DCD8CE] bg-[#FCFBF7] px-4 py-3 text-sm text-[#17201D] outline-none transition focus:border-[#0F3D35] focus:ring-2 focus:ring-[#0F3D35]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold text-[#17201D]"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03XX XXXXXXX"
                    required
                    className="w-full rounded-xl border border-[#DCD8CE] bg-[#FCFBF7] px-4 py-3 text-sm text-[#17201D] outline-none transition focus:border-[#0F3D35] focus:ring-2 focus:ring-[#0F3D35]/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-bold text-[#17201D]"
                  >
                    Delivery Address
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House number, street, area..."
                    rows="4"
                    required
                    className="w-full resize-none rounded-xl border border-[#DCD8CE] bg-[#FCFBF7] px-4 py-3 text-sm text-[#17201D] outline-none transition focus:border-[#0F3D35] focus:ring-2 focus:ring-[#0F3D35]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-bold text-[#17201D]"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Lahore"
                    required
                    className="w-full rounded-xl border border-[#DCD8CE] bg-[#FCFBF7] px-4 py-3 text-sm text-[#17201D] outline-none transition focus:border-[#0F3D35] focus:ring-2 focus:ring-[#0F3D35]/10"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#E8E4D9] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#C9A227]">
                  <Truck size={20} />
                </div>

                <div>
                  <h2 className="font-black text-[#17201D]">
                    Delivery Method
                  </h2>
                  <p className="mt-0.5 text-xs text-[#6B746F]">
                    Standard delivery
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-[#0F3D35] bg-[#0F3D35]/5 p-4">
                <div className="flex items-center gap-3">
                  <Truck size={19} className="text-[#0F3D35]" />

                  <div>
                    <p className="text-sm font-bold text-[#17201D]">
                      Standard Delivery
                    </p>
                    <p className="mt-1 text-xs text-[#6B746F]">
                      Delivery within 3–5 business days
                    </p>
                  </div>
                </div>

                <span className="text-sm font-black text-[#0F3D35]">
                  FREE
                </span>
              </div>
            </section>

            <section className="rounded-2xl border border-[#E8E4D9] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F3D35]/10 text-[#0F3D35]">
                  <CreditCard size={20} />
                </div>

                <div>
                  <h2 className="font-black text-[#17201D]">
                    Payment Method
                  </h2>
                  <p className="mt-0.5 text-xs text-[#6B746F]">
                    Choose how you want to pay.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                    paymentMethod === "cod"
                      ? "border-[#0F3D35] bg-[#0F3D35]/5"
                      : "border-[#E0DDD4] hover:border-[#0F3D35]/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                    className="h-4 w-4 accent-[#0F3D35]"
                  />

                  <div>
                    <p className="text-sm font-bold text-[#17201D]">
                      Cash on Delivery
                    </p>
                    <p className="mt-1 text-xs text-[#6B746F]">
                      Pay when your order arrives.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                    paymentMethod === "card"
                      ? "border-[#0F3D35] bg-[#0F3D35]/5"
                      : "border-[#E0DDD4] hover:border-[#0F3D35]/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                    className="h-4 w-4 accent-[#0F3D35]"
                  />

                  <div>
                    <p className="text-sm font-bold text-[#17201D]">
                      Debit / Credit Card
                    </p>
                    <p className="mt-1 text-xs text-[#6B746F]">
                      Card payment interface will be available here.
                    </p>
                  </div>
                </label>
              </div>
            </section>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={placingOrder}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F3D35] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:bg-[#174F45] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {placingOrder ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Placing Order...
                </>
              ) : (
                <>
                  <CheckCircle2 size={19} />
                  Place Order
                </>
              )}
            </button>
          </form>

          <aside className="h-fit rounded-2xl border border-[#E8E4D9] bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#C9A227]" />

              <h2 className="text-lg font-black text-[#17201D]">
                Order Summary
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F1EFE7]">
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-bold text-[#17201D]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-[#6B746F]">
                      Qty: {item.quantity}
                    </p>

                    <p className="mt-1 text-sm font-black text-[#0F3D35]">
                      PKR{" "}
                      {(
                        Number(item.price || 0) * item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-[#E8E4D9] pt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B746F]">Subtotal</span>

                <span className="font-bold text-[#17201D]">
                  PKR {cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B746F]">Delivery</span>

                <span className="font-bold text-[#0F3D35]">
                  Free
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#E8E4D9] pt-5">
              <span className="font-bold text-[#17201D]">
                Total
              </span>

              <span className="text-2xl font-black text-[#0F3D35]">
                PKR {cartTotal.toLocaleString()}
              </span>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#FCFBF7] p-4">
              <PackageCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#C9A227]"
              />

              <p className="text-xs leading-5 text-[#6B746F]">
                Your order information is protected and will only be
                used for order processing and delivery.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;