"use client";

import { motion } from "framer-motion";
import {
  UserPlus,
  FileCheck,
  Search,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Account",
      desc: "Sign up as a donor or patient in just a few seconds.",
    },
    {
      icon: FileCheck,
      title: "Complete Profile",
      desc: "Add your blood group, location, and availability.",
    },
    {
      icon: Search,
      title: "Find or Get Found",
      desc: "Search donors or let patients find you instantly.",
    },
    {
      icon: HeartHandshake,
      title: "Connect & Donate",
      desc: "Contact and arrange blood donation safely.",
    },
    {
      icon: CheckCircle2,
      title: "Save Lives",
      desc: "Your donation helps save up to 3 lives.",
    },
  ];

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <span className="text-red-600 font-semibold uppercase tracking-widest">
            How It Works
          </span>

          <h2 className="text-4xl font-bold mt-3 text-gray-800">
            Simple Steps to Save Lives
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Our platform connects donors and patients in a fast, safe, and
            efficient way. Just follow these simple steps.
          </p>

        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-red-100 hidden md:block"></div>

          <div className="space-y-16">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center md:items-start gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >

                  {/* Icon */}
                  <div className="flex-shrink-0 w-20 h-20 bg-red-100 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
                    <Icon className="text-red-600" size={32} />
                  </div>

                  {/* Content */}
                  <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 w-full md:w-1/2 hover:shadow-2xl transition">

                    <h3 className="text-2xl font-bold text-gray-800">
                      {step.title}
                    </h3>

                    <p className="text-gray-500 mt-3 leading-relaxed">
                      {step.desc}
                    </p>

                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}