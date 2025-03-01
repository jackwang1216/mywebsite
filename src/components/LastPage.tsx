"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LastPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 250, scale: 0.5 }}
        whileInView={{ opacity: 0.75, y: 0, scale: 1.0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.25, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center relative aspect-[21/9] rounded-lg overflow-hidden shadow-2xl"
      >
        <Image
          src="/website-banner.png"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
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
    </section>
  );
}
