import { StaticImageData } from 'next/image';
import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import axios from 'axios';
import {  toast } from 'react-toastify';

interface ItemData {
  author_img?: StaticImageData;
  title?: string;
  date: string;
  author?: string;
  blogid: string;
  func: () => Promise<void>;
}

const Blogtabelitem: React.FC<ItemData> = ({ author_img, title, author, blogid, date, func }) => {
  
  const deleteBlog = async ({ postid }: { postid: string }) => {
    try {
      const res = await axios.delete('/api/blog', {
        params: { id: postid }
      });

      if (res.status === 200) {
        toast.success(res.data.msg || "Blog deleted successfully");
        await func(); // Refresh the list after deletion
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("An error occurred while deleting the blog");
    }
  };

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={author_img ? author_img : assets.profile_icon}
          alt="author_img"
          width={40}
          height={40}
          className="rounded-full"
        />
        <p>{author ? author : 'No author'}</p>
      </th>
      <td className="px-6 py-4">{title ? title : 'No Title'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(date).toLocaleString()}
      </td>
      <td className="px-6 py-4 cursor-pointer text-red-500 font-bold hover:underline" onClick={() => deleteBlog({ postid: blogid })}>
        X
      </td>
    </tr>
  );
};

export default Blogtabelitem;
