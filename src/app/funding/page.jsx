"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PrivateRoute from "../../components/PrivateRoute";
import StripeProvider from "../../providers/StripeProvider";
import DonationForm from "../../components/DonationForm";
import {
  HandHeart,
  HeartHandshake,
  DollarSign,
  Calendar,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosSecure = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const Funding = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: funds, isLoading, refetch } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const res = await axiosSecure.get("/funds");
      return res.data;
    },
  });

  const totalRaised =
    funds?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 pt-10">

          <div className="rounded-3xl bg-gradient-to-r from-red-600 to-green-600 text-white p-10 shadow-2xl">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

              <div>

                <div className="flex items-center gap-3 mb-4">
                  <HeartHandshake size={42} />
                  <h1 className="text-4xl font-bold">
                    Support Blood Donation
                  </h1>
                </div>

                <p className="text-white/90 max-w-xl text-lg">
                  Your contribution helps organize blood donation campaigns,
                  support emergency patients, and save countless lives.
                </p>

              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setModalOpen(true)}
                className="btn bg-white text-red-600 border-0 px-8 h-14 text-lg font-bold rounded-xl shadow-xl"
              >
                <HandHeart size={22} />
                Give Fund
              </motion.button>

            </div>

          </div>

        </section>

        {/* Statistics */}
        <section className="max-w-7xl mx-auto px-4 mt-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="text-green-600" size={30} />
                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Funds Raised
                  </p>

                  <h2 className="text-4xl font-bold text-green-600">
                    ${totalRaised.toFixed(2)}
                  </h2>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <HeartHandshake className="text-red-600" size={30} />
                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Contributors
                  </p>

                  <h2 className="text-4xl font-bold text-red-600">
                    {funds?.length || 0}
                  </h2>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Table */}
        <section className="max-w-7xl mx-auto px-4 py-10">

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

            <div className="px-8 py-6 border-b">

              <h2 className="text-2xl font-bold">
                Recent Contributions
              </h2>

              <p className="text-gray-500 mt-1">
                Thank you to everyone supporting our mission.
              </p>

            </div>

            {isLoading ? (

              <div className="py-20 flex justify-center">

                <span className="loading loading-spinner loading-lg text-red-600"></span>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="table w-full">

                  <thead className="bg-gray-50">

                    <tr>

                      <th>
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          Donor
                        </div>
                      </th>

                      <th>
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} />
                          Amount
                        </div>
                      </th>

                      <th>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          Date
                        </div>
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {funds?.length === 0 ? (

                      <tr>

                        <td
                          colSpan={3}
                          className="text-center py-12 text-gray-500"
                        >
                          ❤️ No contributions yet.
                          <br />
                          Be the first supporter!

                        </td>

                      </tr>

                    ) : (

                      funds.map((fund) => (

                        <tr
                          key={fund._id}
                          className="hover:bg-red-50 transition-all"
                        >

                          <td className="font-semibold">
                            {fund.name}
                          </td>

                          <td>

                            <span className="badge badge-success text-green-500 px-4 py-3">
                              ${Number(fund.amount).toFixed(2)}
                            </span>

                          </td>

                          <td className="text-gray-500">
                            {new Date(
                              fund.date
                            ).toLocaleDateString()}
                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </section>

        {/* Modal */}

        <AnimatePresence>

          {modalOpen && (

            <motion.div

              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}

              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >

              <motion.div

                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}

                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
              >

                <div className="bg-gradient-to-r from-red-600 to-green-600 p-6 flex justify-between items-center">

                  <h2 className="text-2xl font-bold text-white">
                    ❤️ Support Our Mission
                  </h2>

                  <button
                    onClick={() => setModalOpen(false)}
                    className="text-white text-2xl hover:rotate-90 transition-all"
                  >
                    ✕

                  </button>

                </div>

                <div className="p-8">

                  <StripeProvider>

                    <DonationForm
                      onSuccess={() => {
                        setModalOpen(false);
                        refetch();
                      }}
                    />

                  </StripeProvider>

                </div>

              </motion.div>

            </motion.div>

          )}

        </AnimatePresence>

      </div>
    </PrivateRoute>
  );
};

export default Funding;