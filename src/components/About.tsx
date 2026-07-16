"use client";

import { AboutData } from "@/lib/types";
import { motion } from "framer-motion";

export default function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-10 text-center"
        >
          About Me
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl shadow-black/20"
        >
          <p className="text-slate-700 leading-relaxed text-lg">
            {data.summary}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
