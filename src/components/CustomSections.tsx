"use client";

import { CustomSection } from "@/lib/types";
import { motion } from "framer-motion";

export default function CustomSections({ data }: { data: CustomSection[] }) {
  if (!data || data.length === 0) return null;

  // Sort by order
  const sorted = [...data].sort((a, b) => a.order - b.order);

  return (
    <>
      {sorted.map((section, idx) => (
        <section key={section.id} className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-10 text-center"
            >
              {section.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-xl shadow-black/20"
            >
              <div className="space-y-4">
                {section.content.split("\n").filter(line => line.trim()).map((line, i) => (
                  <p key={i} className="text-slate-700 leading-relaxed text-lg">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </>
  );
}
