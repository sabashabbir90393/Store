import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpDown,
  Grid3X3,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader";
import { getProducts } from "../services/productService";

function Shop() {
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recommended");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesCategory =
        !selectedCategory ||
        product.category?.toLowerCase() ===
          selectedCategory.toLowerCase();

      const name = product.name?.toLowerCase() || "";
      const description = product.desc?.toLowerCase() || "";

      const matchesSearch =
        !query ||
        name.includes(query) ||
        description.includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sort === "price-low") {
      result = [...result].sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sort === "price-high") {
      result = [...result].sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sort === "name") {
      result = [...result].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    return result;
  }, [
    products,
    search,
    sort,
    selectedCategory,
  ]);

  

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FCFBF7]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F3D35]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C9A227]/10" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">

            <div className="flex items-center gap-2 text-[#E7D28A]">
              <Grid3X3 size={18} />

              <span className="text-xs font-extrabold uppercase tracking-[0.2em]">
                SHOPHIVE COLLECTION
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              {selectedCategory
                ? selectedCategory
                : "Explore Our Shop"}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              {selectedCategory
                ? `Discover products from our ${selectedCategory.toLowerCase()} collection.`
                : "Discover products selected for your everyday style, lifestyle, and needs."}
            </p>

          </div>
        </div>
      </section>

      {/* Search + Sort */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-7 rounded-2xl border border-[#E8E4D9] bg-white p-3 shadow-[0_18px_50px_rgba(15,61,53,0.12)]">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* Search */}
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[#E7E3D9] bg-[#FCFBF7] px-4 py-3.5 transition focus-within:border-[#0F3D35] focus-within:ring-2 focus-within:ring-[#0F3D35]/10">

              <Search
                size={20}
                className="shrink-0 text-[#0F3D35]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search products..."
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#17201D] outline-none placeholder:text-[#929A95] sm:text-base"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B746F] transition hover:bg-[#EAE7DE] hover:text-[#0F3D35]"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}

            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 rounded-xl border border-[#E7E3D9] bg-[#FCFBF7] px-4">

              <ArrowUpDown
                size={18}
                className="shrink-0 text-[#0F3D35]"
              />

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="w-full cursor-pointer bg-transparent py-3.5 text-sm font-bold text-[#17201D] outline-none lg:w-52"
              >
                <option value="recommended">
                  Recommended
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="name">
                  Name: A to Z
                </option>
              </select>

            </div>

          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <div className="flex items-center gap-2 text-[#C9A227]">
              <SlidersHorizontal size={17} />

              <span className="text-xs font-extrabold uppercase tracking-[0.18em]">
                {selectedCategory
                  ? "CATEGORY PRODUCTS"
                  : "SHOP NOW"}
              </span>
            </div>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#17201D]">
              {selectedCategory
                ? selectedCategory
                : "All Products"}
            </h2>

            {!loading && !error && (
              <p className="mt-2 text-sm text-[#6B746F]">
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "product"
                  : "products"}
              </p>
            )}

          </div>

          {selectedCategory && (
            <Link
              to="/store/shop"
              className="inline-flex items-center gap-2 text-sm font-black text-[#0F3D35] transition hover:text-[#C9A227]"
            >
              <ArrowLeft size={17} />
              View All Products
            </Link>
          )}

        </div>

        {loading && (
          <Loader text="Loading products..." />
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
            <h3 className="text-lg font-black text-red-700">
              Something went wrong
            </h3>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <ProductGrid products={filteredProducts} />
        )}

      </section>

    </main>
  );
}

export default Shop;