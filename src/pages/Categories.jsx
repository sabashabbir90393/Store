import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import CategoryCard from "../components/CategoryCard";
import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader";

import { categories } from "../data/categories";
import { getProducts } from "../services/productService";

import { useEffect, useState } from "react";

function Categories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Categories products error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-[calc(100vh-80px)] overflow-hidden bg-[#FCFBF7]">

      {/* ================================
          TOP HERO
      ================================ */}
      <section className="relative overflow-hidden bg-[#0F3D35]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C9A227]/10" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">

            <div className="flex items-center gap-2 text-[#E7D28A]">
              <Sparkles size={18} />

              <span className="text-xs font-extrabold uppercase tracking-[0.2em]">
                SHOPHIVE COLLECTION
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Shop by Category
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Explore different collections and discover something
              perfect for your style, lifestyle, and everyday needs.
            </p>

          </div>
        </div>
      </section>

      {/* ================================
          FIND WHAT YOU LOVE
      ================================ */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">

        <div className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
            Explore Collections
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#17201D] sm:text-4xl">
            Find What You Love
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6B746F]">
            Choose a category to explore products made for you.
          </p>
        </div>

        {/* Animated Category Line */}
        <div className="relative mt-10 overflow-hidden py-4">

          <div className="category-slider flex w-max gap-8 px-4">

            {[...categories, ...categories].map((category, index) => (
              <CategoryCard
                key={`${category.id}-${index}`}
                category={category}
              />
            ))}

          </div>
        </div>

      </section>

      {/* ================================
          ALL PRODUCTS
      ================================ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A227]">
              SHOPHIVE
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#17201D] sm:text-4xl">
              All Products
            </h2>

            <p className="mt-2 text-sm text-[#6B746F]">
              Browse our complete collection.
            </p>
          </div>

          <Link
            to="/store/shop"
            className="inline-flex items-center gap-2 text-sm font-black text-[#0F3D35] transition hover:text-[#C9A227]"
          >
            View All
            <ArrowRight size={17} />
          </Link>

        </div>

        {loading ? (
          <Loader text="Loading products..." />
        ) : (
          <ProductGrid products={products} />
        )}

      </section>

    </main>
  );
}

export default Categories;