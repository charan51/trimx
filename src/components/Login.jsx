import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useStoreContext } from "../contextApi";
import api from '../api/app';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate =  useNavigate();
  const [loader, setLoader] = useState(false);
  const { setToken } = useStoreContext();
  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post("auth/public/login", data);
      setToken(response.token)
      reset();
      navigate("/dashboard");
      toast.success("Login Successful!!");
    } catch (err) {
      console.log(err);
      toast.error("Login failed");
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            {...register("username", {
              required: "User is required",
              pattern: {
                value: 4,
                message: "Invalid user format",
              },
            })}
            className={`w-full p-3 border rounded ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`w-full p-3 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
