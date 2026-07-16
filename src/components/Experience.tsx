"use client";

import { ExperienceData } from "@/lib/types";
import { motion } from "framer-motion";

export default function Experience({ data }: { data: ExperienceData[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-10 text-center"
        >
          Experience
        </motion.h2>
        
        <div className="space-y-6">
          {data.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-black/20"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{job.role}</h3>
                  <p className="text-blue-600 font-semibold mt-1">{job.company}</p>
                </div>
                <span className="text-sm text-slate-500 font-medium mt-2 md:mt-0 bg-slate-100 px-4 py-1.5 rounded-full">
                  {job.duration}
                </span>
              </div>
              <ul className="space-y-3">
                {job.description.map((desc, i) => (
                  <li key={i} className="flex items-start text-slate-600">
                    <span className="text-blue-600 mr-3 mt-1 flex-shrink-0">•</span>
                    <span className="leading-relaxed">{desc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
