"use client";
import React, { useEffect, useState } from "react";
import Blogtabelitem from "@/components/Admincomponents/Blogtabelitem";
import axios from "axios";
import { assets } from "@/assets/assets";
import Loader from "@/components/Loader"; // Import Loader component
import Noblogmsg from "@/components/Noblogmsg";

const Page = () => {
  interface BlogData {
    _id: string;
    title: string;
    author: string;
    date: string;
  }

  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [error, setError] = useState("");

  const fetchBlog = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("/api/blog");
      if (response.data && Array.isArray(response.data.data)) {
        setBlogs(response.data.data);
        setError(""); // Reset error on success
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to fetch blog data.");
      setBlogs([]);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>

      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        {/* Show Loader While Fetching Data */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader /> {/* Your loading spinner */}
          </div>
        ) : error ? (
          // Show Error Message
          <div className="flex justify-center items-center h-full text-red-500">
            {error}
          </div>
        ) : blogs.length > 0 ? (
          // Show Table When Data is Available
          <table className="w-full text-sm text-gray-500">
            <thead className="text-sm text-gray-700 bg-gray-50 text-left uppercase p-2">
              <tr>
                <th className="hidden sm:block px-6 py-3">Author Name</th>
                <th className="px-6 py-3">Blog Title</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((item) => (
                <Blogtabelitem
                  key={item._id}
                  blogid={item._id}
                  author_img={assets.profile_icon}
                  title={item.title}
                  author={item.author}
                  date={item.date}
                  func={fetchBlog}
                />
              ))}
            </tbody>
          </table>
        ) : (
          // Show No Data Message
          <div className="flex justify-center items-center h-full text-black">
           <Noblogmsg text="Blog" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
