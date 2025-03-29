"use client";

import { motion } from "framer-motion";

export default function LastPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center relative [perspective:1000px]"
      >
        <motion.h1
          initial={{ opacity: 0, rotateX: 90 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="text-8xl md:text-9xl text-cream font-fancy mb-10"
        >
          失败是成功之母
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, rotateX: -90 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="text-4xl md:text-5xl text-cream/80 font-fancy"
        >
          Failure is The Mother of Success
        </motion.p>
      </motion.div>

      {/* Desktop Footer - Hidden on mobile */}
      <div className="hidden md:block">
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-4 right-4 text-cream text-2xl font-fancy"
        >
          © 2025 Jack Wang
        </motion.footer>
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-4 left-4 text-cream text-2xl font-fancy"
        >
          Forged in Boston.
        </motion.footer>
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-4 left-1/3 -translate-x-full text-cream text-2xl font-fancy"
        >
          おう　ひき
        </motion.footer>
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-4 right-1/2 translate-x-1/2 text-cream text-2xl font-fancy"
        >
          Jack Wang
        </motion.footer>
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-4 right-1/3 translate-x-full text-cream text-2xl font-fancy"
        >
          汪曳
        </motion.footer>
      </div>

      {/* Mobile Footer - Hidden on desktop */}
      <div className="md:hidden">
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-cream text-xl font-fancy text-center"
        >
          Jack Wang · おう　ひき · 汪曳
        </motion.footer>
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-cream text-xl font-fancy"
        >
          Forged in Boston.
        </motion.footer>
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cream text-xl font-fancy"
        >
          © 2025 Jack Wang
        </motion.footer>
      </div>
    </section>
  );
}
