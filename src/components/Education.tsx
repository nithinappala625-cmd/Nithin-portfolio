"use client";

import { EducationData, CertificationData } from "@/lib/types";
import { motion } from "framer-motion";

export default function Education({
  education,
  certifications,
}: {
  education: EducationData[];
  certifications: CertificationData[];
}) {
  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <section id="education" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {education.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Education</h2>
              <div className="space-y-4">
                {education.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 shadow-xl shadow-black/20"
                  >
                    <h3 className="text-lg font-bold text-slate-900">
                      {item.degree}
                    </h3>
                    <p className="text-blue-600 font-medium mt-1">
                      {item.institution}
                    </p>
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <span className="text-slate-500">{item.duration}</span>
                      <span className="font-bold text-slate-900 bg-blue-50 px-3 py-1 rounded-full">
                        {item.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {certifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 shadow-xl shadow-black/20"
                  >
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {item.name}
                    </h3>
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <span className="text-blue-600 font-medium">
                        {item.issuer}
                      </span>
                      <span className="text-slate-500">{item.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
