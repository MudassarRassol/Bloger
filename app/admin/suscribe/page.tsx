"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import EmailSuS from "@/components/Admincomponents/EmailSubscription";
import Noblogmsg from "@/components/Noblogmsg";
import Loader from "@/components/Loader"; // Import your Loader component

const Page = () => {
  interface EmailData {
    _id: string;
    email: string;
    emailid: string;
    date: string;
  }

  const [email, setEmail] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [error, setError] = useState("");

  const fetchEmails = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("/api/email");
      if (response.data && Array.isArray(response.data.data)) {
        setEmail(response.data.data);
      } else {
        setEmail([]); // Ensure emails is always an array
      }
      setError(""); // Reset error on success
    } catch (err) {
      console.error("Error fetching emails:", err);
      setError("Failed to fetch email subscriptions.");
      setEmail([]);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscription</h1>

      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
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
        ) : email.length > 0 ? (
          // Show Table When Data is Available
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-left text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">Email Subscription</th>
                <th scope="col" className="hidden sm:block px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {email.map((item) => (
                <EmailSuS
                  key={item._id}
                  date={item.date}
                  email={item.email}
                  emailid={item._id}
                  func={fetchEmails}
                />
              ))}
            </tbody>
          </table>
        ) : (
          // Show No Data Message
          <div className="flex justify-center items-center h-full text-black">
            <Noblogmsg text="No Email Subscriptions Found" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
