"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  MapPin,
  Droplets,
  Clock3,
  ShieldCheck,
} from "lucide-react";

export default function SearchCTA() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-pink-600"></div>

      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4">

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
          className="grid lg:grid-cols-2 gap-12 items-center"
        >

          {/* Left */}

          <div>

            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-5 py-2 rounded-full text-sm font-semibold text-white">

              <Search size={18} />

              Emergency Blood Search

            </span>

            <h2 className="text-4xl lg:text-6xl font-extrabold text-white mt-8 leading-tight">

              Need Blood
              <br />

              <span className="text-yellow-200">
                Right Now?
              </span>

            </h2>

            <p className="text-white/90 text-lg mt-8 leading-8 max-w-xl">

              Search thousands of verified blood donors across Bangladesh
              and connect with nearby heroes in just a few seconds.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                href="/search"
                className="btn bg-white text-red-600 border-0 rounded-full h-14 px-8 text-lg font-bold shadow-xl hover:scale-105 transition"
              >
                Find Donors

                <ArrowRight size={18} />

              </Link>

              <Link
                href="/register"
                className="btn btn-outline border-white text-white rounded-full h-14 px-8 hover:bg-white hover:text-red-600"
              >
                Become Donor
              </Link>

            </div>

          </div>

          {/* Right */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
          >

            <h3 className="text-2xl font-bold text-white mb-8">

              Quick Search Benefits

            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-5 bg-white/10 rounded-2xl p-5">

                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">

                  <MapPin className="text-red-600" />

                </div>

                <div>

                  <h4 className="font-bold text-white">

                    Nearby Donors

                  </h4>

                  <p className="text-white/80 text-sm">

                    Search by district & upazila

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-5 bg-white/10 rounded-2xl p-5">

                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">

                  <Droplets className="text-green-600" />

                </div>

                <div>

                  <h4 className="font-bold text-white">

                    All Blood Groups

                  </h4>

                  <p className="text-white/80 text-sm">

                    A+, O-, AB+, B+ and more

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-5 bg-white/10 rounded-2xl p-5">

                <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">

                  <Clock3 className="text-yellow-600" />

                </div>

                <div>

                  <h4 className="font-bold text-white">

                    Instant Connection

                  </h4>

                  <p className="text-white/80 text-sm">

                    Reach donors in minutes

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-5 bg-white/10 rounded-2xl p-5">

                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">

                  <ShieldCheck className="text-blue-600" />

                </div>

                <div>

                  <h4 className="font-bold text-white">

                    Verified Profiles

                  </h4>

                  <p className="text-white/80 text-sm">

                    Trusted community members

                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}