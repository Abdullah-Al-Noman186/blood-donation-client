"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  HandHeart,
  DollarSign,
  Users,
  Heart,
  X,
} from "lucide-react";

import PrivateRoute from "../../components/PrivateRoute";
import StripeProvider from "../../providers/StripeProvider";
import DonationForm from "../../components/DonationForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosSecure = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const Funding = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: funds,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const res = await axiosSecure.get("/funds");
      return res.data;
    },
  });

  const fundsList = Array.isArray(funds)
    ? funds
    : [];

  const totalRaised = fundsList.reduce(
    (sum, fund) => sum + Number(fund.amount),
    0
  );

  return (
    <PrivateRoute>

      <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-gray-50">

        {/* HERO */}

        <section className="bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white">

          <div className="max-w-7xl mx-auto px-6 py-16">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <h1 className="text-4xl md:text-5xl font-bold">

                Support Life Saving Missions ❤️

              </h1>

              <p className="mt-4 text-white/90 max-w-2xl">

                Your contribution helps organize blood drives,
                emergency transportation, donor awareness programs,
                and saves thousands of lives every year.

              </p>

            </motion.div>

          </div>

        </section>

        {/* STATS */}

        <div className="max-w-7xl mx-auto px-6 -mt-10">

          <div className="grid md:grid-cols-3 gap-6">

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl shadow-lg p-6"
            >
              <DollarSign
                className="text-green-600 mb-3"
                size={35}
              />

              <p className="text-gray-500">
                Total Raised
              </p>

              <h2 className="text-3xl font-bold text-green-600">

                ${totalRaised.toFixed(2)}

              </h2>

            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl shadow-lg p-6"
            >

              <Users
                className="text-blue-600 mb-3"
                size={35}
              />

              <p className="text-gray-500">
                Total Contributors
              </p>

              <h2 className="text-3xl font-bold">

                {fundsList.length}

              </h2>

            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl shadow-lg p-6"
            >

              <Heart
                className="text-red-500 mb-3"
                size={35}
              />

              <p className="text-gray-500">
                Every Donation Matters
              </p>

              <h2 className="text-3xl font-bold">
                ❤️
              </h2>

            </motion.div>

          </div>

        </div>

        {/* TABLE */}

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8">

            <div>

              <h2 className="text-3xl font-bold">

                Recent Contributions

              </h2>

              <p className="text-gray-500">

                Thank you to everyone supporting the community.

              </p>

            </div>

            <button
              onClick={() =>
                setModalOpen(true)
              }
              className="btn bg-red-600 hover:bg-red-700 text-white rounded-full px-8"
            >

              <HandHeart size={18} />

              Give Fund

            </button>

          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">

              <span className="loading loading-spinner loading-lg text-red-500"></span>

            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

              <div className="overflow-x-auto">

                <table className="table table-zebra w-full">

                  <thead className="bg-red-600 text-white">

                    <tr>

                      <th>Name</th>

                      <th>Amount</th>

                      <th>Date</th>

                    </tr>

                  </thead>

                  <tbody>

                    {fundsList.length === 0 ? (

                      <tr>

                        <td
                          colSpan={3}
                          className="py-16 text-center"
                        >

                          <div className="flex flex-col items-center">

                            <Heart
                              size={55}
                              className="text-red-300 mb-4"
                            />

                            <h3 className="font-bold text-xl">

                              No Funding Yet

                            </h3>

                            <p className="text-gray-500">

                              Be the first person to support.

                            </p>

                          </div>

                        </td>

                      </tr>

                    ) : (

                      fundsList.map((fund) => (

                        <tr key={fund._id}>

                          <td className="font-semibold">

                            {fund.name}

                          </td>

                          <td className="font-bold text-green-600">

                            $

                            {Number(
                              fund.amount
                            ).toFixed(2)}

                          </td>

                          <td>

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

            </div>
          )}

        </div>

        {/* MODAL */}

        <AnimatePresence>

          {modalOpen && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            >

              <motion.div
                initial={{
                  scale: 0.9,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  scale: 0.9,
                  opacity: 0,
                }}
                className="bg-white rounded-3xl w-full max-w-md p-7 shadow-2xl"
              >

                <div className="flex justify-between items-center mb-6">

                  <h3 className="text-2xl font-bold">

                    Make a Donation

                  </h3>

                  <button
                    onClick={() =>
                      setModalOpen(false)
                    }
                    className="btn btn-circle btn-sm btn-ghost"
                  >

                    <X size={18} />

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

              </motion.div>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </PrivateRoute>
  );
};

export default Funding;