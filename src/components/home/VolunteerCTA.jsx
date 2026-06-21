"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeartHandshake, Users, ShieldCheck } from "lucide-react";

export default function VolunteerCTA() {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-red-600 via-pink-600 to-red-700 text-white">

      {/* Background Effects */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-yellow-300/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-5 py-2 rounded-full text-sm font-semibold">
              <HeartHandshake size={18} />
              Join Our Mission
            </span>

            <h2 className="text-4xl lg:text-6xl font-extrabold mt-6 leading-tight">
              Become a Hero <br />
              <span className="text-yellow-200">Save Lives Today</span>
            </h2>

            <p className="mt-6 text-white/90 text-lg leading-8 max-w-xl">
              Join thousands of volunteers and donors who are making a real difference.
              One act of kindness can save multiple lives in emergency situations.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                href="/register"
                className="btn bg-white text-red-600 border-0 px-8 h-14 rounded-full font-bold text-lg hover:bg-red-50"
              >
                Become Volunteer
              </Link>

              <Link
                href="/search"
                className="btn btn-outline border-white text-white px-8 h-14 rounded-full hover:bg-white hover:text-red-600"
              >
                Find Patients
              </Link>

            </div>

          </motion.div>

          {/* RIGHT STATS CARD */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl"
          >

            <h3 className="text-2xl font-bold mb-8">
              Why Volunteers Matter
            </h3>

            <div className="space-y-6">

              {/* Stat 1 */}
              <div className="flex items-center gap-5 bg-white/10 p-5 rounded-2xl">
                <Users className="text-white" size={28} />
                <div>
                  <h4 className="font-bold">Strong Community</h4>
                  <p className="text-white/80 text-sm">
                    Thousands of active donors nationwide
                  </p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-5 bg-white/10 p-5 rounded-2xl">
                <ShieldCheck className="text-white" size={28} />
                <div>
                  <h4 className="font-bold">Safe & Verified</h4>
                  <p className="text-white/80 text-sm">
                    All donors are verified and trusted
                  </p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-5 bg-white/10 p-5 rounded-2xl">
                <HeartHandshake className="text-white" size={28} />
                <div>
                  <h4 className="font-bold">Real Impact</h4>
                  <p className="text-white/80 text-sm">
                    Every donation saves up to 3 lives
                  </p>
                </div>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}