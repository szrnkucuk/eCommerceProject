
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../redux/thunks";
import { setUser } from "../redux/clientReducer";      
import axiosInstance from "../api/axiosInstance";       

const USE_DUMMY_AUTH = true;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from || "/";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const rememberMe = watch("rememberMe", false);

  
  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      if (USE_DUMMY_AUTH) {
        const fakeUser = { name: "Sezerin", email: data.email || "s@x.com" };
        const fakeToken = "DUMMY";

        localStorage.setItem("token", fakeToken);
        if (rememberMe) localStorage.setItem("user", JSON.stringify(fakeUser));
        axiosInstance.defaults.headers.common["Authorization"] = fakeToken;

        dispatch(setUser(fakeUser));
        navigate(from, { replace: true });
        return;
      }

      
      await dispatch(loginUser(data, rememberMe, navigate, from));
    } catch (e) {
      setError(e?.response?.data?.message || "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-16 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <label className="block mb-2 font-semibold">Email</label>
        <input
          autoComplete="email"
          {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
          className="border p-2 rounded w-full mb-3"
          defaultValue="s@x.com"
        />
        {errors.email && <p className="text-red-500 text-sm">Enter a valid email</p>}

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          autoComplete="current-password"
          {...register("password", { required: true })}
          className="border p-2 rounded w-full mb-3"
          defaultValue="123456"
        />
        {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

        <label className="flex items-center gap-2 text-sm mb-2 select-none">
          <input type="checkbox" {...register("rememberMe")} />
          <span>Remember me</span>
        </label>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-2 text-white rounded-md font-semibold ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup", { state: { from } })} className="text-blue-500 cursor-pointer hover:underline">
            Sign up here
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
