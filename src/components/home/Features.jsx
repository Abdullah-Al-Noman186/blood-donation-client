
"use client";

import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  Users,
  Clock,
  Stethoscope,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Save Lives",
    desc: "Every donation can save up to 3 lives instantly.",
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    icon: ShieldCheck,
    title: "100% Safe",
    desc: "Certified medical standards and hygiene protocols.",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: Users,
    title: "Strong Community",
    desc: "Join thousands of verified blood donors.",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: Clock,
    title: "Fast Matching",
    desc: "Find donors instantly during emergencies.",
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  {
    icon: Stethoscope,
    title: "Medical Support",
    desc: "Connected with hospitals and emergency units.",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: Globe,
    title: "Nationwide Network",
    desc: "Available across all districts of Bangladesh.",
    color: "text-indigo-600",
    bg: "bg-indigo-100",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-red-50 to-white">

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <span className="text-red-600 font-semibold tracking-widest uppercase">
            Why Choose Us
          </span>

          <h2 className="text-4xl font-bold mt-3 text-gray-800">
            A Trusted Blood Donation Platform
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We connect donors and patients with speed, safety, and trust.
            Built for emergency response and community impact.
          </p>

        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl"
              >

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg}`}
                >
                  <Icon size={30} className={item.color} />
                </div>

                <h3 className="text-xl font-bold mt-6 text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-relaxed">
                  {item.desc}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}