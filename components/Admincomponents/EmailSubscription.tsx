
import React from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';

interface ItemData {
  email : string;
  date: string;
  emailid: string;
  func: () => Promise<void>;
}

const EmailSuS: React.FC<ItemData> = ({ email,emailid, date, func }) => {
  
  const deleteBlog = async ({ postid }: { postid: string }) => {
    try {
      const res = await axios.delete('/api/email', {
        params: { id: postid }
      });

      if (res.status === 200) {
        toast.success(res.data.msg || "Email deleted successfully");
        await func(); // Refresh the list after deletion
      } else {
        toast.error("Failed to delete Email");
      }
    } catch (error) {
      console.error("Error deleting Email:", error);
      toast.error("An error occurred while deleting the Email");
    }
  };

  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4">{email ? email : 'No Email'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(date).toLocaleString()}
      </td>
      <td className="px-6 py-4 cursor-pointer text-red-500 font-bold hover:underline" onClick={() => deleteBlog({ postid: emailid })}>
        X
      </td>
    </tr>
  );
};

export default EmailSuS;
