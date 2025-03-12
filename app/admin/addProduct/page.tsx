"use client";

import { assets } from "@/assets/assets";
import Button from "@/components/Button";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Page = () => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    author_img: "/profile_icon.png",
    author: "",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author_img", data.author_img);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "",
          author_img: "/profile_icon.png",
          author: "",
        });
      } else {
        toast.error("Error adding blog.");
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to submit blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <form className="pt-5 px-5 sm:pt-8 sm:pl-10 max-w-[700px]">
        <p className="text-xl md:text-2xl">Upload Thumbnail</p>
        <label htmlFor="image" className="cursor-pointer">
          <Image
            className="mt-4"
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="Upload Area"
            width={140}
            height={70}
          />
        </label>
        <input
          onChange={(e) => e.target.files && setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />

        <p className="text-xl mt-4">Blog Title</p>
        <input
          type="text"
          onChange={onChangeHandler}
          placeholder="Type here title..."
          name="title"
          value={data.title}
          required
          className="w-full mt-4 px-4 py-3 border border-black"
        />

        <p className="text-xl mt-4">Author Name</p>
        <input
          type="text"
          onChange={onChangeHandler}
          placeholder="Type here Author Name..."
          name="author"
          value={data.author}
          required
          className="w-full mt-4 px-4 py-3 border border-black"
        />

        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          onChange={onChangeHandler}
          placeholder="Type here Content..."
          name="description"
          value={data.description}
          required
          rows={10}
          className="w-full mt-4 px-4 py-3 border border-black"
        />

        <p className="text-xl mt-4">Blog Category</p>
        <select
          name="category"
          value={data.category}
          onChange={onChangeHandler}
          className="mt-4 mb-4 px-8 py-3 border border-black"
        >
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Startup">Startup</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>

        <br />
        <Button text={loading ? "Uploading..." : "Submit"} type="submit" disabled={loading} func={onSubmitHandler} />
        <br />
      </form>
    </>
  );
};

export default Page;
