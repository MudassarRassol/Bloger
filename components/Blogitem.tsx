import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { assets } from "@/assets/assets";
import Link from "next/link";

interface BlogData {
  _id: string;
  title: string;
  description: string;
  image: StaticImageData;
  category: string;
}

const Blogitem: React.FC<BlogData> = ({ image, description, title, category, _id }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] transition-all duration-200 hover:scale-105 relative">
      <Link href={`/blogs/${_id}`}>
        <div className="relative w-full aspect-[4/3] border-b border-black overflow-hidden bg-gray-200">
          {/* Skeleton Loader */}
          {loading && <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>}
          <Image
            src={image}
            alt={title}
            width={400}
            height={300} // Adjusted height for better aspect ratio
            className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setLoading(false)}
          />
        </div>
      </Link>

      <p className="ml-2 mt-2 px-1 inline-block bg-black text-white text-sm">{category}</p>

      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{title}</h5>
        <p className="text-sm mb-3 tracking-tight text-gray-700 line-clamp-2">
  {description}
</p>

        <Link href={`/blogs/${_id}`} className="inline-flex items-center py-2 font-semibold text-center gap-2 absolute bottom-0 ">
          Read more
          <Image src={assets.arrow} alt="arrow" width={10} height={10} />
        </Link>
      </div>
    </div>
  );
};

export default Blogitem;
