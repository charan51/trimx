import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from '../api/app';
import { useStoreContext } from "../contextApi";
import toast from "react-hot-toast";
const AddUrlPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const onSubmit = async (data) => {
    try {
      const { data: res } = await api.post('/urls/shorten', data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      });
      const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_ENDURL + "/s" + res.shortUrl}`;
      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success("Short url copied to clipboard", {
          position: "bottom-center",
          className: "mb-5",
          duration: 3000
        });
      });
      reset();
    } catch (err) {
      toast.error("Short url failed");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Section */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-blue-600 text-white w-1/3 p-10">
        <h1 className="text-4xl font-bold mb-4">Create and Share</h1>
        <p className="text-lg mb-8 text-center">
          Simplify your links and track their performance with ease. Let every
          URL make an impact.
        </p>
        <img
          src="https://via.placeholder.com/300x200.png?text=Motivational+Graphic"
          alt="Motivational Graphic"
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Add New URL
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* URL Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">URL</label>
              <input
                type="url"
                {...register("url", {
                  required: "URL is required",
                  pattern: {
                    value: /^(https?:\/\/)?([\w\-])+\.{1}([a-z]{2,63})([\/\w\-.~:?#[\]@!$&'()*+,;=]*)?$/,
                    message: "Invalid URL format",
                  },
                })}
                className={`w-full p-3 border rounded-lg ${errors.url ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="https://example.com"
              />
              {errors.url && (
                <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
              )}
            </div>

            {/* Title Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className={`w-full p-3 border rounded-lg ${errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter a title for your URL"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"

              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
            >
              Add URL
            </button>
          </form>

          {/* Motivation Text */}
          <div className="mt-8 text-center">
            <p className="text-gray-700 text-sm">
              "Every link you create is a chance to connect, share, and inspire."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUrlPage;
