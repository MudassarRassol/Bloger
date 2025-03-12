"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { assets } from "@/assets/assets";
import { StaticImageData } from "next/image";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import Button from "@/components/Button";
import Loader from "@/components/Loader";

interface BlogData {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  category: string;
  author_img: StaticImageData;
  author: string;
}

const Page: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/blog`, {
          params: { id: params.id },
        });
        if (res.data.success) {
          setData(res.data.data);
        } else {
          setError("Blog not found.");
        }
      } catch (err) {
        setError("Failed to fetch blog data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <Loader/>
        {/* <p className="text-xl font-semibold">Loading blog...</p> */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-xl font-semibold text-red-600">{error}</h1>
        <Link href="/" className="mt-5 inline-block">
          <Button text="Go Back" />
        </Link>
      </div>
    );
  }

  return data ? (
    <div>
      <Link href="/" className="absolute top-2 left-3 fixed">
        <Button text="Go Back" />
      </Link>
      <div className="text-center my-24">
        <h1 className="text-2xl mx-auto sm:text-5xl font-semibold max-w-[700px]">
          {data?.title}
        </h1>
        <Image
          className="mx-auto mt-6 border border-white rounded-full"
          src={assets.profile_icon}
          alt={data?.title}
          width={60}
          height={60}
        />
        <p className="mt-1 pb-4 text-lg text-gray-700 max-w-[740px] mx-auto">
          {data?.author}
        </p>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="w-full h-auto border border-gray-300 rounded-lg"
          src={data?.image}
          alt={data?.title}
          width={800}
          height={500}
        />
        <h1 className="text-2xl sm:text-4xl mt-2 tracking-tight">Introduction:</h1>
        <p className="mt-4 text-lg text-gray-700">{data?.description}</p>
        <h1 className="text-2xl sm:text-4xl mt-2 tracking-tight">Conclusion:</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra,
          nunc ac convallis commodo, est nunc tincidunt tellus, id bibendum
          velit velit vel velit...
        </p>
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
          <p>Share this post on social media:</p>
          <div className="flex mt-3">
            <Image src={assets.facebook_icon} alt="Facebook" width={40} height={40} />
            <Image src={assets.googleplus_icon} alt="Google Plus" width={40} height={40} />
            <Image src={assets.twitter_icon} alt="Twitter" width={40} height={40} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-center mt-20">Blog not found.</h1>
  );
};

export default Page;
