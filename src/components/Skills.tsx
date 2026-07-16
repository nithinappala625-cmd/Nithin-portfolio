"use client";

import { SkillCategory } from "@/lib/types";
import { motion } from "framer-motion";

export default function Skills({ data }: { data: SkillCategory[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-10 text-center"
        >
          Skills &amp; Expertise
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-black/20"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-5 pb-3 border-b border-slate-200">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
