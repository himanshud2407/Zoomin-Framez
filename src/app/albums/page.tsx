"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const albumsItems = [
  { id: 1, title: "Coastal Whispers", location: "Marine Series", src: "/photo/Photo (37).JPG" },
  { id: 2, title: "The High Life", location: "Mountain Series", src: "/photo/Photo (52).jpg" },
  { id: 3, title: "Glow in the Dark", location: "Cityscape", src: "/photo/Photo (32).JPG" },
  { id: 4, title: "Mist & Mystery", location: "Landscape", src: "/photo/Photo (128).JPG" },
  { id: 5, title: "Infinite Motion", location: "Action", src: "/photo/Photo (166).JPG" },
  { id: 6, title: "Terra Firma", location: "Nature", src: "/photo/Photo (117).JPG" },
];

export default function Albums() {
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
        <div className="flex flex-col gap-4 mb-20 text-center">
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tight leading-[0.8] mb-4 uppercase">FULL ALBUMS</h1>
          <p className="max-w-xl mx-auto text-lg text-white/60 font-body leading-relaxed">
            Delve deeper into our expanded collection of visual memories, organized into specialized categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {albumsItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-square overflow-hidden rounded-[2.5rem]"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2 font-bold">{item.location}</p>
                <h3 className="font-headline text-3xl font-bold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
