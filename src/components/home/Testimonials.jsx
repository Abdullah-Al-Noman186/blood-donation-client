"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rahim Uddin",
      role: "Blood Donor",
      text: "I was able to donate blood within 10 minutes of receiving a request. This platform is life-changing.",
      rating: 5,
    },
    {
      name: "Ayesha Rahman",
      role: "Patient Family",
      text: "We urgently needed O- blood. We found a donor instantly. Forever grateful!",
      rating: 5,
    },
    {
      name: "Tanvir Hasan",
      role: "Volunteer",
      text: "The system is fast, reliable, and easy to use. Proud to be part of this mission.",
      rating: 5,
    },
    {
      name: "Nusrat Jahan",
      role: "Hospital Staff",
      text: "This platform reduced our emergency response time significantly.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-red-50 to-white">

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >

          <span className="text-red-600 font-semibold uppercase tracking-widest">
            Testimonials
          </span>

          <h2 className="text-4xl font-bold mt-3 text-gray-800">
            What People Say About Us
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Real stories from donors, patients, and volunteers who saved lives through our platform.
          </p>

        </motion.div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >

          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 h-full"
              >

                {/* Stars */}
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 leading-relaxed">
                  "{item.text}"
                </p>

                {/* Footer */}
                <div className="mt-6 border-t pt-4">

                  <h4 className="font-bold text-gray-800">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>

                </div>

              </motion.div>

            </SwiperSlide>
          ))}

        </Swiper>

      </div>
    </section>
  );
}