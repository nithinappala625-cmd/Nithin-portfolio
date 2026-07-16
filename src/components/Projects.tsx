"use client";

import { ProjectData } from "@/lib/types";
import { motion } from "framer-motion";

export default function Projects({ data }: { data: ProjectData[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-10 text-center"
        >
          Selected Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-black/20 flex flex-col"
            >
              {project.isFeatured && (
                <span className="self-start bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                  Featured
                </span>
              )}
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
              <span className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full inline-block w-fit mb-4">
                {project.timeline}
              </span>
              <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
              
              <ul className="space-y-2 mb-6 flex-grow">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start text-slate-600 text-sm">
                    <span className="text-blue-600 mr-2 mt-0.5 flex-shrink-0">•</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
              
              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors shadow-md block"
                >
                  {project.link.includes('play.google.com') ? '▶ Get it on Google Play' : 'View Project →'}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
