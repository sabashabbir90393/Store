import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-[#E8E4D9] bg-[#0F3D35] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/store" className="inline-block">
              <h2 className="text-2xl font-black tracking-tight">
                SHOPHIVE
              </h2>

              <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-[#E7D28A]">
                CLICK • BUY • ENJOY
              </p>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
              Discover products you'll love, shop with confidence,
              and enjoy a simple shopping experience built for you.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#0F3D35]"
              >
                <Facebook size={17} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#0F3D35]"
              >
                <Instagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#0F3D35]"
              >
                <Twitter size={17} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#E7D28A]">
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/store"
                className="block text-sm text-white/70 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/store/shop"
                className="block text-sm text-white/70 transition hover:text-white"
              >
                Shop
              </Link>

              <Link
                to="/store/categories"
                className="block text-sm text-white/70 transition hover:text-white"
              >
                Categories
              </Link>

              <Link
                to="/store/favorites"
                className="block text-sm text-white/70 transition hover:text-white"
              >
                Favorites
              </Link>

              <Link
                to="/store/orders"
                className="block text-sm text-white/70 transition hover:text-white"
              >
                My Orders
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#E7D28A]">
              Contact
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[#C9A227]"
                />

                <p className="text-sm leading-5 text-white/70">
                  Lahore, Pakistan
                </p>
              </div>

              <div className="flex gap-3">
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-[#C9A227]"
                />

                <p className="text-sm leading-5 text-white/70">
                  support@shophive.com
                </p>
              </div>

              <div className="flex gap-3">
                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-[#C9A227]"
                />

                <p className="text-sm leading-5 text-white/70">
                  +92 300 0000000
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} SHOPHIVE. All rights reserved.
            </p>

            <p>
              Click • Buy • Enjoy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;