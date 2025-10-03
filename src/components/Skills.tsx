"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, 
  SiRedux, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, 
  SiGraphql, SiGit, SiGithub, SiFirebase, SiFigma, SiPostman 
} from 'react-icons/si';
import { Database, Key } from 'lucide-react';

const Skills = () => {
  const skills = [
    { name: 'React.js', icon: SiReact, percentage: 90, color: '#61DAFB' },
    { name: 'JavaScript', icon: SiJavascript, percentage: 88, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, percentage: 85, color: '#3178C6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, percentage: 92, color: '#06B6D4' },
    { name: 'Next.js', icon: SiNextdotjs, percentage: 87, color: '#000000' },
    { name: 'Redux', icon: SiRedux, percentage: 83, color: '#764ABC' },
    { name: 'Node.js', icon: SiNodedotjs, percentage: 86, color: '#339933' },
    { name: 'Express.js', icon: SiExpress, percentage: 88, color: '#000000' },
    { name: 'MongoDB', icon: SiMongodb, percentage: 89, color: '#47A248' },
    { name: 'PostgreSQL', icon: SiPostgresql, percentage: 82, color: '#4169E1' },
    { name: 'SQL', icon: Database, percentage: 84, color: '#00758F' },
    { name: 'GraphQL', icon: SiGraphql, percentage: 80, color: '#E10098' },
    { name: 'JWT', icon: Key, percentage: 90, color: '#000000' },
    { name: 'Git', icon: SiGit, percentage: 91, color: '#F05032' },
    { name: 'GitHub', icon: SiGithub, percentage: 90, color: '#181717' },
    { name: 'Firebase', icon: SiFirebase, percentage: 81, color: '#FFCA28' },
    { name: 'Figma', icon: SiFigma, percentage: 78, color: '#F24E1E' },
    { name: 'Postman', icon: SiPostman, percentage: 85, color: '#FF6C37' },
  ];

  const doubledSkills = [...skills, ...skills];

  return (
    <div className="w-full  py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold text-center text-white mb-3">
          Technical Skills
        </h2>
        <p className="text-center text-slate-400">
          Expertise across modern web technologies
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />
        
        <motion.div
          className="flex gap-8"
          animate={{
            x: [0, -50 * skills.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {doubledSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                className="flex-shrink-0 w-64 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/80 transition-colors"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${skill.color}20` }}
                  >
                    <Icon 
                      className="w-7 h-7" 
                      style={{ color: skill.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">
                      {skill.name}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {skill.percentage}% proficiency
                    </p>
                  </div>
                </div>
                
                <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ 
                      backgroundColor: skill.color,
                      boxShadow: `0 0 10px ${skill.color}50`
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;