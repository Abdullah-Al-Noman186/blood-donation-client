"use client";

import { motion } from "framer-motion";

export default function BloodCompatibility() {
  const compatibility = [
    { type: "O-", donateTo: "Everyone", receiveFrom: "O-" },
    { type: "O+", donateTo: "O+, A+, B+, AB+", receiveFrom: "O-, O+" },
    { type: "A-", donateTo: "A-, A+, AB-, AB+", receiveFrom: "O-, A-" },
    { type: "A+", donateTo: "A+, AB+", receiveFrom: "O-, O+, A-, A+" },
    { type: "B-", donateTo: "B-, B+, AB-, AB+", receiveFrom: "O-, B-" },
    { type: "B+", donateTo: "B+, AB+", receiveFrom: "O-, O+, B-, B+" },
    { type: "AB-", donateTo: "AB-, AB+", receiveFrom: "O-, A-, B-, AB-" },
    { type: "AB+", donateTo: "AB+ only", receiveFrom: "Everyone" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-red-50 via-white to-white">

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
            Blood Guide
          </span>

          <h2 className="text-4xl font-bold mt-3 text-gray-800">
            Blood Compatibility Chart
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Understand which blood types can donate and receive from each other.
          </p>

        </motion.div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">

            <thead className="bg-red-600 text-white">

              <tr>
                <th className="p-4 text-left">Blood Group</th>
                <th className="p-4 text-left">Can Donate To</th>
                <th className="p-4 text-left">Can Receive From</th>
              </tr>

            </thead>

            <tbody>

              {compatibility.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-red-50 transition"
                >

                  <td className="p-4 font-bold text-red-600">
                    {item.type}
                  </td>

                  <td className="p-4 text-gray-700">
                    {item.donateTo}
                  </td>

                  <td className="p-4 text-gray-700">
                    {item.receiveFrom}
                  </td>

                </motion.tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}
        <div className="md:hidden grid gap-6">

          {compatibility.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            >

              <h3 className="text-xl font-bold text-red-600 mb-3">
                {item.type}
              </h3>

              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Donate To:</span>{" "}
                {item.donateTo}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold">Receive From:</span>{" "}
                {item.receiveFrom}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}