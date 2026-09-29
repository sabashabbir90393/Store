import { useEffect, useState } from "react";
import {
  CalendarDays,
  Package,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getMyOrders } from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error("Orders Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load your orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  let cancelled = false;

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyOrders();

      if (!cancelled) {
        setOrders(data);
      }
    } catch (error) {
      console.error("Orders Error:", error);

      if (!cancelled) {
        setError(
          error.response?.data?.message ||
            "Unable to load your orders. Please try again."
        );
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  loadOrders();

  return () => {
    cancelled = true;
  };
}, []);

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#FCFBF7] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0F3D35]/10">
              <RefreshCw
                size={25}
                className="animate-spin text-[#0F3D35]"
              />
            </div>

            <p className="mt-5 text-sm font-semibold text-[#6B746F]">
              Loading your orders...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#FCFBF7] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
            <p className="text-sm font-bold text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchOrders}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0F3D35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#174F45]"
            >
              <RefreshCw size={17} />
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#FCFBF7] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[65vh] max-w-4xl items-center justify-center">
          <div className="w-full rounded-3xl border border-[#E8E4D9] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0F3D35]/10 text-[#0F3D35]">
              <Package size={34} />
            </div>

            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
              SHOPHIVE
            </p>

            <h1 className="mt-2 text-3xl font-black text-[#17201D]">
              No Orders Yet
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6B746F]">
              You haven't placed any orders yet. Start shopping and
              your orders will appear here.
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
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
              SHOPHIVE
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-[#17201D] sm:text-4xl">
              My Orders
            </h1>

            <p className="mt-2 text-sm text-[#6B746F]">
              {orders.length}{" "}
              {orders.length === 1 ? "order" : "orders"} placed
            </p>
          </div>

          <button
            type="button"
            onClick={fetchOrders}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DDD9CE] bg-white text-[#0F3D35] shadow-sm transition hover:bg-[#F1EFE7]"
            aria-label="Refresh orders"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <article
              key={order._id}
              className="overflow-hidden rounded-2xl border border-[#E8E4D9] bg-white shadow-sm"
            >
              <div className="flex flex-col gap-4 border-b border-[#E8E4D9] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#8A918D]">
                    Order ID
                  </p>

                  <p className="mt-1 break-all text-sm font-bold text-[#17201D]">
                    #{order._id}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#C9A227]/10 px-3 py-1.5 text-xs font-extrabold text-[#8A6D08]">
                    {order.status}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#6B746F]">
                    <CalendarDays size={14} />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={`${order._id}-${item.productId}-${index}`}
                      className="flex gap-4"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F1EFE7]">
                        <img
                          src={item.imageURL}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="line-clamp-1 text-sm font-bold text-[#17201D]">
                          {item.name}
                        </h2>

                        <p className="mt-1 text-xs text-[#6B746F]">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-2 text-sm font-black text-[#0F3D35]">
                          PKR{" "}
                          {(
                            Number(item.price || 0) *
                            item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 border-t border-[#E8E4D9] pt-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8A918D]">
                      Delivery
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#17201D]">
                      {order.shippingInfo.fullName}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#6B746F]">
                      {order.shippingInfo.address},{" "}
                      {order.shippingInfo.city}
                    </p>

                    <p className="mt-1 text-xs text-[#6B746F]">
                      {order.shippingInfo.phone}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8A918D]">
                      Payment
                    </p>

                    <p className="mt-1 text-sm font-semibold capitalize text-[#17201D]">
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : "Debit / Credit Card"}
                    </p>

                    <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#8A918D]">
                      Total
                    </p>

                    <p className="mt-1 text-xl font-black text-[#0F3D35]">
                      PKR{" "}
                      {Number(
                        order.totalAmount || 0
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Orders;