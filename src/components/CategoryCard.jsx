import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/store/shop?category=${encodeURIComponent(category.name)}`}
      className="group flex w-32 shrink-0 flex-col items-center text-center sm:w-36"
    >
      {/* Circle */}
      <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-[#F1EFE7] shadow-md ring-1 ring-[#E8E4D9] transition duration-300 group-hover:-translate-y-2 group-hover:ring-[#C9A227] sm:h-32 sm:w-32">

        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-[#0F3D35]/0 transition duration-300 group-hover:bg-[#0F3D35]/35">
          <span className="flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-[#C9A227] text-[#17201D] opacity-0 shadow-lg transition duration-300 group-hover:scale-100 group-hover:opacity-100">
            <ArrowRight size={17} />
          </span>
        </div>
      </div>

      {/* Name */}
      <h3 className="mt-4 text-sm font-black text-[#17201D] transition group-hover:text-[#0F3D35] sm:text-base">
        {category.name}
      </h3>

    </Link>
  );
}

export default CategoryCard;