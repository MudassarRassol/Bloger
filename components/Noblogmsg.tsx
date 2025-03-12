import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Noblogmsg = ({text}:{text:string}) => {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center text-center">
      <Image
        src={assets.noblogphoto}
        alt="No Blogs Found"
        width={200}
        height={200}
      />
      <p className="mt-4 text-xl font-semibold text-gray-600">No {text} Available</p>
    </div>
  );
};

export default Noblogmsg;
