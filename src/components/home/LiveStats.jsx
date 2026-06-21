"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  Users,
  HeartHandshake,
  Activity,
  MapPinned,
} from "lucide-react";

const stats = [
  {
    title: "Registered Donors",
    value: 12450,
    icon: Users,
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    title: "Blood Requests",
    value: 1320,
    icon: Activity,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Lives Saved",
    value: 8900,
    icon: HeartHandshake,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "District Coverage",
    value: 64,
    icon: MapPinned,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

export default function LiveStats() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-red-50 to-white">

      <div className="max-w-7xl mx-auto px-4">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <div className="text-center mb-14">

            <span className="text-red-600 font-semibold uppercase tracking-widest">

              Our Impact

            </span>

            <h2 className="text-4xl font-bold mt-3 text-gray-800">

              Together We Are Saving Lives

            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">

              Thousands of generous donors are helping patients every day.
              Join our growing community and become someone's hero.

            </p>

          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            {stats.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={index}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                  }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center transition-all duration-300"
                >

                  <div
                    className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${item.bg}`}
                  >

                    <Icon
                      size={38}
                      className={item.color}
                    />

                  </div>

                  <h3 className="text-4xl font-extrabold mt-6 text-gray-800">

                    <CountUp
                      end={item.value}
                      duration={2.5}
                      separator=","
                    />

                    +

                  </h3>

                  <p className="mt-3 text-gray-500 font-medium">

                    {item.title}

                  </p>

                </motion.div>

              );

            })}

          </div>

        </motion.div>

      </div>

    </section>
  );
}