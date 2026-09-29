import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import {
  signupUser,
  loginUser,
  saveAuthSession,
} from "../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Empty fields
    if (!username.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // Password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Create account
      const signupData = await signupUser(
        username.trim(),
        password
      );

      setSuccess(signupData.message);

      // Automatically login after signup
      const loginData = await loginUser(
        username.trim(),
        password
      );

      // Save JWT + user in sessionStorage
      saveAuthSession(
        loginData.token,
        loginData.user
      );

      // Clear form
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      // Go to HEAVEN store
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        "Unable to create account. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#fffaf9]">
      <div className="mx-auto flex min-h-[calc(100vh-76px)] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_25px_80px_rgba(91,20,32,0.12)] lg:grid-cols-2">

          {/* =========================
              LEFT SIDE
          ========================= */}
          <div className="relative hidden min-h-[650px] overflow-hidden bg-[#651f2b] lg:block">

            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=90"
              alt="HEAVEN store"
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[#651f2b]/95 via-[#7d2637]/80 to-[#3d101b]/90" />

            <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white xl:p-14">

              <div>

                {/* Logo */}
                <div className="mb-8 flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-black text-[#651f2b]">
                    H
                  </div>

                  <div>
                    <p className="text-xl font-black tracking-[0.18em]">
                      HEAVEN
                    </p>

                    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/60">
                      Shop • Discover • Love
                    </p>
                  </div>

                </div>

                {/* Small Heading */}
                <div className="mb-4 flex items-center gap-2 text-[#ffd9df]">

                  <Sparkles
                    size={17}
                    fill="currentColor"
                  />

                  <span className="text-xs font-bold uppercase tracking-[0.2em]">
                    Welcome to HEAVEN
                  </span>

                </div>

                {/* Main Heading */}
                <h2 className="max-w-md text-4xl font-black leading-tight xl:text-5xl">
                  Your shopping journey starts here.
                </h2>

                <p className="mt-6 max-w-md text-base leading-7 text-white/75">
                  Create your HEAVEN account and discover
                  fashion, beauty, jewelry, gadgets and more.
                </p>

              </div>

              {/* Bottom Card */}
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">

                <p className="text-sm font-semibold">
                  One account. Everything you love.
                </p>

                <p className="mt-1 text-xs text-white/60">
                  Your account keeps your shopping experience
                  simple and connected.
                </p>

              </div>

            </div>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}
          <div className="flex min-h-[650px] items-center justify-center px-6 py-10 sm:px-10 lg:px-12">

            <div className="w-full max-w-md">

              {/* Mobile Logo */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#651f2b] text-lg font-black text-white">
                  H
                </div>

                <div>
                  <p className="font-black tracking-[0.18em] text-[#651f2b]">
                    HEAVEN
                  </p>

                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Shop • Discover • Love
                  </p>
                </div>

              </div>

              {/* Heading */}
              <div className="mb-8">

                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#8d3042]">
                  Create Account
                </p>

                <h1 className="text-3xl font-black text-gray-950 sm:text-4xl">
                  Join HEAVEN
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Create your account to start shopping.
                </p>

              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                  {success}
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Username */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Username
                  </label>

                  <div className="relative">

                    <UserRound
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value)
                      }
                      placeholder="Enter your username"
                      autoComplete="username"
                      className="h-13 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#8d3042] focus:bg-white focus:ring-4 focus:ring-[#8d3042]/10"
                    />

                  </div>

                </div>

                {/* Password */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Password
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Minimum 8 characters"
                      autoComplete="new-password"
                      className="h-13 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-sm text-gray-900 outline-none transition focus:border-[#8d3042] focus:bg-white focus:ring-4 focus:ring-[#8d3042]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#8d3042]"
                      aria-label="Show or hide password"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Confirm Password */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      className="h-13 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-sm text-gray-900 outline-none transition focus:border-[#8d3042] focus:bg-white focus:ring-4 focus:ring-[#8d3042]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#8d3042]"
                      aria-label="Show or hide confirm password"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#651f2b] text-sm font-bold text-white shadow-lg shadow-[#651f2b]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#7d2637] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    "Creating account..."
                  ) : (
                    <>
                      Create Account

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

              </form>

              {/* Login Link */}
              <p className="mt-7 text-center text-sm text-gray-500">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-bold text-[#8d3042] transition hover:text-[#651f2b]"
                >
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

export default Signup;