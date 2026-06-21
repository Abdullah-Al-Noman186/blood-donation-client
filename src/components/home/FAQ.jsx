"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Who can donate blood?",
      a: "Anyone aged 18-60, healthy, and meeting basic medical requirements can donate blood safely.",
    },
    {
      q: "How often can I donate blood?",
      a: "You can donate whole blood every 3 months safely, depending on your health condition.",
    },
    {
      q: "Is blood donation safe?",
      a: "Yes, it is completely safe. All equipment used is sterile and disposable.",
    },
    {
      q: "Can I find blood donors instantly?",
      a: "Yes, our platform connects you with nearby verified donors within minutes.",
    },
    {
      q: "Do I need to register to request blood?",
      a: "Yes, registration helps us verify and connect you with the right donors quickly.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-red-50 to-white">

      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >

          <span className="text-red-600 font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
            <HelpCircle size={16} />
            FAQ
          </span>

          <h2 className="text-4xl font-bold mt-3 text-gray-800">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-500 mt-4">
            Everything you need to know about blood donation and our platform.
          </p>

        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">

          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl shadow-md overflow-hidden"
            >

              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left hover:bg-red-50 transition"
              >

                <span className="font-semibold text-gray-800">
                  {item.q}
                </span>

                <span className="text-red-600 text-xl font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>

              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-600 text-sm leading-relaxed"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}