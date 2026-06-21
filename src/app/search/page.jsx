"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search as SearchIcon,
  Droplets,
  MapPin,
} from "lucide-react";

import districts from "../../data/districts.json";
import upazilas from "../../data/upazilas.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Search = () => {
  const { register, handleSubmit } = useForm();

  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const [results, setResults] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const districtUpazilas = upazilas.filter(
    (u) => String(u.district_id) === String(selectedDistrictId)
  );

  const onSubmit = async (data) => {
    setLoading(true);
    setSearched(true);

    // data.district / data.upazila are IDs now — convert to names before sending to the API
    const districtName =
      districts.find((d) => String(d.id) === String(data.district))?.name || "";
    const upazilaName =
      upazilas.find((u) => String(u.id) === String(data.upazila))?.name || "";

    try {
      const res = await axios.get(`${API_URL}/donors/search`, {
        params: {
          bloodGroup: data.bloodGroup,
          district: districtName,
          upazila: upazilaName,
        },
      });

      setResults(res.data);
    } catch (err) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="bg-red-100 p-3 rounded-2xl">
              <SearchIcon className="text-red-500" size={28} />
            </div>
          </div>

          <h2 className="text-3xl font-bold">Find Blood Donors</h2>

          <p className="text-gray-500 text-sm">
            Search nearby verified donors instantly ❤️
          </p>
        </div>

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 mb-10"
        >
          <select {...register("bloodGroup")} className="select select-bordered w-full">
            <option value="">Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <select
            {...register("district")}
            onChange={(e) => setSelectedDistrictId(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <select {...register("upazila")} className="select select-bordered w-full">
            <option value="">Upazila</option>
            {districtUpazilas.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="btn btn-error bg-cyan-700 rounded-4xl text-white w-full flex items-center justify-center gap-2"
          >
            <SearchIcon size={18} />
            Search
          </button>
        </motion.form>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-red-500"></span>
          </div>
        )}

        {/* RESULTS */}
        <AnimatePresence mode="wait">
          {!loading && searched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {results?.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  <p>No donors found 😔</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {results?.map((donor, i) => (
                    <motion.div
                      key={donor._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col items-center text-center gap-2"
                    >
                      <img
                        src={donor.avatar}
                        alt={donor.name}
                        className="w-16 h-16 rounded-full border"
                      />

                      <h3 className="font-semibold text-lg">{donor.name}</h3>

                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin size={14} />
                        {donor.district}, {donor.upazila}
                      </p>

                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                        <Droplets size={14} className="inline mr-1" />
                        {donor.bloodGroup}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Search;