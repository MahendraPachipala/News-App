import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useDarkMode } from "../config/AuthContext";

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { darkmode } = useDarkMode();

  const onSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user) {
          setDoc(doc(db, "Users", user.uid), {
            email: user.email,
          });
        }
        console.log(user);
        navigate("/");
      })
      .catch((err) => {
        const errorMessage = err.message;
        alert(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user) {
          setDoc(doc(db, "Users", user.uid), {
            email: user.email,
          });
        }
        console.log(user);
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className={`${darkmode ? "" : "dark"}`}>
      <div className="min-h-screen bg-[#F6F5F2] dark:bg-[#29292d] transition-colors duration-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-md pt-12">
          <h2 className="text-center text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Create Account
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
            Start your journey with us
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/80 dark:bg-[#202124]/90 backdrop-blur-lg rounded-3xl shadow-xl py-8 px-4 sm:px-10 border dark:border-white/10 hover:shadow-2xl transition-shadow">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
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
                    className="w-full px-4 py-3 bg-white/50 dark:bg-[#303134]/80 text-gray-900 dark:text-white rounded-xl border border-gray-300/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400 transition-all"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
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
                    autoComplete="new-password"
                    value={data.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-[#303134]/80 text-gray-900 dark:text-white rounded-xl border border-gray-300/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={onSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden group"
              >
                <span className="relative z-10">Create Account</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-white/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white dark:bg-[#202124] text-sm text-gray-500 dark:text-gray-400 rounded-full border border-white/20">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-300 dark:border-white/20 rounded-xl bg-white dark:bg-[#303134] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#3c4043] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <FaGoogle className="w-6 h-6" />
                  Google Sign Up
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Existing member?{" "}
                  <a
                    href="/"
                    className="text-cyan-500 hover:text-cyan-400 font-semibold underline underline-offset-4 hover:underline-offset-2 transition-all"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
