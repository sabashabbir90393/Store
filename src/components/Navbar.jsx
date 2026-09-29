import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  ShoppingBag,
  UserRound,
  X,
  LogOut,
  Home,
  Store,
  Grid2X2,
} from "lucide-react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  getCurrentUser,
  logoutUser,
} from "../services/authService";

import { getAvatarUrl } from "../services/avatarService";

function Navbar() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
  const handleAuthChange = () => {
    setUser(getCurrentUser());
  };

  window.addEventListener(
    "heaven-auth-change",
    handleAuthChange
  );

  return () => {
    window.removeEventListener(
      "heaven-auth-change",
      handleAuthChange
    );
  };
}, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setMobileMenu(false);
    navigate("/");
  };

  const navLinkClass = ({ isActive }) => {
    return isActive
      ? "text-sm font-semibold text-[#0F3D35]"
      : "text-sm font-semibold text-[#6B746F] hover:text-[#0F3D35]";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#EAE7DE] bg-white">

      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}

        <Link
          to="/store"
          className="flex items-center gap-3"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F3D35] text-lg font-black text-white shadow-sm">
            S
          </div>

          <div className="hidden sm:block">

            <h1 className="text-xl font-black tracking-[0.16em] text-[#0F3D35]">
              SHOPHIVE
            </h1>

            <p className="text-[8px] font-bold uppercase tracking-[0.23em] text-[#8A928D]">
              Click • Buy • Enjoy
            </p>

          </div>

        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav className="hidden items-center gap-8 lg:flex">

          <NavLink
            to="/store"
            end
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/store/shop"
            className={navLinkClass}
          >
            Shop
          </NavLink>

          <NavLink
            to="/store/categories"
            className={navLinkClass}
          >
            Categories
          </NavLink>

        </nav>

        {/* DESKTOP RIGHT SIDE */}

        <div className="hidden items-center gap-3 lg:flex">

          <Link
            to="/store/favorites"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#53605A] transition hover:bg-[#F4F2EC] hover:text-[#0F3D35]"
            aria-label="Favorites"
          >
            <Heart size={19} />
          </Link>

          <Link
            to="/store/cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#53605A] transition hover:bg-[#F4F2EC] hover:text-[#0F3D35]"
            aria-label="Cart"
          >
            <ShoppingBag size={19} />
          </Link>

          <div className="h-8 w-px bg-[#EAE7DE]" />

          {/* PROFILE */}

          <Link
            to="/store/profile"
            className="flex items-center gap-2 rounded-full px-2 py-1.5 transition hover:bg-[#F4F2EC]"
          >

            <img
              src={getAvatarUrl(user?.username)}
              alt={`${user?.username || "User"} profile`}
              className="h-9 w-9 rounded-full border border-[#E5E1D8] bg-[#E7EFEA] object-cover"
            />

            <span className="max-w-[120px] truncate text-sm font-bold text-[#17201D]">
              {user?.username || "Account"}
            </span>

          </Link>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-[#DCD8CD] px-4 py-2 text-sm font-bold text-[#53605A] transition hover:bg-[#0F3D35] hover:text-white"
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>

        {/* MOBILE BUTTONS */}

        <div className="flex items-center gap-2 lg:hidden">

          <Link
            to="/store/favorites"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#53605A]"
            aria-label="Favorites"
          >
            <Heart size={19} />
          </Link>

          <Link
            to="/store/cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#53605A]"
            aria-label="Cart"
          >
            <ShoppingBag size={19} />
          </Link>

          <button
            type="button"
            onClick={() => {
              setMobileMenu((previous) => !previous);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F2EC] text-[#0F3D35]"
            aria-label="Menu"
          >

            {mobileMenu ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}

          </button>

        </div>

      </div>{/* MOBILE MENU */}

      {mobileMenu && (
        <div className="border-t border-[#EAE7DE] bg-white px-4 py-5 lg:hidden">

          <div className="mx-auto max-w-7xl">

            {/* USER INFO */}

            <div className="mb-5 flex items-center gap-3 rounded-2xl bg-[#F7F6F1] p-4">

              <img
                src={getAvatarUrl(user?.username)}
                alt={`${user?.username || "User"} profile`}
                className="h-11 w-11 rounded-full border border-[#E5E1D8] bg-[#E7EFEA] object-cover"
              />

              <div>

                <p className="text-xs text-[#8A928D]">
                  Signed in as
                </p>

                <p className="text-sm font-bold text-[#17201D]">
                  {user?.username || "Account"}
                </p>

              </div>

            </div>

            {/* MOBILE NAVIGATION */}

            <div className="space-y-1">

              <Link
                to="/store"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#53605A] transition hover:bg-[#F4F2EC] hover:text-[#0F3D35]"
              >
                <Home size={18} />
                Home
              </Link>

              <Link
                to="/store/shop"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#53605A] transition hover:bg-[#F4F2EC] hover:text-[#0F3D35]"
              >
                <Store size={18} />
                Shop
              </Link>

              <Link
                to="/store/categories"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#53605A] transition hover:bg-[#F4F2EC] hover:text-[#0F3D35]"
              >
                <Grid2X2 size={18} />
                Categories
              </Link>

              <Link
                to="/store/favorites"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#53605A] transition hover:bg-[#F4F2EC] hover:text-[#0F3D35]"
              >
                <Heart size={18} />
                Favorites
              </Link>

              <Link
                to="/store/cart"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#53605A] transition hover:bg-[#F4F2EC] hover:text-[#0F3D35]"
              >
                <ShoppingBag size={18} />
                Cart
              </Link>

              <Link
                to="/store/profile"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#53605A] transition hover:bg-[#F4F2EC] hover:text-[#0F3D35]"
              >
                <UserRound size={18} />
                Profile
              </Link>

            </div>

            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F3D35] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#174F45]"
            >
              <LogOut size={17} />
              Logout
            </button>

          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;