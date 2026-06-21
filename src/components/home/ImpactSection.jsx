"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  HeartHandshake,
  Users,
  Building2,
  Activity,
} from "lucide-react";

export default function ImpactSection() {
  const stats = [
    {
      icon: Users,
      value: 12450,
      label: "Registered Donors",
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      icon: HeartHandshake,
      value: 8900,
      label: "Lives Saved",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: Activity,
      value: 320,
      label: "Emergency Requests",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Building2,
      value: 64,
      label: "District Coverage",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-red-600 via-pink-600 to-red-700 text-white">

      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-yellow-300/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold backdrop-blur">
            Our Impact
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-6">
            Every Drop Creates a Miracle
          </h2>

          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            Thousands of donors are saving lives every day. Together, we are building a healthier Bangladesh.
          </p>

        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center shadow-2xl"
              >

                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${item.bg}`}
                >
                  <Icon className={item.color} size={30} />
                </div>

                {/* Counter */}
                <h3 className="text-4xl font-extrabold mt-6">
                  <CountUp
                    end={item.value}
                    duration={2.5}
                    separator=","
                  />
                  +
                </h3>

                {/* Label */}
                <p className="text-white/80 mt-2 font-medium">
                  {item.label}
                </p>

              </motion.div>
            );
          })}

        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mt-20"
        >

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 max-w-4xl mx-auto shadow-2xl">

            <h3 className="text-3xl font-bold">
              Join the Mission of Saving Lives
            </h3>

            <p className="text-white/80 mt-4 leading-relaxed">
              Be part of a community that believes in humanity, compassion, and instant action during emergencies.
              Your one donation can change everything.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <button className="btn bg-white text-red-600 border-0 px-8 rounded-full font-bold hover:bg-red-50">
                Become Donor
              </button>

              <button className="btn btn-outline border-white text-white px-8 rounded-full hover:bg-white hover:text-red-600">
                Learn More
              </button>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}