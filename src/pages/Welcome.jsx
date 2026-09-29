import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import {
  signupUser,
  loginUser,
  saveAuthSession,
} from "../services/authService";

const slides = [
  {
    image:
      "https://images.pexels.com/photos/8989866/pexels-photo-8989866.jpeg?auto=compress&cs=tinysrgb&w=2400",
    category: "FASHION",
    title: "Style That Feels Like You",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=2400&q=90",
    category: "HANDBAGS",
    title: "Carry Something Beautiful",
  },
  {
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=2400&q=90",
    category: "FOOTWEAR",
    title: "Every Step, Your Style",
  },
  {
  image:
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=2400&q=90",
  category: "WATCHES",
  title: "Time For Something Timeless",
},
  {
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=2400&q=90",
    category: "BEAUTY",
    title: "Beauty In Every Detail",
  },
  {
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=2400&q=90",
    category: "ACCESSORIES",
    title: "Complete Your Look",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=90",
    category: "HOME",
    title: "Make Your Space Beautiful",
  },
  {
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2400&q=90",
    category: "LIFESTYLE",
    title: "Discover Things You Love",
  },
];

function Welcome() {
  const [current, setCurrent] = useState(0);
  const [authMode, setAuthMode] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(
        (previous) => (previous + 1) % slides.length
      );
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent(
      (previous) => (previous + 1) % slides.length
    );
  };

  const previousSlide = () => {
    setCurrent(
      (previous) =>
        (previous - 1 + slides.length) % slides.length
    );
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const closeAuth = () => {
    if (loading) return;

    setAuthMode(null);
    setError("");
    setSuccess("");
  };

  const switchAuth = (mode) => {
    setAuthMode(mode);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!username.trim() || !password) {
      setError(
        "Please enter your username and password."
      );
      return;
    }

    if (authMode === "signup") {
      if (!confirmPassword) {
        setError("Please confirm your password.");
        return;
      }

      if (password.length < 8) {
        setError(
          "Password must be at least 8 characters."
        );
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    try {
      setLoading(true);

      if (authMode === "signup") {
        const signupData = await signupUser(
          username.trim(),
          password
        );

        setSuccess(signupData.message);

        const loginData = await loginUser(
          username.trim(),
          password
        );

        saveAuthSession(
          loginData.token,
          loginData.user
        );

        setTimeout(() => {
          window.location.href = "/store";
        }, 800);
      } else {
        const loginData = await loginUser(
          username.trim(),
          password
        );

        saveAuthSession(
          loginData.token,
          loginData.user
        );

        setSuccess(
          "Login successful! Welcome to SHOPHIVE."
        );

        setTimeout(() => {
          window.location.href = "/store";
        }, 700);
      }
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const slide = slides[current];

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#FCFBF7]">

      {/* =========================
          BACKGROUND
      ========================= */}
      <section className="absolute inset-0 h-full w-full overflow-hidden">

        <img
          key={slide.image}
          src={slide.image}
          alt={slide.category}
          className="absolute inset-0 h-full w-full object-cover animate-fade-in"
          style={{
            objectPosition:
              slide.category === "WATCHES"
                ? "center 42%"
                : "center center",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D35]/95 via-[#0F3D35]/65 to-[#0F3D35]/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

      </section>

      {/* =========================
          HEADER
      ========================= */}
      <header className="absolute left-0 right-0 top-0 z-30">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">

          {/* SHOPHIVE LOGO */}
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl font-black text-[#0F3D35] shadow-lg">
              S
            </div>

            <div>
              <h1 className="text-xl font-black tracking-[0.16em] text-white sm:text-2xl">
                SHOPHIVE
              </h1>

              <p className="text-[8px] font-bold uppercase tracking-[0.23em] text-white/75 sm:text-[9px]">
                Click • Buy • Enjoy
              </p>
            </div>

          </div>

          {/* PREMIUM BADGE */}
          <div className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:flex">

            <Sparkles
              size={14}
              className="text-[#C9A227]"
              fill="currentColor"
            />

            Premium Shopping Experience

          </div>

        </div>

      </header>

      {/* =========================
          HERO CONTENT
      ========================= */}
      <div className="relative z-10 flex h-full items-center">

        <div className="mx-auto w-full max-w-7xl px-5 pb-10 pt-24 sm:px-8 lg:px-10">

          <div className="max-w-2xl">

            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-12 bg-[#C9A227]" />

              <span className="text-xs font-bold tracking-[0.28em] text-[#F2D87A] sm:text-sm">
                {slide.category}
              </span>

            </div>

            <h2
              key={slide.title}
              className="max-w-2xl text-5xl font-black leading-[1.02] tracking-tight text-white animate-slide-up sm:text-6xl lg:text-7xl"
            >
              {slide.title}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              Discover fashion, beauty, accessories, lifestyle
              essentials and more — thoughtfully brought together
              in one beautiful place.
            </p>

            {/* BUTTONS */}
            <div className="mt-9 flex flex-wrap gap-3">

              <button
                onClick={() => openAuth("login")}
                className="flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0F3D35] shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#F5F3EC]"
              >
                <UserRound size={17} />
                Login
              </button>

              <button
                onClick={() => openAuth("signup")}
                className="flex items-center gap-2 rounded-full bg-[#C9A227] px-7 py-3.5 text-sm font-bold text-[#17201D] shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#E0BC3C]"
              >
                Create Account
                <ArrowRight size={17} />
              </button>

            </div>

            {/* SLIDE INDICATORS */}
            <div className="mt-12 flex items-center gap-5">

              <div className="flex items-center gap-2">

                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      current === index
                        ? "w-9 bg-[#C9A227]"
                        : "w-1.5 bg-white/50 hover:bg-white"
                    }`}
                  />
                ))}

              </div>

              <span className="text-xs font-semibold tracking-wider text-white/65">
                {String(current + 1).padStart(2, "0")} / 08
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          PREVIOUS BUTTON
      ========================= */}
      <button
        onClick={previousSlide}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#0F3D35] sm:left-7"
      >
        <ChevronLeft size={21} />
      </button>

      {/* =========================
          NEXT BUTTON
      ========================= */}
      <button
        onClick={nextSlide}
        aria-label="Next image"
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#0F3D35] sm:right-7"
      >
        <ChevronRight size={21} />
      </button>

      {/* AUTH MODAL START */}
      {authMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0F3D35]/75 px-4 py-5 backdrop-blur-md">

          <div className="relative w-full max-w-sm animate-scale-in">

            <div className="rounded-2xl border border-white/50 bg-white p-5 shadow-[0_25px_80px_rgba(0,0,0,0.3)] sm:p-6">

              {/* CLOSE */}
              <button
                onClick={closeAuth}
                disabled={loading}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F3EC] text-[#6B746F] transition hover:bg-[#E9E5D9] hover:text-[#0F3D35]"
                aria-label="Close"
              >
                <X size={17} />
              </button>

              {/* HEADING */}
              <div className="mb-5 pr-8">

                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F3D35] text-base font-black text-white shadow-md">
                  S
                </div>

                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                  {authMode === "login"
                    ? "Welcome Back"
                    : "Join SHOPHIVE"}
                </p>

                <h3 className="text-2xl font-black leading-tight text-[#17201D]">
                  {authMode === "login"
                    ? "Login to SHOPHIVE"
                    : "Create Your Account"}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-[#6B746F]">
                  {authMode === "login"
                    ? "Enter your account details to continue shopping."
                    : "Create your account and enter the SHOPHIVE store."}
                </p>

              </div>

              {/* ERROR */}
              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* SUCCESS */}
              {success && (
                <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-xs font-medium text-green-700">
                  {success}
                </div>
              )}

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="space-y-3"
              >

                {/* USERNAME */}
                <div>

                  <label className="mb-1.5 block text-xs font-semibold text-[#17201D]">
                    Username
                  </label>

                  <div className="relative">

                    <UserRound
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B746F]"
                    />

                    <input
                      type="text"
                      value={username}
                      onChange={(event) =>
                        setUsername(event.target.value)
                      }
                      placeholder="Enter your username"
                      autoComplete="username"
                      className="h-11 w-full rounded-lg border border-[#E3E0D7] bg-[#FCFBF7] pl-10 pr-3 text-xs text-[#17201D] outline-none transition focus:border-[#0F3D35] focus:bg-white focus:ring-4 focus:ring-[#0F3D35]/10"
                    />

                  </div>

                </div>

                {/* PASSWORD */}
                <div>

                  <label className="mb-1.5 block text-xs font-semibold text-[#17201D]">
                    Password
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B746F]"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder={
                        authMode === "signup"
                          ? "Minimum 8 characters"
                          : "Enter your password"
                      }
                      autoComplete={
                        authMode === "signup"
                          ? "new-password"
                          : "current-password"
                      }
                      className="h-11 w-full rounded-lg border border-[#E3E0D7] bg-[#FCFBF7] pl-10 pr-11 text-xs text-[#17201D] outline-none transition focus:border-[#0F3D35] focus:bg-white focus:ring-4 focus:ring-[#0F3D35]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B746F] transition hover:text-[#0F3D35]"
                      aria-label="Show or hide password"
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>

                  </div>

                </div>{/* CONFIRM PASSWORD */}
                {authMode === "signup" && (
                  <div>

                    <label className="mb-1.5 block text-xs font-semibold text-[#17201D]">
                      Confirm Password
                    </label>

                    <div className="relative">

                      <LockKeyhole
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B746F]"
                      />

                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(
                            event.target.value
                          )
                        }
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        className="h-11 w-full rounded-lg border border-[#E3E0D7] bg-[#FCFBF7] pl-10 pr-11 text-xs text-[#17201D] outline-none transition focus:border-[#0F3D35] focus:bg-white focus:ring-4 focus:ring-[#0F3D35]/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B746F] transition hover:text-[#0F3D35]"
                        aria-label="Show or hide confirm password"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>

                    </div>

                  </div>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0F3D35] text-xs font-bold text-white shadow-md shadow-[#0F3D35]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#174F45] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    authMode === "signup"
                      ? "Creating Account..."
                      : "Logging in..."
                  ) : (
                    <>
                      {authMode === "signup"
                        ? "Create Account"
                        : "Login"}

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

              </form>

              {/* SWITCH AUTH MODE */}
              <div className="mt-4 border-t border-[#EEEAE1] pt-4 text-center text-xs text-[#6B746F]">

                {authMode === "login" ? (
                  <>
                    Don't have an account?{" "}

                    <button
                      type="button"
                      onClick={() =>
                        switchAuth("signup")
                      }
                      className="font-bold text-[#0F3D35] transition hover:text-[#C9A227]"
                    >
                      Create Account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}

                    <button
                      type="button"
                      onClick={() =>
                        switchAuth("login")
                      }
                      className="font-bold text-[#0F3D35] transition hover:text-[#C9A227]"
                    >
                      Login
                    </button>
                  </>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

export default Welcome;