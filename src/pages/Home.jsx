import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import { getProducts } from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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

    if (!query) {
      return products.slice(0, 8);
    }

    return products
      .filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const description = product.desc?.toLowerCase() || "";

        return (
          name.includes(query) ||
          description.includes(query)
        );
      })
      .slice(0, 8);
  }, [products, search]);

  return (
    <main className="bg-[#FCFBF7]">
      <Hero />

      {/* Search Section */}
      <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-[#E8E4D9] bg-white p-3 shadow-[0_15px_45px_rgba(15,61,53,0.12)]">
            <div className="flex items-center gap-3 rounded-xl border border-[#E7E3D9] bg-[#FCFBF7] px-4 py-3.5 focus-within:border-[#0F3D35] focus-within:ring-2 focus-within:ring-[#0F3D35]/10">
              <Search
                size={21}
                className="shrink-0 text-[#0F3D35]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products, fashion, beauty, tech..."
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#17201D] outline-none placeholder:text-[#929A95] sm:text-base"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="rounded-lg px-2 py-1 text-xs font-bold text-[#6B746F] transition hover:bg-[#EAE7DE] hover:text-[#0F3D35]"
                >
                  Clear
                </button>
              )}

              <button
                type="button"
                className="hidden items-center gap-2 rounded-lg bg-[#0F3D35] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#174F45] sm:flex"
              >
                <SlidersHorizontal size={16} />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A227]/15 text-[#C9A227]">
                <Sparkles size={15} fill="currentColor" />
              </span>

              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#0F3D35]">
                SHOPHIVE COLLECTION
              </p>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-[#17201D] sm:text-4xl">
              Featured Products
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#6B746F] sm:text-base">
              Discover carefully selected products for your everyday style,
              comfort, and lifestyle.
            </p>
          </div>

          {search && !loading && !error && (
            <p className="text-sm font-semibold text-[#6B746F]">
              Showing results for{" "}
              <span className="text-[#0F3D35]">
                "{search}"
              </span>
            </p>
          )}
        </div>

        {loading && (
          <div className="flex min-h-48 items-center justify-center">
            <div className="flex items-center gap-3 text-sm font-semibold text-[#6B746F]">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#D9D5C9] border-t-[#0F3D35]" />
              Loading products...
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center">
            <h3 className="font-bold text-red-700">
              Something went wrong
            </h3>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#D8D4C9] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F1EFE7] text-[#0F3D35]">
              <Search size={24} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#17201D]">
              No products found
            </h3>

            <p className="mt-2 text-sm text-[#6B746F]">
              Try searching with a different product name or keyword.
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-5 rounded-xl bg-[#0F3D35] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#174F45]"
            >
              View All Products
            </button>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <ProductGrid products={filteredProducts} />
        )}

        {!loading && !error && !search && products.length > 8 && (
          <div className="mt-10 text-center">
            <Link
  to="/store/shop"
  className="inline-flex rounded-full border border-[#0F3D35] px-7 py-3 text-sm font-bold text-[#0F3D35] transition hover:bg-[#0F3D35] hover:text-white"
>
  Explore All Products
</Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;