import React, { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle, FaNewspaper } from "react-icons/fa";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../config/AuthContext";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { darkmode } = useDarkMode();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/Home");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => navigate("/Home"))
      .catch((error) => alert(error.message));
  };

  return (
    <div className={`${darkmode ? "" : "dark"}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-[#121212] transition-colors duration-300 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* News-themed background elements */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585829365295-ab7cd400c7e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-20 dark:opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 dark:to-[#121212]/90"></div>
        
        {/* Newspaper texture overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/newsprint.png')] opacity-5 dark:opacity-10"></div>
        
        {/* Floating newspaper headlines */}
        <div className="absolute top-10 left-5 rotate-6 opacity-30 dark:opacity-20">
          <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-lg w-32">
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">BREAKING NEWS</p>
          </div>
        </div>
        <div className="absolute bottom-10 right-5 -rotate-6 opacity-30 dark:opacity-20">
          <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-lg w-40">
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">LATEST UPDATES</p>
          </div>
        </div>

        <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center mb-4">
            <FaNewspaper className="w-12 h-12 text-blue-600 dark:text-cyan-400" />
          </div>
          <h2 className="text-center text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-3 sm:mb-4">
            News Portal Login
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            Access your news dashboard
          </p>
        </div>

        <div className="relative z-10 mt-6 sm:mt-8 mx-auto w-full max-w-md">
          <div className="bg-white/90 dark:bg-[#202124]/95 backdrop-blur-lg rounded-3xl shadow-xl py-6 sm:py-8 px-4 sm:px-10 border dark:border-white/10 hover:shadow-2xl transition-shadow">
            <form className="space-y-4 sm:space-y-6" onSubmit={onSubmit}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <FaEnvelope className="inline mr-2 w-4 h-4" />
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    autoComplete="email"
                    value={data.email}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/70 dark:bg-[#303134]/90 text-gray-900 dark:text-white rounded-xl border border-gray-300/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <FaLock className="inline mr-2 w-4 h-4" />
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={data.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/70 dark:bg-[#303134]/90 text-gray-900 dark:text-white rounded-xl border border-gray-300/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-2 sm:py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden group text-sm sm:text-base"
              >
                <span className="relative z-10">Log in</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            <div className="mt-6 sm:mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-white/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 sm:px-3 bg-white dark:bg-[#202124] text-xs sm:text-sm text-gray-500 dark:text-gray-400 rounded-full border border-white/20">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="w-full flex justify-center items-center gap-2 py-2 px-4 sm:py-2.5 sm:px-4 border border-gray-300 dark:border-white/20 rounded-xl bg-white dark:bg-[#303134] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#3c4043] transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <FaGoogle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium">Google Sign In</span>
              </button>
            </div>
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-cyan-500 hover:text-cyan-400 font-semibold underline underline-offset-4 hover:underline-offset-2 transition-all"
                >
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;