"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const albums = [
  { id: 1, title: "Wedding Bliss", year: "2023", src: "/photo/Photo (44).JPG" },
  { id: 2, title: "Urban Shadows", year: "2024", src: "/photo/Photo (45).JPG" },
  { id: 3, title: "Mountain High", year: "2022", src: "/photo/Photo (23).jpg" },
  { id: 4, title: "Minimal Portraits", year: "2024", src: "/photo/Photo (69).jpg" },
  { id: 5, title: "Ocean Breaths", year: "2023", src: "/photo/Photo (36).JPG" },
  { id: 6, title: "Night Lights", year: "2024", src: "/photo/Photo (200).JPG" },
];

export function PhotoAlbums() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Start tracking when section arrives at bottom of viewport, and end when it leaves the top
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="albums" ref={targetRef} className="relative h-[300vh] bg-[#0A0A0A]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        <div className="px-6 md:px-12 mb-8 md:mb-16">
          <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-[#E9E2CD] tracking-tighter">
            Featured Albums
          </h2>
          <div className="flex items-center gap-4 mt-4">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-[#E9E2CD]/50 font-bold">
              Scroll to explore
            </span>
            <div className="w-[40px] h-[1px] bg-gradient-to-r from-[#E9E2CD]/50 to-transparent"></div>
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-6 md:gap-10 px-6 md:px-12 w-[fit-content]">
          {albums.map((album) => (
            <div
              key={album.id}
              className="relative w-[85vw] md:w-[45vw] lg:w-[35vw] aspect-[3/4] group overflow-hidden rounded-[2rem] flex-shrink-0"
            >
              <Image
                src={album.src}
                alt={album.title}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100E04] via-[#100E04]/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                <div className="font-label text-[10px] text-[#E9E2CD] uppercase tracking-[0.4em] mb-3 font-bold">
                  {album.year}
                </div>
                <h3 className="font-headline text-3xl md:text-5xl font-bold text-[#E9E2CD] tracking-tighter leading-[0.9]">
                  {album.title}
                </h3>
                <div className="mt-6 w-10 h-[1px] bg-[#E9E2CD] group-hover:w-full transition-all duration-700 ease-in-out"></div>
              </div>
            </div>
          ))}

          {/* View More Card */}
          <Link
            href="/albums"
            className="relative w-[85vw] md:w-[45vw] lg:w-[35vw] aspect-[3/4] group overflow-hidden rounded-[2rem] flex-shrink-0 bg-[#E9E2CD]/5 border border-white/10 flex flex-col items-center justify-center gap-6 hover:bg-[#E9E2CD]/10 transition-colors"
          >
            <div className="p-8 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-4xl text-[#E9E2CD]">arrow_forward</span>
            </div>
            <div className="text-center">
              <h3 className="font-headline text-3xl md:text-5xl font-bold text-[#E9E2CD] tracking-tighter leading-[0.9]">
                VIEW MORE
              </h3>
              <p className="mt-2 font-label text-[10px] text-[#E9E2CD]/50 uppercase tracking-[0.4em] font-bold italic">EXPLORE FULL ARCHIVE</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
