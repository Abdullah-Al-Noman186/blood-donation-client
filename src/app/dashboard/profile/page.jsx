"use client";

import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Pencil, Save, User, Mail, Droplets, MapPin } from "lucide-react";
import { AuthContext } from "../../../providers/AuthProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosSecure = axios.create({ baseURL: API_URL, withCredentials: true });

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);

  const { isLoading, refetch } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      setFormData(res.data);
      return res.data;
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault(); // form submit, not a plain button click anymore
    const { _id, email, ...rest } = formData;
    try {
      setSaving(true);
      await axiosSecure.patch(`/users/${user.email}`, rest);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1500,
        showConfirmButton: false,
      });
      setEditable(false);
      refetch();
    } catch (err) {
      Swal.fire("Error", "Could not update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !formData) {
    return <span className="loading loading-spinner mx-auto block mt-20"></span>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-3xl p-8 text-white shadow-xl mb-8 flex items-center gap-6">
        <img
          src={formData.avatar}
          alt={formData.name}
          className="w-20 h-20 rounded-full border-4 border-white/40 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{formData.name}</h1>
          <p className="text-red-100 capitalize">{formData.role}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">My Profile</h2>

          {!editable && (
            <button
              type="button"
              onClick={() => setEditable(true)}
              className="btn btn-outline btn-sm gap-2"
            >
              <Pencil size={16} />
              Edit
            </button>
          )}
        </div>

        {/* This is now a real <form> — Edit toggles disabled state on inputs,
            Save is the form's submit button, Enter key also triggers save */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <User size={16} /> Name
              </span>
            </label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              disabled={!editable}
              className={`input input-bordered w-full ${!editable ? "bg-gray-100" : ""}`}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Mail size={16} /> Email
              </span>
            </label>
            <input
              name="email"
              value={formData.email || ""}
              disabled
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Droplets size={16} /> Blood Group
              </span>
            </label>
            <input
              name="bloodGroup"
              value={formData.bloodGroup || ""}
              onChange={handleChange}
              disabled={!editable}
              className={`input input-bordered w-full ${!editable ? "bg-gray-100" : ""}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <MapPin size={16} /> District
                </span>
              </label>
              <input
                name="district"
                value={formData.district || ""}
                onChange={handleChange}
                disabled={!editable}
                className={`input input-bordered w-full ${!editable ? "bg-gray-100" : ""}`}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Upazila</span>
              </label>
              <input
                name="upazila"
                value={formData.upazila || ""}
                onChange={handleChange}
                disabled={!editable}
                className={`input input-bordered w-full ${!editable ? "bg-gray-100" : ""}`}
              />
            </div>
          </div>

          {editable && (
            <button
  type="submit"
  disabled={saving}
  className="btn btn-error w-full text-green-500 hover:bg-green-100 flex items-center justify-center gap-2"
>
  {saving ? (
    <span className="loading loading-spinner loading-xs"></span>
  ) : (
    <Save size={16} />
  )}
  <span>Save</span>
</button>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;