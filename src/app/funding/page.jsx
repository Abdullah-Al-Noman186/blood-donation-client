"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PrivateRoute from "../../components/PrivateRoute";
import StripeProvider from "../../providers/StripeProvider";
import DonationForm from "../../components/DonationForm";
import { HandHeart } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosSecure = axios.create({ baseURL: API_URL, withCredentials: true });

const Funding = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: funds, isLoading, refetch } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const res = await axiosSecure.get("/funds");
      return res.data;
    },
  });

  // always a real array, even if the request fails or hasn't resolved yet
  const fundsList = Array.isArray(funds) ? funds : [];
  const totalRaised = fundsList.reduce((sum, f) => sum + f.amount, 0);

  return (
    <PrivateRoute>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Funding</h2>
            <p className="text-gray-500 text-sm mt-1">
              Total raised: <span className="font-semibold text-red-600">${totalRaised.toFixed(2)}</span>
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary gap-2"
          >
            <HandHeart size={18} />
            Give Fund
          </button>
        </div>

        {isLoading ? (
          <span className="loading loading-spinner mx-auto block mt-10"></span>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {fundsList.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-500">
                      No funding records yet. Be the first to give!
                    </td>
                  </tr>
                ) : (
                  fundsList.map((fund) => (
                    <tr key={fund._id}>
                      <td>{fund.name}</td>
                      <td>${fund.amount.toFixed(2)}</td>
                      <td>{new Date(fund.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Give Fund</h3>
                <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <StripeProvider>
                <DonationForm
                  onSuccess={() => {
                    setModalOpen(false);
                    refetch();
                  }}
                />
              </StripeProvider>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
};

export default Funding;