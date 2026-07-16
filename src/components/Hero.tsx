"use client";

import { HeroData } from "@/lib/types";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero({ data }: { data: HeroData }) {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Text */}
          <motion.div 
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">
              {data.title}
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              {data.name}
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mb-10 leading-relaxed">
              {data.pitch}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#projects" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-semibold text-center transition-colors shadow-lg"
              >
                View My Work
              </a>
              {data.resumeDriveLink && (
                <a 
                  href={data.resumeDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-slate-400 text-slate-300 hover:border-white hover:text-white px-8 py-3.5 rounded-lg font-semibold text-center transition-colors"
                >
                  Download Resume
                </a>
              )}
            </div>
          </motion.div>

          {/* Profile Image - STATIC, no floating */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/50">
              <Image 
                src="/profile.jpeg" 
                alt={data.name} 
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority
                unoptimized
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
