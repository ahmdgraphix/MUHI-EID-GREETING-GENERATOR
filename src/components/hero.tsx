"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full pt-8 pb-4 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] bg-muhi-green/10 blur-[120px] rounded-full mix-blend-multiply opacity-50" />
        <div className="absolute top-[10%] -right-[10%] w-[50%] h-[60%] bg-muhi-blue/10 blur-[120px] rounded-full mix-blend-multiply opacity-50" />
      </div>

      <div className="z-10 flex flex-col items-center max-w-4xl px-4 w-full text-center">
        
        {/* Massive Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-2 flex justify-center"
        >
          <img src="/logo.png" alt="MUHI Logo" className="h-[180px] md:h-[200px] w-auto object-contain drop-shadow-xl z-[60]" />
        </motion.div>

        <motion.h1 
          className="text-[22px] md:text-[34px] font-heading font-black uppercase tracking-[0.1em] mb-2 md:mb-4 bg-gradient-to-r from-muhi-green via-muhi-blue to-muhi-blue bg-clip-text text-transparent drop-shadow-sm"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.05, type: "spring", stiffness: 200, damping: 20 }}
        >
          EID GREETING CARD GENERATOR
        </motion.h1>

        <motion.p 
          className="text-[16px] md:text-[18px] text-[#666666] font-medium max-w-2xl mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Design beautiful, elegant Bakrid Mubarak greeting cards instantly.
        </motion.p>
        
      </div>
    </section>
  );
}
