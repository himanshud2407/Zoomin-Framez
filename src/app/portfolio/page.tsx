"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const portfolioItems = [
  { id: 1, title: "Modern Vision", category: "Commercial", src: "/photo/Photo (6).jpg" },
  { id: 2, title: "Ethereal Landscapes", category: "Nature", src: "/photo/Photo (23).jpg" },
  { id: 3, title: "Identity", category: "Portrait", src: "/photo/Photo (226).jpg" },
  { id: 4, title: "The Summit", category: "Adventure", src: "/photo/Photo (214).jpg" },
  { id: 5, title: "Tidal Essence", category: "Coastal", src: "/photo/Photo (22).jpg" },
  { id: 6, title: "Urban Echo", category: "Street", src: "/photo/Photo (23).jpg" },
];

export default function Portfolio() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-[#E9E2CD] py-20 px-6 md:px-12">
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-[#0A0A0A]/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 hover:scale-110 transition-transform">
          <Image src="/photo/logo.png" alt="Zoomin Framez Logo" width={100} height={100} className="" />
          <span className="sr-only">ZOOMIN FRAMEZ</span>
        </Link>
        <Link href="/" className="font-label text-xs uppercase tracking-widest hover:text-white transition-colors">Back Home</Link>
      </nav>

      <div className="mt-20">
        <div className="flex flex-col gap-4 mb-20">
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tight leading-[0.8] mb-4">OUR WORK</h1>
          <p className="max-w-xl text-lg text-white/60 font-body leading-relaxed">
            A curated selection of our most impactful visual stories, capturing the extraordinary in every frame.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {portfolioItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[16/9] overflow-hidden rounded-3xl"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2 font-bold">{item.category}</p>
                <h3 className="font-headline text-3xl font-bold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
