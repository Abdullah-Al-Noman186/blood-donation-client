"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Headphones,
} from "lucide-react";

export default function ContactSection() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    Swal.fire({
      icon: "success",
      title: "Message Sent ❤️",
      text: "We will contact you very soon!",
      timer: 2000,
      showConfirmButton: false,
    });

    reset();
  };

  return (
    <section className="py-24 bg-gradient-to-b from-red-50 via-white to-white">

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >

          <span className="text-red-600 font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
            <Headphones size={16} />
            Contact Us
          </span>

          <h2 className="text-4xl font-bold mt-3 text-gray-800">
            We’re Here to Help
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Have questions or need support? Send us a message and we will respond quickly.
          </p>

        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 space-y-5"
          >

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Name
              </label>
              <input
                {...register("name")}
                placeholder="Your name"
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Email
              </label>
              <input
                {...register("email")}
                placeholder="Your email"
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Message
              </label>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 transition"
            >
              <Send size={18} />
              Send Message
            </button>

          </motion.form>

          {/* INFO PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-red-600 to-pink-600 text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden"
          >

            {/* glow */}
            <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl"></div>

            <h3 className="text-3xl font-bold mb-8 relative">
              Contact Information
            </h3>

            <div className="space-y-6 relative">

              <div className="flex items-center gap-4">
                <Mail />
                <span>support@bloodlink.org</span>
              </div>

              <div className="flex items-center gap-4">
                <Phone />
                <span>+880 1XXX-XXXXXX</span>
              </div>

              <div className="flex items-center gap-4">
                <MapPin />
                <span>Bangladesh</span>
              </div>

            </div>

            {/* extra card */}
            <div className="mt-10 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
              <h4 className="font-bold text-lg">
                24/7 Emergency Support
              </h4>
              <p className="text-white/80 text-sm mt-2">
                We are always available for urgent blood requests and emergencies.
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}