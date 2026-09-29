import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2400&q=95",
    position: "center center",
    label: "FASHION",
    title: "Your Style, Your Story.",
    description:
      "Discover fashion pieces designed to make every look feel effortlessly yours.",
    button: "Shop Fashion",
  },
  {
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=2400&q=95",
    position: "center 35%",
    label: "BEAUTY",
    title: "Glow Your Own Way.",
    description:
      "Explore makeup and beauty essentials for everyday looks and special moments.",
    button: "Explore Beauty",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2400&q=95",
    position: "center center",
    label: "JEWELRY",
    title: "Little Details, Big Impact.",
    description:
      "Find elegant jewelry pieces that add the perfect finishing touch.",
    button: "Shop Jewelry",
  },
  {
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=2400&q=95",
    position: "center center",
    label: "TECH",
    title: "Upgrade Your Everyday.",
    description:
      "Discover smart gadgets and modern tech made for your lifestyle.",
    button: "Explore Tech",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2400&q=95",
    position: "center center",
    label: "NEW COLLECTION",
    title: "Something New Is Waiting.",
    description:
      "Fresh styles, beautiful essentials, and new favorites are here.",
    button: "Shop New Arrivals",
  },
];

function Hero() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const nextSlide = () => {
    setIsChanging(true);

    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setIsChanging(false);
    }, 250);
  };

  const prevSlide = () => {
    setIsChanging(true);

    setTimeout(() => {
      setCurrent(
        (prev) => (prev - 1 + slides.length) % slides.length
      );
      setIsChanging(false);
    }, 250);
  };

  const goToSlide = (index) => {
    if (index === current) return;

    setIsChanging(true);

    setTimeout(() => {
      setCurrent(index);
      setIsChanging(false);
    }, 250);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-[620px] w-full overflow-hidden bg-[#0F3D35] sm:h-[680px] lg:h-[720px]">

      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isChanging
            ? "scale-105 opacity-80"
            : "scale-100 opacity-100"
        }`}
      >
        <img
          src={slide.image}
          alt={slide.label}
         /*  className="h-full w-full object-cover" */
         className={`h-full w-full object-cover ${
  current === 0 || current === 4
    ? "scale-105 -translate-y-12"
    : ""
}`}
style={{
  objectPosition: slide.position || "center center",
}}
         /*  style={{
            objectPosition: slide.position || "center center",
          }} */
        />
      </div>

      {/* SHOPHIVE Emerald Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D35]/95 via-[#0F3D35]/65 to-[#0F3D35]/10" />

      {/* Bottom Shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

      {/* Subtle Gold Glow */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#C9A227]/10 blur-3xl" />

      {/* Main Content */}
     {/*  <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8"> */}
     <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
        <div
          className={`max-w-xl pt-2 transition-all duration-700 ${
            isChanging
              ? "translate-y-3 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >

          {/* Label */}
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A227] text-[#17201D] shadow-lg">
              <Sparkles
                size={16}
                fill="currentColor"
              />
            </span>

            <span className="text-xs font-extrabold tracking-[0.22em] text-[#E7D28A] sm:text-sm">
              {slide.label}
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-xl text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
            {slide.description}
          </p>

          {/* Button */}
          <button
            type="button"
            onClick={() => navigate("/store/shop")}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#C9A227] px-7 py-3.5 text-sm font-black text-[#17201D] shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#E7D28A] hover:shadow-2xl"
          >
            {slide.button}
            <ArrowRight size={18} />
          </button>

          {/* Brand */}
          <div className="mt-8">
            <p className="text-xs font-black tracking-[0.3em] text-white/50">
              SHOPHIVE
            </p>

            <p className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-[#E7D28A]/70">
              CLICK • BUY • ENJOY
            </p>
          </div>

        </div>
      </div>

      {/* Previous Button */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0F3D35]/40 text-white backdrop-blur-md transition duration-300 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#17201D] sm:left-7"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0F3D35]/40 text-white backdrop-blur-md transition duration-300 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#17201D] sm:right-7"
      >
        <ArrowRight size={20} />
      </button>

      {/* Bottom Dots */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              current === index
                ? "w-9 bg-[#C9A227]"
                : "w-2.5 bg-white/55 hover:bg-[#E7D28A]"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-7 right-6 z-20 hidden rounded-full border border-white/20 bg-[#0F3D35]/35 px-4 py-2 text-xs font-bold text-white backdrop-blur-md sm:block">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>

    </section>
  );
}

export default Hero;