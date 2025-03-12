"use client";
import React, { useState, useEffect } from "react";
import Blogitem from "./Blogitem";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { StaticImageData } from "next/image";
import Loader from "./Loader";
import Noblogmsg from "./Noblogmsg";
const Bloglist = () => {
    const [menu, setMenu] = useState("All");
    const [blog_data, setblog_data] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    interface Blog {
        _id: string;
        image: StaticImageData;
        title: string;
        description: string;
        category: string;
    }

    const fetchblogs = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/blog");
            if (res.status === 200) {
                setblog_data(res.data.data);
            } else {
                throw new Error("Failed to fetch blogs");
            }
        } catch (err) {
            console.log(err )
            setError("Failed to fetch blog data");
            toast.error("Failed to fetch blog data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchblogs();
    }, []);

    return (
        <div>
            <ToastContainer theme="dark" />
            {/* Category Buttons */}
            <div className="flex justify-center flex-wrap gap-6 my-10">
                {["All", "Technology", "Startup", "Lifestyle"].map((item) => (
                    <button
                        key={item}
                        className={`py-1 px-4 rounded-sm transition-all duration-200 ${menu === item ? "border-2 bg-black text-white" : "border-2 border-black"}`}
                        onClick={() => setMenu(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
              <Loader/>
            )}

            {/* Error Message */}
            {error && !loading && (
                <div className="flex justify-center items-center my-10 text-lg text-red-500">
                    <p>{error}</p>
                </div>
            )}

            {/* Blog List */}
            {!loading && !error && (
                <div className="flex justify-around lg:justify-start flex-wrap   gap-14 mx-4 xl:mx-16 mb-10">
                    { blog_data && blog_data.length > 0 ? (
                        blog_data
                            .filter((item) => menu === "All" || item.category === menu)
                            .map((item) => (
                                <Blogitem key={item._id} image={item.image} title={item.title} description={item.description} _id={item._id} category={item.category} />
                            ))
                    ) : (
                        <Noblogmsg text="Blog" />
                    )}
                </div>
            )}
        </div>
    );
};

export default Bloglist; 