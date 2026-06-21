"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  HeartHandshake,
  Droplets,
  ShieldCheck,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-pink-600 text-white">

      {/* Background Blur */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-yellow-300/10 blur-3xl"></div>

      {/* Floating Blood Drops */}

      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute top-24 left-10 hidden lg:block"
      >
        <Droplets size={55} className="text-red-300/50" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 25, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute bottom-20 right-20 hidden lg:block"
      >
        <Droplets size={70} className="text-white/20" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-lg px-5 py-2 rounded-full border border-white/20 text-sm font-semibold">

              ❤️ Trusted by Thousands

            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mt-8">

              Donate Blood
              <br />

              <span className="text-yellow-200">
                Save Lives
              </span>

            </h1>

            <p className="mt-8 text-lg text-white/90 leading-8 max-w-xl">

              Connect with verified blood donors across Bangladesh.
              Every donation has the power to save up to three lives and
              bring hope to families in need.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                href="/register"
                className="btn bg-white border-0 text-red-600 hover:bg-red-50 rounded-full px-8 h-14 font-bold text-lg shadow-xl"
              >
                Become Donor

                <ArrowRight size={18} />

              </Link>

              <Link
                href="/search"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-red-600 rounded-full px-8 h-14 text-lg"
              >
                Find Blood
              </Link>

            </div>

            <div className="flex flex-wrap gap-8 mt-12">

              <div>

                <h3 className="text-4xl font-bold">
                  12K+
                </h3>

                <p className="text-white/80">
                  Registered Donors
                </p>

              </div>

              <div>

                <h3 className="text-4xl font-bold">
                  8900+
                </h3>

                <p className="text-white/80">
                  Lives Saved
                </p>

              </div>

              <div>

                <h3 className="text-4xl font-bold">
                  64
                </h3>

                <p className="text-white/80">
                  Districts
                </p>

              </div>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <ShieldCheck size={28} />

                <h2 className="text-2xl font-bold">

                  Live Impact

                </h2>

              </div>

              <div className="space-y-5">

                <div className="bg-white/10 rounded-2xl p-5 flex justify-between items-center">

                  <div>

                    <p className="text-white/80">

                      Active Donors

                    </p>

                    <h3 className="text-3xl font-bold">

                      12,450

                    </h3>

                  </div>

                  <HeartHandshake size={40} />

                </div>

                <div className="bg-white/10 rounded-2xl p-5 flex justify-between items-center">

                  <div>

                    <p className="text-white/80">

                      Emergency Requests

                    </p>

                    <h3 className="text-3xl font-bold">

                      320

                    </h3>

                  </div>

                  <Droplets size={40} />

                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 shadow-xl">

                  <p className="text-white/90">

                    ❤️ Every Donation Matters

                  </p>

                  <h2 className="text-4xl font-extrabold mt-2">

                    Save 3 Lives

                  </h2>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}