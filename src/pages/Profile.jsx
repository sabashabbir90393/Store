import {
  Heart,
  LogOut,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { getAvatarUrl } from "../services/avatarService";
import { getCurrentUser, logoutUser } from "../services/authService";
import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";

function Profile() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const username = user?.username || "SHOPHIVE User";
  const avatarUrl = getAvatarUrl(username);

  const handleLogout = () => {
    logoutUser();
    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FCFBF7]">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#0F3D35]">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#C9A227]/10" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E7D28A]">
            SHOPHIVE ACCOUNT
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
            Manage your account and quickly access your SHOPHIVE activity.
          </p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">

          {/* User Card */}
          <div className="rounded-3xl border border-[#E8E4D9] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-[#E7D28A] bg-[#E7EFEE] p-1 shadow-lg">
                <img
                  src={avatarUrl}
                  alt={`${username} profile`}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <h2 className="mt-5 text-2xl font-black text-[#17201D]">
                {username}
              </h2>

              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#F1EFE7] px-3 py-1.5">
                <User size={14} className="text-[#0F3D35]" />
                <span className="text-xs font-bold text-[#6B746F]">
                  SHOPHIVE Customer
                </span>
              </div>
            </div>

            <div className="mt-8 border-t border-[#E8E4D9] pt-6">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-3xl border border-[#E8E4D9] bg-white p-6 shadow-sm sm:p-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
                Account Overview
              </p>

              <h2 className="mt-2 text-2xl font-black text-[#17201D]">
                Your SHOPHIVE Activity
              </h2>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">

              {/* Orders */}
              <Link
                to="/store/orders"
                className="group rounded-2xl border border-[#E8E4D9] bg-[#FCFBF7] p-5 transition hover:-translate-y-1 hover:border-[#C9A227]/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F3D35] text-white">
                    <Package size={20} />
                  </div>

                  <span className="text-2xl font-black text-[#0F3D35]">
                    —
                  </span>
                </div>

                <h3 className="mt-5 text-sm font-black text-[#17201D]">
                  My Orders
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B746F]">
                  View your order history and order details.
                </p>
              </Link>

              {/* Favorites */}
              <Link
                to="/store/favorites"
                className="group rounded-2xl border border-[#E8E4D9] bg-[#FCFBF7] p-5 transition hover:-translate-y-1 hover:border-[#C9A227]/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <Heart size={20} />
                  </div>

                  <span className="text-2xl font-black text-[#0F3D35]">
                    {wishlistCount}
                  </span>
                </div>

                <h3 className="mt-5 text-sm font-black text-[#17201D]">
                  Favorites
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B746F]">
                  Products you saved for later.
                </p>
              </Link>

              {/* Cart */}
              <Link
                to="/store/cart"
                className="group rounded-2xl border border-[#E8E4D9] bg-[#FCFBF7] p-5 transition hover:-translate-y-1 hover:border-[#C9A227]/40 hover:shadow-md sm:col-span-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5EFD8] text-[#0F3D35]">
                    <ShoppingBag size={20} />
                  </div>

                  <span className="text-2xl font-black text-[#0F3D35]">
                    {cartCount}
                  </span>
                </div>

                <h3 className="mt-5 text-sm font-black text-[#17201D]">
                  Shopping Cart
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B746F]">
                  Products currently waiting in your cart.
                </p>
              </Link>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;